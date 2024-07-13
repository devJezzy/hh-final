import React, { useState, useEffect, useRef } from "react";
import getChatBotResponse from "@/utils/geminiChat";
import ChatMessage from "./ChatMessage";

const ChatSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
  const [messages, setMessages] = useState([
    { type: "assistant", content: "Hi! How can I help you today?" },
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

    if (inputValue.trim() === "") return;

    // Add user message to the message list
    const newMessages = [...messages, { type: "user", content: inputValue }];
    setMessages(newMessages);
    setInputValue("");

    // Call the chatbot API
    let response = await getChatBotResponse(inputValue);
    let text = "";
    for await (const chunk of (await response).stream) {
      const chunkText = chunk.text();
      text += chunkText;
      appendResponse(text, newMessages);
    }
  };

  const appendResponse = (text: string, newMessages: any[]) => {
    text = text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
    text = text.replace(/\n/g, "<br />");
    setMessages([...newMessages, { type: "assistant", content: text }]);
  };

  return (
    <div>
      <div
        className="fixed bottom-6 right-6 w-12 h-11 cursor-pointer"
        onClick={toggleChat}
      >
        <img src="/travel-bot.png" alt="Chat Bot" className="w-full h-full" />
      </div>
      {isOpen && (
        <div className="text-xs fixed bottom-24 right-6 max-sm:w-[70%] max-sm:h-[325px] w-80 h-96 bg-white shadow-lg flex flex-col rounded-lg bg-opacity-0 backdrop-blur-2xl">
          <div className="bg-white border rounded-lg shadow-md overflow-hidden flex flex-col h-full">
            <div className="flex flex-col h-full p-4 bg-gray-100 overflow-y-auto">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.type === "user" ? "justify-start" : "justify-end"
                  } mb-2`}
                >
                  <ChatMessage type={message.type} content={message.content} />
                </div>
              ))}
              <div ref={messagesEndRef}></div>
            </div>
            <form
              className="flex items-center p-2 bg-gray-200"
              onSubmit={handleFormSubmit}
            >
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
                  alt="Send"
                  className="shrink-0 self-start w-4 aspect-square"
                />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatSection;
