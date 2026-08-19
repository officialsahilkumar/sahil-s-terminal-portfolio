import React, { ReactNode } from "react";

interface ExternalLinkProps {
  href: string;
  children?: ReactNode;
  className?: string;
}

// Reusable anchor for external links. Encapsulates the repeated
// target/rel/styling so it lives in exactly one place.
export const ExternalLink: React.FC<ExternalLinkProps> = ({
  href,
  children,
  className = "text-custom-blue hover:text-custom-skyblue",
}) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
    {children ?? href}
  </a>
);
