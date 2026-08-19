export interface SkillData {
  title: string;
  skills: string[];
}

// Single source for the skill list — used by both `skills` and `whoami`.
export const skillData: SkillData[] = [
  {
    title: "AI / GenAI",
    skills: ["MCP", "RAG", "Prompt Engineering"],
  },
  {
    title: "Programming Languages",
    skills: ["C/C++", "JavaScript", "Python"],
  },
  {
    title: "Libraries/Frameworks",
    skills: ["React.js", "Node.js", "Express.js", "Tailwind CSS", "TypeScript", "Prisma", "Mongoose", "Next.js", "Fastify"],
  },
  {
    title: "Tools / Platforms",
    skills: ["GitHub", "Docker", "Git", "Postman", "Netlify"],
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
