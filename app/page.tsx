"use client";
import { useState } from "react";
import FileUpload from "@/componets/FileUpload";
import { parseZip } from "../utils/parseZip";
import { Message, parseChatText } from "../utils/parseChatText";
import ChatMessage from "@/componets/ChatMessage";

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleFileUpload = async (file: File) => {
    const text = await parseZip(file);
    const parsedMessages = parseChatText(text);
    setMessages(parsedMessages);
  };

  return (
    <div className="container mx-auto p-4">
      <FileUpload onFileUpload={handleFileUpload} />
      <div className="mt-4 space-y-4">
        {messages.map((msg, i) => (
          <ChatMessage key={i} message={msg} />
        ))}
      </div>
    </div>
  );
}
