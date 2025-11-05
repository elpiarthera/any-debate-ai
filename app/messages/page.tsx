import { MessageList } from "@/components/messages/message-list"
import { mockMessages } from "@/lib/mock-data/messages"

export default function MessagesPage() {
  return (
    <div className="h-screen">
      <MessageList initialMessages={mockMessages} />
    </div>
  )
}
