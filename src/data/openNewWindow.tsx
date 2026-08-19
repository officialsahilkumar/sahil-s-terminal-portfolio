import { ExternalLink } from "../components/ui/ExternalLink";

// Reuse a single tab across link commands: focus it if still open, otherwise
// open a new one.
let openedWindow: Window | null = null;

export const openNewWindow = (url: string): JSX.Element => {
  if (openedWindow && !openedWindow.closed) {
    openedWindow.location.replace(url);
    openedWindow.focus();
  } else {
    openedWindow = window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div>
      <br />
      <p>Opening in a new tab...</p>
      <p>
        Successfully opened <ExternalLink href={url} /> in a new tab.
        <br />
      </p>
    </div>
  );
};
