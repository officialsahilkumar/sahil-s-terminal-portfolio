import React, { useRef, useEffect } from "react";
import { HistoryItem } from "../types";
import { isValidCommand } from "../lib/isValidCommand";
import { Prompt } from "./ui/Prompt";

interface TerminalProps {
  history: HistoryItem[];
  user: string;
}

export const Terminal: React.FC<TerminalProps> = ({ history, user }) => {
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  return (
    <div className="mb-8">
      {history.map((item, index) => (
        <div key={index} className="mb-2">
          {item.type === "command" && (
            <div className="flex">
              <Prompt user={user} />
              <span
                className={`ml-3 ${
                  typeof item.content === "string" && isValidCommand(item.content)
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {item.content}
              </span>
            </div>
          )}
          {item.type === "response" && (
            <div className="whitespace-pre-line">{item.content}</div>
          )}
          {item.type === "error" && (
            <div className="text-gray-400 whitespace-pre-line">{item.content}</div>
          )}
        </div>
      ))}
      <div ref={terminalEndRef} />
    </div>
  );
};
