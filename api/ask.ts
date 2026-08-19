// Vercel serverless function: /api/ask
//
// Holds the Gemini API key server-side (never exposed to the browser).
// Answers visitor questions about Sahil using the portfolio context below.
//
// Setup: add GEMINI_API_KEY in Vercel → Project Settings → Environment Variables.

import type { VercelRequest, VercelResponse } from "@vercel/node";

// Model is overridable via the GEMINI_MODEL env var (no code change needed).
// Free-tier quota (per the Google AI Studio rate-limit page) — pick by need:
//   gemini-2.5-flash-lite  -> 10 RPM,  20 requests/day   (default, low traffic)
//   gemini-2.5-flash       ->  5 RPM,  20 requests/day
//   gemini-3.1-flash-lite  -> 15 RPM, 500 requests/day   (best for a public site)
// NOTE: the 2.0-* models have NO free quota (0/0) and will always return 429.
const MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash-lite";

const PORTFOLIO_CONTEXT = `
PERSON: Sahil Kumar — Software Engineer. Based in Kolkata, India.
Contact: sahil2002kumar02@gmail.com, +91-9682125161.

EXPERIENCE:
- Accenture — Associate Software Engineer (Kolkata, March 2024 - Present):
  Developed a real-time wildlife monitoring platform for Utah DWR using React,
  TypeScript, Node.js, and Google Cloud Pub/Sub to track GPS-collared animals and
  analyze movement data. Built interactive geospatial visualizations with the
  Google Maps SDK, processing satellite-transmitted GPS coordinates to display
  animal movements with species-based filtering. Implemented geofencing and
  species-specific boundary alerts to flag animals moving outside designated areas.
  Processed large-scale wildlife datasets covering 11,798+ animals and 20+ years of
  data to support analysis of migration patterns, population trends, disease,
  mortality, and habitat connectivity. Supported BMW Canada integrations using IBM
  IIB, troubleshooting transaction failures and implementing integration-flow
  changes. Performed AWS server patching and vulnerability remediation, validating
  fixes through Wiz vulnerability scans.

EDUCATION:
- RCC Institute of Information Technology, Kolkata — B.Tech, Computer Science and
  Engineering (2019 - 2023), CGPA 8.79.

SKILLS:
- AI / GenAI: MCP, RAG, Prompt Engineering.
- Languages: C/C++, JavaScript, Python.
- Libraries/Frameworks: React.js, Node.js, Express.js, Tailwind CSS, TypeScript,
  Prisma, Mongoose, Next.js, Fastify.
- Tools/Platforms: GitHub, Docker, Git, Postman, Netlify.
- Databases: MySQL, MongoDB, PostgreSQL.

PROJECTS:
- EduGlow (MERN): ed-tech platform to create, consume, and rate courses; instructors
  can sell courses and track sales. Live: https://edu-glow.vercel.app/
- ShareXYLab (Next.js, ShadCN, MongoDB, Redis): link & code sharing with Redis
  caching, API rate limiting, CI/CD via Cloud Build/Cloud Run.
  Live: https://share.xylab.in/
- VaultX (React.js, Tailwind, Solana, Web3, BIP39): blockchain web wallet creating
  Solana/Ethereum wallets from a mnemonic. Live: https://vault-x-brown.vercel.app/
- Quizify (React.js, Tailwind, Google Gemini API): dynamic quiz generator.

ACHIEVEMENTS:
- 1850+ rating on LeetCode, 1470+ on Codeforces.
- Solved 800+ DSA problems across platforms.
- Ranked 249/30,708 (LeetCode Weekly 470) and 434/37,342 (Biweekly 178).

CERTIFICATIONS: None as of now.
`;

const COMMANDS =
  "whoami, work, myprojects, skills, achievements, edu, certs, contributions, contactme, resume, linkedin, github, leetcode, codeforces";

const SYSTEM = `You are the portfolio assistant for Sahil Kumar's interactive terminal portfolio.
Answer the visitor's question in 2-4 short, friendly sentences using ONLY the context below — never invent facts.
After answering, if a terminal command would show fuller details, suggest it in backticks, e.g. "Run \`work\` for the full experience."
Available commands: ${COMMANDS}.
If the question is unrelated to Sahil or this portfolio, politely say you can only answer about Sahil and suggest \`help\`.
Keep the tone concise and terminal-appropriate. Do not use markdown headings or bullet points.

CONTEXT:${PORTFOLIO_CONTEXT}`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY is not set");
    return res.status(500).json({ error: "Server configuration error." });
  }

  const question = String(req.body?.question ?? "").trim().slice(0, 500);
  if (!question) {
    return res.status(400).json({ error: "Missing question." });
  }

  console.log(`ask: "${question.slice(0, 80)}..."`);

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`;
    const geminiRes = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM }] },
        contents: [{ role: "user", parts: [{ text: question }] }],
        generationConfig: { temperature: 0.4, maxOutputTokens: 500 },
      }),
    });

    if (geminiRes.status === 429) {
      console.warn("Gemini rate limit hit");
      return res.status(429).json({
        error: "The AI agent is busy right now — please try again in a few seconds.",
      });
    }

    if (!geminiRes.ok) {
      const body = await geminiRes.text();
      console.error(`Gemini error ${geminiRes.status}: ${body.slice(0, 200)}`);
      return res.status(502).json({ error: "The AI service returned an error. Try again shortly." });
    }

    const data = await geminiRes.json();
    const answer =
      data?.candidates?.[0]?.content?.parts
        ?.map((p: { text?: string }) => p.text ?? "")
        .join("")
        .trim() || "Sorry, I couldn't generate a response. Try `help` for commands.";

    return res.status(200).json({ answer });
  } catch (err) {
    console.error("ask handler error:", err);
    return res.status(500).json({ error: "Something went wrong. Try again shortly." });
  }
}
