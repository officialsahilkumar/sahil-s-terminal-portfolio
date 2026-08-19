import React from "react";
import { USERNAME } from "../../lib/constants";

interface PromptProps {
  user?: string;
}

// The `user@portfolio:~$` shell prompt, shared by the input line and the
// command echo in the scrollback.
export const Prompt: React.FC<PromptProps> = ({ user = USERNAME }) => (
  <>
    <span className="text-purple-400">{user}@portfolio</span>
    <span className="text-purple-400">:</span>
    <span className="text-purple-400">~$</span>
  </>
);
