import type { ReactNode } from 'react'

type Block =
  | { type: 'paragraph' | 'quote'; text: string }
  | { type: 'heading'; level: 1 | 2 | 3; text: string }
  | { type: 'list'; ordered: boolean; items: string[] }
  | { type: 'code'; text: string }
  | { type: 'rule' }

function renderInline(text: string): ReactNode[] {
  const tokenPattern = /(\*\*.+?\*\*|__.+?__|`[^`]+`|\*[^*]+\*|_[^_]+_)/g
  const nodes: ReactNode[] = []
  let cursor = 0
  let key = 0

  for (const match of text.matchAll(tokenPattern)) {
    const token = match[0]
    const index = match.index ?? 0
    if (index > cursor) nodes.push(text.slice(cursor, index))

    if (token.startsWith('**') || token.startsWith('__')) {
      nodes.push(<strong key={key++} className="font-semibold text-[#17232d]">{token.slice(2, -2)}</strong>)
    } else if (token.startsWith('`')) {
      nodes.push(<code key={key++} className="rounded bg-[#edf2ea] px-1.5 py-0.5 font-mono text-[0.9em] text-[#315f19]">{token.slice(1, -1)}</code>)
    } else {
      nodes.push(<em key={key++} className="italic">{token.slice(1, -1)}</em>)
    }
    cursor = index + token.length
  }

  if (cursor < text.length) nodes.push(text.slice(cursor))
  return nodes
}

function parseBlocks(markdown: string): Block[] {
  const blocks: Block[] = []
  let paragraph: string[] = []
  let list: { ordered: boolean; items: string[] } | null = null
  let code: string[] | null = null

  const flushParagraph = () => {
    if (paragraph.length) blocks.push({ type: 'paragraph', text: paragraph.join(' ') })
    paragraph = []
  }
  const flushList = () => {
    if (list) blocks.push({ type: 'list', ordered: list.ordered, items: list.items })
    list = null
  }
  const flushText = () => {
    flushParagraph()
    flushList()
  }

  for (const line of markdown.replace(/\r\n?/g, '\n').split('\n')) {
    const trimmed = line.trim()
    if (trimmed.startsWith('```')) {
      flushText()
      if (code) {
        blocks.push({ type: 'code', text: code.join('\n') })
        code = null
      } else {
        code = []
      }
      continue
    }
    if (code) {
      code.push(line)
      continue
    }
    if (!trimmed) {
      flushText()
      continue
    }

    const heading = trimmed.match(/^(#{1,3})\s+(.+)$/)
    if (heading) {
      flushText()
      blocks.push({ type: 'heading', level: heading[1].length as 1 | 2 | 3, text: heading[2] })
      continue
    }
    if (/^(?:[-*_]\s*){3,}$/.test(trimmed)) {
      flushText()
      blocks.push({ type: 'rule' })
      continue
    }

    const unordered = trimmed.match(/^[-*+•–—]\s+(.+)$/)
    const ordered = trimmed.match(/^\d+[.)]\s+(.+)$/)
    if (unordered || ordered) {
      flushParagraph()
      const orderedList = Boolean(ordered)
      if (list && list.ordered !== orderedList) flushList()
      if (!list) list = { ordered: orderedList, items: [] }
      list.items.push((unordered ?? ordered)![1])
      continue
    }

    const quote = trimmed.match(/^>\s?(.*)$/)
    if (quote) {
      flushText()
      blocks.push({ type: 'quote', text: quote[1] })
      continue
    }
    flushList()
    paragraph.push(trimmed)
  }

  if (code) blocks.push({ type: 'code', text: code.join('\n') })
  flushText()
  return blocks
}

export function MarkdownMessage({ content }: { content: string }) {
  const blocks = parseBlocks(content)
  return <div className="space-y-3 text-sm leading-7">
    {blocks.map((block, index) => {
      if (block.type === 'heading') {
        const Heading = block.level === 1 ? 'h2' : block.level === 2 ? 'h3' : 'h4'
        return <Heading className="m-0 pt-1 text-[1.02em] font-semibold leading-snug text-[#17232d]" key={index}>{renderInline(block.text)}</Heading>
      }
      if (block.type === 'list') {
        const List = block.ordered ? 'ol' : 'ul'
        return <List className={`${block.ordered ? 'list-decimal' : 'list-disc'} space-y-1 pl-6 marker:text-[#58b51b]`} key={index}>{block.items.map((item, itemIndex) => <li className="pl-1" key={itemIndex}>{renderInline(item)}</li>)}</List>
      }
      if (block.type === 'quote') return <blockquote className="m-0 border-l-2 border-[#58b51b] pl-3 text-slate-600" key={index}>{renderInline(block.text)}</blockquote>
      if (block.type === 'code') return <pre className="overflow-x-auto rounded-xl bg-[#17232d] p-3 text-xs leading-5 text-white" key={index}><code>{block.text}</code></pre>
      if (block.type === 'rule') return <hr className="border-black/10" key={index}/>
      return <p className="m-0" key={index}>{renderInline(block.text)}</p>
    })}
  </div>
}
