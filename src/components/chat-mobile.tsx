/**
 * This code was generated by Builder.io.
 */
import React from "react";

interface ChatMessageProps {
  type: string;
  content: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ type, content }) => {
  const isAssistant = type === "assistant";
  const containerClasses = isAssistant
    ? "flex p-1 rounded-lg almond-green bg-opacity-20"
    : "flex p-1 rounded-lg";
  const iconSrc = isAssistant
    ? "https://cdn.builder.io/api/v1/image/assets/TEMP/de388b7f96e10b477b2eba6351b931cb790bbbfe31c6f94b946f2f923264b707?apiKey=79050f2e54364c9b998b189296d8e734&"
    : "";

  return (
    <div className={containerClasses}>
      {isAssistant && (
        <img
          loading="lazy"
          src={iconSrc}
          alt="Assistant icon"
          className="shrink-0 w-3.5 aspect-square m-1 self-start"
        />
      )}
      <div dangerouslySetInnerHTML={{ __html: content }} className={isAssistant ? "max-md:max-w-full" : ""}></div>
    </div>
  );
};

export default ChatMessage;
