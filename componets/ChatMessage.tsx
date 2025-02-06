// components/ChatMessage.tsx
import { Message } from "@/utils/parseChatText";
export default function ChatMessage({ message }: { message: Message }) {
  return (
    <div className="flex flex-col gap-1 p-2 max-w-[80%]">
      <div className="flex items-center gap-2">
        <span className="font-semibold text-sm">{message.sender}</span>
        <span className="text-xs text-gray-500">
          {message.date.toLocaleTimeString()}
        </span>
      </div>
      <div className="bg-gray-100 p-3 rounded-lg shadow-sm">
        {message.isMedia ? (
          <img
            src={message.content.replace("<attached: ", "").replace(">", "")}
            alt="Media"
            className="max-w-48 max-h-48 rounded"
          />
        ) : (
          <p className="text-gray-800">{message.content}</p>
        )}
      </div>
    </div>
  );
}
