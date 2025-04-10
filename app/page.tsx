"use client";
import { useState } from "react";
import FileUpload from "@/componets/FileUpload";
import { parseZip } from "../utils/parseZip";
import { Message, parseChatText } from "../utils/parseChatText";
import WhatsAppChat from "@/componets/ChatMessage";

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleFileUpload = async (file: File) => {
    const text = await parseZip(file);
    const parsedMessages = parseChatText(text);
    setMessages(parsedMessages);
  };

  return (
    <div className="">
      {messages.length === 0 ? (
        <div className="container h-screen mx-auto p-4 flex flex-col items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full border border-red-500">
            <h1 className="text-2xl font-bold text-emerald-700 mb-4 text-center">
              WhatsApp Chat Viewer
            </h1>
            <FileUpload onFileUpload={handleFileUpload} />
          </div>
        </div>
      ) : (
        <div className="w-1/2 p-4 mx-auto">
          <WhatsAppChat messages={messages} />
        </div>
      )}
    </div>
  );
}