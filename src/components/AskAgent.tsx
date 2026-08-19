import React, { useEffect, useState } from "react";

interface AskAgentProps {
  question: string;
}

// Renders the AI agent's answer for an `ask <question>` command. Calls the
// /api/ask serverless function (which holds the Gemini key), showing a loading
// state and a friendly fallback on failure.
export const AskAgent: React.FC<AskAgentProps> = ({ question }) => {
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const run = async () => {
      try {
        const res = await fetch("/api/ask", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question }),
          signal: controller.signal,
        });
        const data = await res.json().catch(() => ({}));
        if (res.status === 429) {
          throw new Error(data?.error || "The AI agent is busy — please try again in a few seconds.");
        }
        if (!res.ok) {
          throw new Error(data?.error || `Request failed (${res.status})`);
        }
        setAnswer(data.answer ?? "");
      } catch (err) {
        if (!controller.signal.aborted) {
          setError((err as Error).message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    run();
    return () => controller.abort();
  }, [question]);

  if (loading) return <p className="text-gray-400">🤖 thinking...</p>;
  if (error) {
    return (
      <p className="text-red-500">
        Agent unavailable: {error}. You can still explore directly — type 'help'.
      </p>
    );
  }

  return <div className="whitespace-pre-line">🤖 {answer}</div>;
};
