import { commands } from "../utils/commands";

// A command is "valid" if nothing has been typed yet, or its first word exists
// in the registry (so commands with arguments like `ask <question>` still count
// as valid). Shared by the input line and the scrollback for green/red colour.
export const isValidCommand = (input: string): boolean => {
  const firstWord = input.trim().toLowerCase().split(/\s+/)[0];
  return firstWord === "" || commands[firstWord] !== undefined;
};
