// components/ChatMessage.tsx
import React from "react";
import { Message } from "@/utils/parseChatText";

interface ChatMessageProps {
  message: Message;
  isCurrentUser: boolean;
}

const formatTime = (date: Date): string => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return date.toLocaleDateString(undefined, options);
};

// Helper to group messages by date
const groupMessagesByDate = (messages: Message[]) => {
  const groups: { [key: string]: Message[] } = {};
  
  messages.forEach(message => {
    const dateStr = message.date.toDateString();
    if (!groups[dateStr]) {
      groups[dateStr] = [];
    }
    groups[dateStr].push(message);
  });
  
  return Object.entries(groups).map(([dateStr, msgs]) => ({
    date: new Date(dateStr),
    messages: msgs
  }));
};

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isCurrentUser }) => {
  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-2 mx-2`}>
      <div 
        className={`relative rounded-lg py-2 px-3 max-w-xs ${
          isCurrentUser 
            ? 'bg-[#dcf8c6] text-black' 
            : 'bg-white text-black'
        } shadow`}
      >
        {!isCurrentUser && (
          <div className="text-xs font-bold text-[#075e54] mb-1">
            {message.sender}
          </div>
        )}
        
        <div className="break-words text-sm">
          {message.isMedia ? (
            <div className="bg-gray-100 p-2 rounded flex items-center">
              <div className="mr-2 text-[#075e54]">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
              </div>
              <span className="text-sm text-gray-600">{message.content}</span>
            </div>
          ) : message.content === "This message was deleted" || message.content === "null" ? (
            <div className="italic text-gray-500 text-sm flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
              This message was deleted
            </div>
          ) : (
            <div>{message.content}</div>
          )}
        </div>
        
        <div className="text-right mt-1">
          <span className="text-xs text-gray-500">
            {formatTime(message.date)}
          </span>
          
          {/* Message status (only for current user) */}
          {isCurrentUser && (
            <span className="ml-1 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#34b7f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
                <polyline points="20 12 9 23 4 18"></polyline>
              </svg>
            </span>
          )}
        </div>
        
        {/* Triangle indicator for bubble effect */}
        <div 
          className={`absolute top-0 ${isCurrentUser ? '-right-2' : '-left-2'} w-2 h-2 ${
            isCurrentUser ? 'border-t-[#dcf8c6] border-r-[#dcf8c6]' : 'border-t-white border-l-white'
          }`}
          style={{
            transform: isCurrentUser ? 'rotate(45deg)' : 'rotate(-45deg)',
          }}
        ></div>
      </div>
    </div>
  );
};

interface WhatsAppChatProps {
  messages: Message[];
}

const WhatsAppChat: React.FC<WhatsAppChatProps> = ({ messages }) => {
  // For demo purposes, let's consider messages from "Rakesh" as the current user
  const currentUser = "Rakesh";
  
  // Group messages by date
  const groupedMessages = groupMessagesByDate(messages);
  
  // Filter system message
  const chatMessages = messages.filter(
    (msg, index) => !(index === 0 && msg.content.includes("encrypted"))
  );
  
  // Get chat participants
  const participants = Array.from(
    new Set(chatMessages.map((msg) => msg.sender))
  ).filter(name => name !== "");
  
  // Get date range
  const startDate = messages.length > 0 ? messages[0].date : new Date();
  const endDate = messages.length > 0 ? messages[messages.length - 1].date : new Date();
  
  return (
    <div className="bg-[#f0f2f5] rounded-lg shadow-md overflow-hidden max-w-md mx-auto">
      {/* Chat Header */}
      <div className="bg-[#075e54] text-white p-3 flex items-center">
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
        <div>
          <h2 className="font-bold">
            {participants.length > 1 
              ? `${participants[0]} & ${participants.length - 1} others` 
              : participants[0] || "WhatsApp Chat"}
          </h2>
          <div className="text-xs opacity-80">
            {`${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`}
          </div>
        </div>
      </div>

      {/* System Messages (like encryption notice) */}
      {messages.length > 0 && messages[0].content.includes("encrypted") && (
        <div className="bg-[#FFF3CD] p-3 text-center text-xs text-gray-600 border-b border-gray-200">
          <div className="flex justify-center items-center mb-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 text-[#856404]">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
          {messages[0].content}
        </div>
      )}

      {/* Chat Messages */}
      <div className="bg-[#e5ddd5] h-[600px] overflow-y-auto" style={{backgroundImage: 'url("data:image/png;base64,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"), repeating-linear-gradient(#e5ddd5, #e5ddd5 100%)'}} 
      >
        {groupedMessages.map((group, groupIndex) => (
          <div key={groupIndex}>
            {/* Date separator */}
            <div className="flex justify-center my-4">
              <div className="bg-white text-xs text-gray-500 rounded-lg px-3 py-1 shadow">
                {formatDate(group.date)}
              </div>
            </div>
            
            {/* Messages for this date */}
            {group.messages.map((message, messageIndex) => {
              // Skip system message about encryption that we already displayed
              if (groupIndex === 0 && messageIndex === 0 && message.content.includes("encrypted")) {
                return null;
              }
              
              return (
                <ChatMessage 
                  key={`${groupIndex}-${messageIndex}`} 
                  message={message} 
                  isCurrentUser={message.sender === currentUser}
                />
              );
            })}
          </div>
        ))}
      </div>

      {/* Chat Footer */}
      <div className="bg-[#f0f2f5] p-3 flex items-center border-t border-gray-200">
        <div className="w-full bg-white rounded-full px-4 py-2 flex items-center text-xs text-gray-400">
          This is a read-only chat view
        </div>
      </div>
    </div>
  );
};

export default WhatsAppChat;