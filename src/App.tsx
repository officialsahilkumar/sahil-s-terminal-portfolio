import { useState, useRef, useEffect } from "react";
import { Terminal } from "./components/Terminal";
import { CommandLine } from "./components/CommandLine";
import { Banner } from "./components/Banner";
import { AskAgent } from "./components/AskAgent";
import { useTerminal } from "./hooks/useTerminal";
import { TerminalProvider } from "./components/TerminalProvider";
import { commands } from "./utils/commands";
import { LINUX_COMMANDS, USERNAME } from "./lib/constants";
import { useIpAddress } from "./hooks/useIpAddress";

function AppContent() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { history, addToHistory, clearHistory } = useTerminal();
  const [inputValue, setInputValue] = useState("");
  const [bannerKey, setBannerKey] = useState(0);
  const ip = useIpAddress();
  const user = ip || USERNAME;

  const handleCommand = (command: string) => {
    addToHistory({ type: "command", content: command });

    const trimmed = command.trim();
    const firstWord = trimmed.split(/\s+/)[0].toLowerCase();
    const args = trimmed.slice(firstWord.length).trim();

    // clear/init reset terminal state, so they're handled here rather than
    // through the registry's execute() (which can't touch React state).
    if (firstWord === "clear" || firstWord === "init") {
      clearHistory();
      setInputValue("");
      if (firstWord === "init") {
        setBannerKey((k) => k + 1);
      }
      return;
    }

    // ask -> the AI agent (async, so it's rendered as a component that fetches
    // /api/ask rather than a synchronous execute()).
    if (firstWord === "ask") {
      if (!args) {
        addToHistory({
          type: "error",
          content: "usage: ask <question>   e.g. ask what's Sahil's AI experience?",
        });
      } else {
        addToHistory({ type: "response", content: <AskAgent question={args} /> });
      }
      setInputValue("");
      return;
    }

    const commandFound = commands[firstWord];

    if (commandFound) {
      addToHistory({ type: "response", content: commandFound.execute() });
    } else if (LINUX_COMMANDS.includes(firstWord)) {
      addToHistory({
        type: "error",
        content:
          `shell : command not found : ${firstWord}. Try 'help' to get started` +
          `\n\nThis is not a real terminal and doesn't support Linux commands like 'cd', 'ls', or 'cat' as of now. It's designed for an interactive experience. If you have suggestions or just want to give any feedback, ping me on my socials. Just simply type 'contactme'.\n`,
      });
    } else if (trimmed) {
      addToHistory({
        type: "error",
        content: `shell : command not found : ${trimmed}. Try 'help' to get started\n`,
      });
    }

    setInputValue("");
  };

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (terminalRef.current) {
      const lastElement = terminalRef.current.lastElementChild;
      lastElement?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [history]);

  return (
    <div
      className="h-screen w-full bg-black text-gray-400 p-4 font-mono overflow-hidden"
      onClick={handleTerminalClick}
    >
      <div ref={terminalRef} className="h-full w-full overflow-auto scroll-smooth">
        <div className="mb-4">
          <Banner key={bannerKey} />
        </div>
        <Terminal history={history} user={user} />
        <CommandLine
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onSubmit={handleCommand}
          inputRef={inputRef}
          user={user}
        />
      </div>
    </div>
  );
}

function App() {
  return (
    <TerminalProvider>
      <AppContent />
    </TerminalProvider>
  );
}

export default App;
