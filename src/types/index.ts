export type HistoryItemType = "command" | "response" | "error";

export interface HistoryItem {
  type: HistoryItemType;
  content: string | JSX.Element;
}

export type CommandCategory = "info" | "links" | "system";

export interface Command {
  description: string;
  category: CommandCategory;
  execute: () => JSX.Element;
}
