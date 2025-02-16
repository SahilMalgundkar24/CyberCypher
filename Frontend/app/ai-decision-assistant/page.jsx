"use client";
import React, { useState } from "react";
import { Send } from "lucide-react";

const Page = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you today?", isBot: true },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim() === "") return;

    // Add user message
    const newUserMessage = {
      id: messages.length + 1,
      text: inputMessage,
      isBot: false,
    };

    // Add bot response (placeholder)
    const newBotMessage = {
      id: messages.length + 2,
      text: "This is a placeholder response. Connect to a backend to get real responses!",
      isBot: true,
    };

    setMessages([...messages, newUserMessage, newBotMessage]);
    setInputMessage("");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="bg-white rounded-lg shadow-md h-full flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold text-gray-800">
              Chat Assistant
            </h2>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.isBot ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.isBot
                        ? "bg-gray-100 text-gray-800"
                        : "bg-black text-white"
                    }`}
                  >
                    <p className="text-sm md:text-base">{message.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSendMessage} className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
              <button
                type="submit"
                className="p-2 bg-black text-white rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
