# Sahil's Terminal Portfolio

An interactive terminal-style portfolio built with React + TypeScript + Vite +
Tailwind CSS. Visitors type commands into a fake shell to explore my background,
projects, experience, skills, and contact links.

## Commands

| Command | Description |
|---------|-------------|
| `help` | Show all available commands |
| `ask <question>` | Ask the AI agent about Sahil (answers + suggests commands) |
| `whoami` | Personal information |
| `myprojects` | List projects |
| `work` | Work experience |
| `certs` | Certifications |
| `edu` | Education |
| `skills` | Technical skills |
| `achievements` | Coding ratings, contest rankings, awards |
| `contributions` | Recent open-source activity |
| `contactme` | Contact information |
| `resume`, `linkedin`, `github`, `leetcode`, `codeforces` | Open external links |
| `clear` | Clear the terminal |
| `init` | Reprint the welcome banner |

Use the up/down arrow keys to navigate command history.

## Getting Started

```bash
npm install      # install dependencies
npm run dev      # start the dev server
npm run build    # production build
npm run preview  # preview the production build
npm run lint     # lint the codebase
```

## AI Agent (`ask` command)

The `ask` command is powered by Google Gemini through a Vercel serverless
function (`api/ask.ts`) so the API key never reaches the browser. The agent
answers from the portfolio context and suggests the relevant command for full
details.

**Setup**

1. Get a free key from [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Add it to Vercel: **Project Settings → Environment Variables → `GEMINI_API_KEY`**.
3. Deploy. The agent is live at `/api/ask`.

**Local testing of the agent** — plain `npm run dev` (Vite) does not serve
`/api`, so the agent will show a friendly "unavailable" message locally. To test
it end-to-end:

```bash
npm i -g vercel        # once
# put GEMINI_API_KEY in a local .env (see .env.example)
vercel dev             # serves the app AND /api together
```

> When you change `src/data/*`, also update `PORTFOLIO_CONTEXT` in `api/ask.ts`
> so the agent's knowledge stays in sync.

## Project Structure

```
api/
  ask.ts                  # Vercel serverless function for the AI agent (Gemini)
src/
  components/
    Terminal.tsx          # scrollback / command echo
    CommandLine.tsx       # input line + key handling
    TerminalProvider.tsx  # React context: history + command history
    Banner.tsx            # welcome banner
    AskAgent.tsx          # renders the `ask` agent's answer
    ui/
      ExternalLink.tsx    # reusable external anchor
      Prompt.tsx          # the user@portfolio:~$ prompt
  data/
    profile.ts            # single source of truth: name, contacts, URLs
    banner.ts             # ASCII banner text
    projects.tsx, experience.tsx, education.tsx,
    certifications.tsx, skills.tsx, about.tsx,
    contact.tsx, contributions.tsx, commands.tsx, openNewWindow.tsx
  lib/
    constants.ts          # username, linux command list
    isValidCommand.ts     # shared command validation
  utils/
    commands.ts           # the single command registry
  hooks/useTerminal.ts    # context accessor hook
  types/index.ts          # shared types
```

## Updating Content

- **Personal info / links** — edit `src/data/profile.ts` (one place).
- **Add a command** — add an entry to the registry in `src/utils/commands.ts`;
  it appears in `help` automatically.
- **Section content** — edit the matching file in `src/data/`.
