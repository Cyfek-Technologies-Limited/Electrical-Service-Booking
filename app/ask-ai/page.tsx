import type { Metadata } from 'next'
import { AskAiChat } from '@/components/ask-ai-chat'

export const metadata: Metadata = {
  title: 'Ask AI | Habitech Power Limited',
  description: 'Ask Habitech Power’s AI assistant general questions about electrical systems, solar power, inverters, and energy.',
}

export default function AskAiPage() {
  return <AskAiChat />
}
