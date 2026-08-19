import React, { KeyboardEvent, useMemo } from "react";
import { useTerminal } from "../hooks/useTerminal";
import { isValidCommand } from "../lib/isValidCommand";
import { Prompt } from "./ui/Prompt";

interface CommandLineProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (command: string) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  user: string;
}

export const CommandLine: React.FC<CommandLineProps> = ({
  value,
  onChange,
  onSubmit,
  inputRef,
  user,
}) => {
  const { getPreviousCommand, getNextCommand } = useTerminal();

  const valid = useMemo(() => isValidCommand(value), [value]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "Enter":
        onSubmit(value);
        break;
      case "ArrowUp": {
        e.preventDefault();
        const prevCommand = getPreviousCommand();
        onChange({ target: { value: prevCommand } } as React.ChangeEvent<HTMLInputElement>);
        break;
      }
      case "ArrowDown": {
        e.preventDefault();
        const nextCommand = getNextCommand();
        onChange({ target: { value: nextCommand } } as React.ChangeEvent<HTMLInputElement>);
        break;
      }
      case "Tab":
        e.preventDefault();
        if (value.trim().toLowerCase() === "clear") {
          onSubmit("clear");
        }
        break;
    }
  };

  return (
    <div className="flex items-center">
      <Prompt user={user} />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        className={`flex-1 ml-2 bg-transparent outline-none border-none ${
          value.trim() === "" || !valid ? "text-red-500" : "text-green-500"
        }`}
        autoFocus
      />
    </div>
  );
};
