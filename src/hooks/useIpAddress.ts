import { useEffect, useState } from "react";

// Fetches the visitor's public IP. Returns an empty string until it resolves
// (or if the request fails), so callers can fall back to a default username.
export const useIpAddress = (): string => {
  const [ip, setIp] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    fetch("https://api.ipify.org?format=json", { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => setIp(data.ip))
      .catch((error) => {
        if (!controller.signal.aborted) {
          console.error("Error fetching IP address:", error);
        }
      });

    return () => controller.abort();
  }, []);

  return ip;
};
