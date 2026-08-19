export interface Experience {
  id: number;
  title: string;
  company: string;
  location: string;
  date: string;
  bullets: string[];
}

export const experience: Experience[] = [
  {
    id: 1,
    title: "Associate Software Development Engineer",
    company: "Juspay",
    location: "Bengaluru",
    date: "May 2025 - Present",
    bullets: [
      "Architected & built Xyne Claw, a multi-tenant AI agent platform for Xyne Spaces, enabling async agent orchestration, scheduled workflows, and production agent execution integrated with chat & workspaces.",
      "Built the execution runtime on the Pi coding-agent SDK with multi-LLM routing, sandboxed execution, subagents, & a secure MCP layer (credential vault + proxied tools) supporting 100+ MCP connectors.",
      "Engineered an end-to-end attachment processing pipeline in Xyne Spaces, handling uploads, chunking, indexing in Vespa, and efficient retrieval at scale.",
      "Developed a high-performance, virtualized multi-format document viewing system (10+ formats) with superior preview capabilities over Slack, improving content accessibility and overall user experience.",
    ],
  },
  {
    id: 2,
    title: "SDE Intern",
    company: "Bombay Shaving Company",
    location: "Gurgaon",
    date: "July 2024 - September 2024",
    bullets: [
      "Built an automated data pipeline to scrape, clean, and process customer review data at scale.",
      "Developed a scalable system using the MERN stack, integrating BeautifulSoup for data extraction and the Gemini API for sentiment analysis, producing structured insights with exportable reports.",
    ],
  },
];

export const renderExperience = (experienceData: Experience[]): JSX.Element => {
  return (
    <div>
      <br />
      {experienceData.map((exp, index) => (
        <div key={exp.id} className="mb-4">
          <p>
            {exp.title} ~ {exp.company} | {exp.location} | {exp.date}
          </p>
          <ul>
            {exp.bullets.map((bullet, i) => (
              <li key={i}>- {bullet}</li>
            ))}
          </ul>
          {index !== experienceData.length - 1 && (
            <div className="my-4">
              --------------------------------------------------------------
            </div>
          )}
        </div>
      ))}
      <br />
    </div>
  );
};
