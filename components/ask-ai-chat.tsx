'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowUp, Bot, CircleHelp, Lightbulb, LoaderCircle, Plus, ShieldCheck, UserRound, Zap } from 'lucide-react'

type Message = { id: number; role: 'user' | 'assistant'; content: string }

const suggestions = [
  { icon: Zap, text: 'What causes a circuit breaker to trip?' },
  { icon: Lightbulb, text: 'How can I reduce my electricity use?' },
  { icon: CircleHelp, text: 'What should I consider before installing solar?' },
]

export function AskAiChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [draft, setDraft] = useState('')
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }), [messages, pending])

  async function sendMessage(value = draft) {
    const content = value.trim()
    if (!content || pending) return
    const nextMessages: Message[] = [...messages, { id: Date.now(), role: 'user', content }]
    setMessages(nextMessages)
    setDraft('')
    setError('')
    setPending(true)
    try {
      const response = await fetch('/api/ask-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages.slice(-12).map(({ role, content: text }) => ({ role, content: text })) }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'The assistant could not respond. Please try again.')
      setMessages((current) => [...current, { id: Date.now() + 1, role: 'assistant', content: result.answer }])
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'The assistant could not respond. Please try again.')
    } finally {
      setPending(false)
      inputRef.current?.focus()
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    void sendMessage()
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      void sendMessage()
    }
  }

  function resetChat() {
    setMessages([])
    setDraft('')
    setError('')
    inputRef.current?.focus()
  }

  return (
    <main className="flex min-h-screen flex-col bg-[#f7f9f6] text-[#17232d]">
      <header className="sticky top-0 z-10 border-b border-black/10 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-[68px] w-full max-w-5xl items-center justify-between px-4 sm:px-6">
          <Link className="inline-flex items-center gap-3" href="/" aria-label="Back to Habitech Power homepage">
            <ArrowLeft className="text-[#51606a]" size={18}/>
            <span className="relative h-10 w-10 overflow-hidden rounded-lg bg-white">
              <Image alt="" aria-hidden="true" className="object-contain" fill sizes="40px" src="/habitech-logo.jpeg"/>
            </span>
            <span className="hidden leading-tight sm:block"><strong className="block text-sm">Habitech Power</strong><small className="text-[11px] text-slate-500">Electrical help assistant</small></span>
          </Link>
          <div className="flex items-center gap-2">
            {messages.length > 0 && <button className="inline-flex items-center gap-1.5 rounded-lg border border-black/15 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50" onClick={resetChat} type="button"><Plus size={14}/>New chat</button>}
            <Link className="hidden rounded-lg bg-[#17232d] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#263943] sm:inline-flex" href="/#book">Request a service</Link>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 sm:px-6">
        <section className={`flex flex-1 flex-col ${messages.length ? 'py-8' : 'justify-center py-10'}`}>
          {messages.length === 0 ? (
            <div className="mx-auto w-full max-w-2xl text-center">
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[.18em] text-[#438516]">Habitech Power Limited</p>
              <h1 className="m-0 text-3xl font-semibold tracking-tight sm:text-4xl">What can I help you with?</h1>
              <p className="mx-auto mb-8 mt-3 max-w-lg text-sm leading-relaxed text-slate-500">Ask about electrical systems, solar power, inverters, maintenance, or your next project.</p>
              <div className="grid gap-3 text-left sm:grid-cols-3">
                {suggestions.map(({ icon: Icon, text }) => <button className="group flex min-h-[92px] items-start justify-between gap-3 rounded-2xl border border-black/15 bg-white p-4 text-left text-xs leading-relaxed text-slate-600 shadow-[0_3px_12px_rgba(21,29,36,.03)] transition hover:-translate-y-0.5 hover:border-[#58b51b]/50 hover:shadow-md" key={text} onClick={() => void sendMessage(text)} type="button"><span>{text}</span><Icon className="mt-0.5 shrink-0 text-[#58b51b] transition group-hover:scale-110" size={17}/></button>)}
              </div>
            </div>
          ) : (
            <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-7">
              {messages.map((message) => <article className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`} key={message.id}>
                <span className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full ${message.role === 'assistant' ? 'bg-[#eaf5e2] text-[#438516]' : 'bg-[#17232d] text-white'}`}>{message.role === 'assistant' ? <Bot size={17}/> : <UserRound size={16}/>}</span>
                <div className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-7 ${message.role === 'assistant' ? 'rounded-tl-md border border-black/10 bg-white text-[#26333b] shadow-sm' : 'rounded-tr-md bg-[#17232d] text-white'}`}><p className="m-0 whitespace-pre-wrap">{message.content}</p></div>
              </article>)}
              {pending && <div className="flex gap-3"><span className="grid h-8 w-8 place-items-center rounded-full bg-[#eaf5e2] text-[#438516]"><Bot size={17}/></span><div aria-label="Assistant is thinking" className="flex items-center gap-2 rounded-2xl rounded-tl-md border border-black/10 bg-white px-4 py-3 text-xs text-slate-500 shadow-sm"><LoaderCircle className="animate-spin text-[#58b51b]" size={16}/>Thinking through your question</div></div>}
              {error && <div className="ml-11 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs leading-relaxed text-red-800" role="alert">{error}</div>}
              <div ref={bottomRef}/>
            </div>
          )}
        </section>

        <div className="sticky bottom-0 -mx-4 bg-gradient-to-t from-[#f7f9f6] via-[#f7f9f6] to-transparent px-4 pb-4 pt-5 sm:-mx-6 sm:px-6">
          <form className="mx-auto max-w-2xl" onSubmit={submit}>
            <div className="rounded-2xl border border-black/20 bg-white p-2 shadow-[0_8px_30px_rgba(21,29,36,.08)] focus-within:border-[#58b51b]/60 focus-within:ring-2 focus-within:ring-[#58b51b]/10">
              <textarea aria-label="Ask an electrical question" className="max-h-40 min-h-12 w-full resize-y bg-transparent px-3 py-2 text-sm leading-relaxed text-[#17232d] outline-none placeholder:text-slate-400" maxLength={4000} onChange={(event) => setDraft(event.target.value)} onKeyDown={handleKeyDown} placeholder="Ask an electrical question..." ref={inputRef} rows={1} value={draft}/>
              <div className="flex items-center justify-between px-2 pb-1"><span className="text-[10px] text-slate-400">Enter to send · Shift + Enter for a new line</span><button aria-label="Send message" className="grid h-9 w-9 place-items-center rounded-xl bg-[#58b51b] text-[#17232d] transition hover:bg-[#69c92b] disabled:cursor-not-allowed disabled:opacity-40" disabled={!draft.trim() || pending} type="submit"><ArrowUp size={18} strokeWidth={2.5}/></button></div>
            </div>
          </form>
          <p className="mx-auto mb-0 mt-3 flex max-w-2xl items-center justify-center gap-1.5 text-center text-[10px] leading-relaxed text-slate-500"><ShieldCheck className="shrink-0 text-[#438516]" size={13}/>AI answers are for general guidance. A qualified electrician should verify site-specific work and safety decisions.</p>
        </div>
      </div>
    </main>
  )
}
