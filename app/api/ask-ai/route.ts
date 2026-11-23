import { NextResponse } from 'next/server'

type ChatMessage = { role: 'user' | 'assistant'; content: string }

const rateLimit = new Map<string, { count: number; resetAt: number }>()
const maxMessages = 12
const maxMessageLength = 4000
const instructions = `You are Habitech Power Limited's electrical help assistant. Answer electrical, renewable energy, solar, CCTV, and related building-services questions clearly and practically, using plain language. You may explain general principles and safe checks, but never guide someone through touching exposed wiring, working on energized equipment, bypassing a breaker or safety device, or doing hazardous work without proper training. For suspected shock, fire, burning smells, sparking, or immediate danger, tell the person to keep away, switch off power only if they can safely reach the main breaker without approaching the hazard, and contact local emergency services or a qualified licensed electrician. Do not pretend to inspect a site remotely or give certainty where details are missing. Ask a short clarifying question if needed. For code, regulation, sizing, or installation decisions, explain that a licensed electrician should verify the site and applicable Nigerian standards. Stay focused on the question and do not invent facts.`

function getText(output: unknown) {
  if (!Array.isArray(output)) return ''
  return output.flatMap((item: any) =>
    item?.type === 'message' && Array.isArray(item.content)
      ? item.content.filter((part: any) => part?.type === 'output_text').map((part: any) => part.text)
      : [],
  ).join('\n').trim()
}

async function getProviderError(response: Response) {
  try {
    const payload = await response.json()
    return payload && typeof payload === 'object' ? (payload as { error?: { type?: unknown; code?: unknown; param?: unknown } }).error : undefined
  } catch {
    return undefined
  }
}

function providerErrorMessage(status: number) {
  if (status === 401) return 'The AI service could not authenticate. Please contact the site administrator.'
  if (status === 403 || status === 404) return 'The AI model is not available for this account. Please contact the site administrator.'
  if (status === 429) return 'The AI service is at its current usage limit. Please try again later.'
  return 'The assistant could not respond right now. Please try again shortly.'
}

export async function POST(request: Request) {
  const key = process.env.OPENAI_API_KEY
  if (!key) {
    return NextResponse.json({ error: 'The AI assistant is not connected yet. Please try again later.' }, { status: 503 })
  }

  const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  const address = forwardedFor || request.headers.get('x-real-ip') || 'unknown'
  const now = Date.now()
  const current = rateLimit.get(address)
  if (current && current.resetAt > now && current.count >= 10) {
    return NextResponse.json({ error: 'You have sent several questions recently. Please wait a minute and try again.' }, { status: 429 })
  }
  if (!current || current.resetAt <= now) rateLimit.set(address, { count: 1, resetAt: now + 60_000 })
  else current.count += 1
  if (rateLimit.size > 2000) {
    for (const [ip, limit] of rateLimit) if (limit.resetAt <= now) rateLimit.delete(ip)
  }

  let body: { messages?: unknown }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Please send a valid message.' }, { status: 400 })
  }

  if (!Array.isArray(body.messages) || body.messages.length === 0 || body.messages.length > maxMessages) {
    return NextResponse.json({ error: 'Please start a new chat and send up to 12 recent messages.' }, { status: 400 })
  }
  const messages: ChatMessage[] = []
  for (const item of body.messages) {
    if (!item || (item.role !== 'user' && item.role !== 'assistant') || typeof item.content !== 'string') {
      return NextResponse.json({ error: 'One of the chat messages is invalid.' }, { status: 400 })
    }
    const content = item.content.trim()
    if (!content || content.length > maxMessageLength) {
      return NextResponse.json({ error: 'Each message must be under 4,000 characters.' }, { status: 400 })
    }
    messages.push({ role: item.role, content })
  }
  if (messages[messages.length - 1]?.role !== 'user') {
    return NextResponse.json({ error: 'Send a question to continue.' }, { status: 400 })
  }

  try {
    const model = process.env.OPENAI_MODEL || 'gpt-6.2-luna'
    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      cache: 'no-store',
      signal: AbortSignal.timeout(45_000),
      body: JSON.stringify({
        model,
        instructions,
        input: messages.map(({ role, content }) => ({ role, content })),
        max_output_tokens: 1000,
        store: false,
      }),
    })
    if (!response.ok) {
      const providerError = await getProviderError(response)
      console.error('[ask-ai] OpenAI request failed', {
        status: response.status,
        requestId: response.headers.get('x-request-id'),
        model,
        errorType: typeof providerError?.type === 'string' ? providerError.type : undefined,
        errorCode: typeof providerError?.code === 'string' ? providerError.code : undefined,
        errorParam: typeof providerError?.param === 'string' ? providerError.param : undefined,
      })
      return NextResponse.json({ error: providerErrorMessage(response.status) }, { status: 502 })
    }
    const result = await response.json()
    const answer = getText(result.output)
    if (!answer) {
      console.error('[ask-ai] OpenAI response contained no output text', {
        requestId: response.headers.get('x-request-id'),
        model,
        responseStatus: typeof result.status === 'string' ? result.status : undefined,
      })
      return NextResponse.json({ error: 'The assistant returned an empty response. Please try asking another way.' }, { status: 502 })
    }
    return NextResponse.json({ answer })
  } catch (error) {
    console.error('[ask-ai] Request failed before receiving an OpenAI response', {
      errorName: error instanceof Error ? error.name : 'UnknownError',
    })
    return NextResponse.json({ error: 'We could not reach the assistant. Please check your connection and try again.' }, { status: 502 })
  }
}
