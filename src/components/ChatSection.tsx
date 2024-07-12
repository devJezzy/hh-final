import React, { useState, useEffect, useRef } from "react";
import getChatBotResponse from "@/utils/geminiChat";
import ChatMessage from "./ChatMessage";

const ChatSection: React.FC = () => {
  const [messages, setMessages] = useState([
    { type: "assistant", content: "Hi ! How can I help you today!" }
  ]);

  const [inputValue, setInputValue] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Add user message to the message list
    const newMessages = [...messages, { type: "user", content: inputValue }];
    setMessages(newMessages);
    setInputValue("");

    // Call the chatbot API
    let response = await getChatBotResponse(inputValue);
    let text = '';
    for await (const chunk of (await response).stream) {
      const chunkText = chunk.text();
      text += chunkText;
      appendResponse(text, newMessages);
    }
  };

  const appendResponse = (text: string, newMessages: any[]) => {
    const formattedBotResponse = text.replace(/\n/g, "<br />");
    setMessages([...newMessages, { type: "assistant", content: formattedBotResponse }]);
  };

  return (
    <div className="flex flex-col w-1/2 max-md:ml-0 max-md:w-full your-style">
      <div className="flex flex-col p-6 leading-7 text-black rounded-xl border border-solid border-[#9AAC47] border-opacity-30 max-md:px-5 max-md:mt-5 max-md:max-w-full overflow-hidden mb-5 h-full">
        <div className="overflow-hidden-vertical">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.type === "user" ? "justify-start" : "justify-start"}`}
            >
              <ChatMessage
                type={message.type}
                content={message.content}
              />
            </div>
          ))}
          <div ref={messagesEndRef}></div>
        </div>
        <div className="">
          <form className="flex gap-5 justify-between px-5 py-3.5 mt-5 bg-gray-200 rounded-md text-zinc-500 text-opacity-60 max-md:flex-wrap max-md:pl-5 max-md:mt-10 max-md:max-w-full" onSubmit={handleFormSubmit}>
            <label htmlFor="chatInput" className="sr-only">
              Type your message
            </label>
            <input
              type="text"
              id="chatInput"
              placeholder="Type Here"
              className="bg-transparent border-none outline-none flex-grow"
              value={inputValue}
              onChange={handleInputChange}
            />
            <button type="submit" aria-label="Send message">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/b420a9b4d5d9a10678adf4752aa4a128fe4a8aac67857693b299bfb21ad70060?apiKey=79050f2e54364c9b998b189296d8e734&"
                alt=""
                className="shrink-0 self-start w-5 aspect-square"
              />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatSection;
