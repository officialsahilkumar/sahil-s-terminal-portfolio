import React, { useEffect, useState } from "react";
import { BANNER } from "../data/banner";

// Types the banner out character-by-character (agentic "boot" feel) with a
// blinking cursor. Re-runs on each mount, so `init` re-animates it.
export const Banner: React.FC = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(0);
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setCount(i);
      if (i >= BANNER.length) clearInterval(id);
    }, 38);
    return () => clearInterval(id);
  }, []);

  const done = count >= BANNER.length;

  return (
    <pre className="text-gray-400 whitespace-pre-wrap">
      {BANNER.slice(0, count)}
      <span className={done ? "animate-pulse" : ""}>▋</span>
    </pre>
  );
};
