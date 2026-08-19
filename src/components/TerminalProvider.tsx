import React, { createContext, useState, type ReactNode } from "react";
import { HistoryItem } from "../types";

interface TerminalContextType {
  history: HistoryItem[];
  commandHistory: string[];
  historyIndex: number;
  addToHistory: (item: HistoryItem) => void;
  clearHistory: () => void;
  getPreviousCommand: () => string;
  getNextCommand: () => string;
  setHistoryIndex: (index: number) => void;
}

export const TerminalContext = createContext<TerminalContextType | undefined>(
  undefined
);

interface TerminalProviderProps {
  children: ReactNode;
}

export const TerminalProvider: React.FC<TerminalProviderProps> = ({ children }) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const addToHistory = (item: HistoryItem) => {
    setHistory((prev) => [...prev, item]);
    if (item.type === "command" && typeof item.content === "string" && item.content.trim()) {
      setCommandHistory((prev) => [...prev, item.content as string]);
      setHistoryIndex(-1);
    }
  };

  const clearHistory = () => {
    setHistory([]);
    setCommandHistory([]);
  };

  const getPreviousCommand = () => {
    if (commandHistory.length === 0) return "";
    const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
    setHistoryIndex(newIndex);
    return commandHistory[commandHistory.length - 1 - newIndex];
  };

  const getNextCommand = () => {
    if (historyIndex <= 0) {
      setHistoryIndex(-1);
      return "";
    }
    const newIndex = historyIndex - 1;
    setHistoryIndex(newIndex);
    return commandHistory[commandHistory.length - 1 - newIndex];
  };

  return (
    <TerminalContext.Provider
      value={{
        history,
        commandHistory,
        historyIndex,
        addToHistory,
        clearHistory,
        getPreviousCommand,
        getNextCommand,
        setHistoryIndex,
      }}
    >
      {children}
    </TerminalContext.Provider>
  );
};
