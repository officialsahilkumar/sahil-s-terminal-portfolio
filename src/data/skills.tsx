export interface SkillData {
  title: string;
  skills: string[];
}

// Single source for the skill list — used by both `skills` and `whoami`.
export const skillData: SkillData[] = [
  {
    title: "AI / GenAI",
    skills: ["Multi-Agent Systems", "Agent Orchestration", "MCP", "RAG", "Prompt Engineering", "Vespa"],
  },
  {
    title: "Programming Languages",
    skills: ["C/C++", "JavaScript", "Python"],
  },
  {
    title: "Libraries/Frameworks",
    skills: ["React.js", "Node.js", "Express.js", "Tailwind CSS", "TypeScript", "Prisma", "Mongoose", "Next.js", "Redis", "Fastify", "Kafka"],
  },
  {
    title: "Tools / Platforms",
    skills: ["GitHub", "Docker", "Git", "Postman", "Netlify", "Kubernetes", "AWS"],
  },
  {
    title: "Databases",
    skills: ["MySQL", "MongoDB", "PostgreSQL"],
  },
];

export const renderSkills = (): JSX.Element => {
  return (
    <div>
      <br />
      <ul>
        {skillData.map((skill, index) => (
          <li key={index}>
            - {skill.title} : {skill.skills.join(", ")}
          </li>
        ))}
      </ul>
      <br />
    </div>
  );
};
