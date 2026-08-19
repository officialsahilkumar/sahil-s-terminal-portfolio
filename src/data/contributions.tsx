import React, { useEffect, useState } from "react";
import { profile } from "./profile";
import { ExternalLink } from "../components/ui/ExternalLink";

interface GitHubEvent {
  id: string;
  type: string;
  repo: { name: string };
  created_at: string;
}

const RELEVANT_EVENT_TYPES = [
  "IssueCommentEvent",
  "PullRequestEvent",
  "PushEvent",
  "IssuesEvent",
];

const API_URL = `https://api.github.com/users/${profile.githubUsername}/events`;

const Contributions: React.FC = () => {
  const [events, setEvents] = useState<GitHubEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch contributions");
        }
        const data: GitHubEvent[] = await response.json();
        setEvents(
          data.filter((event) => RELEVANT_EVENT_TYPES.includes(event.type))
        );
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, []);

  if (loading) return <p>Loading contributions...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <p className="mt-4">
        <strong>Recent public contribution events on GitHub:</strong> {events.length}
      </p>
      <p>
        Checkout my GitHub account for more information:{" "}
        <ExternalLink href={profile.links.github} />
      </p>
    </div>
  );
};

export default Contributions;
