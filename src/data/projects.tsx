import { ExternalLink } from "../components/ui/ExternalLink";
import { profile } from "./profile";

export interface FrontendProject {
  title: string;
  description: string;
  technologies: string[];
  liveLink: string;
}

export interface FullStackProject {
  title: string;
  description: string;
  achievements: string[];
  technologies: string[];
  liveLink: string;
}

export interface OtherProject {
  title: string;
  description: string;
  note?: string;
}

export interface ProjectData {
  frontendProjects: FrontendProject[];
  fullStackProjects: FullStackProject[];
  otherProjects: OtherProject[];
}

export const projects: ProjectData = {
  frontendProjects: [
    {
      title: "VaultX",
      description:
        "Developed a blockchain-based web wallet (Web3) to create different Solana and Ethereum wallets using a mnemonic phrase. The project utilizes React.js, CSS, the BIP39 library, JavaScript, Solana, and Ethereum to create wallets",
      technologies: ["React.js", "Tailwind CSS", "JavaScript", "Solana", "Web3", "BIP39 library"],
      liveLink: "https://vault-x-brown.vercel.app/",
    },
    {
      title: "Quizify",
      description:
        "Developed Quizify a dynamic quiz generator website where users can select a topic, number of questions, and difficulty level to generate a quiz, and view their score at the end. The project utilizes the Google Gemini API to create quizzes based on the difficulty selected by the user.",
      technologies: ["React.js", "Tailwind CSS", "Google Gemini API"],
      liveLink: "https://quiz-generator-lilac.vercel.app/",
    },
  ],
  fullStackProjects: [
    {
      title: "EduGlow",
      description:
        "EduGlow is a comprehensive ed-tech platform that enables users to create, consume, and rate educational content, with student ratings ranging from 0 to 5 stars. Built using the MERN stack, instructors can also use the platform to sell courses and track sales percentage (1 - 100).",
      achievements: [
        "Enabled users to create, consume, and rate educational content with a 0-5 star rating system.",
        "Allowed instructors to sell courses and track sales percentage on a MERN-stack platform.",
      ],
      technologies: ["Node.js", "Express.js", "React.js", "MongoDB"],
      liveLink: "https://edu-glow.vercel.app/",
    },
    {
      title: "QuikShare",
      description:
        "Built a full-stack web app with Next.js, ShadCN, and MongoDB for seamless link and code sharing, with Redis caching to enhance performance. Implemented rate limiting on API routes to prevent abuse and ensure service reliability, and set up CI/CD pipelines with Cloud Build triggers for automated testing & deployment on Cloud Run.",
      achievements: [
        "Implemented Redis caching to enhance performance.",
        "Added rate limiting on API routes to prevent abuse and ensure reliability.",
        "Set up CI/CD pipelines with Cloud Build triggers for automated testing & deployment on Cloud Run.",
      ],
      technologies: ["Next.js", "ShadCN", "MongoDB", "Redis", "CI/CD", "Cloud Run"],
      liveLink: "https://share.taskynow.in/",
    },
  ],
  otherProjects: [
    {
      title: "Other Exciting and Innovative Projects",
      description:
        "I have a number of other exciting and innovative projects showcased on my GitHub profile that I made during my learning journey, awaiting your exploration! Feel free to visit my GitHub to delve deeper into my work.",
      note: "Note: The following is just a glimpse of my projects. Explore more on my GitHub.",
    },
  ],
};

const renderTechnologies = (technologies: string[]) =>
  technologies.map((tech, index) => <li key={index}>- {tech}</li>);

const renderSingleProject = (
  singleProject: FrontendProject | FullStackProject
) => {
  const { title, description, technologies, liveLink } = singleProject;

  return (
    <div key={title} className="mb-4">
      <h3>{title}</h3>
      <br />
      <p>{description}</p>
      <br />
      <p>Technologies:</p>
      <ul>{renderTechnologies(technologies)}</ul>
      <br />
      {liveLink && (
        <p>
          Live Link: <ExternalLink href={liveLink} />
        </p>
      )}
      <div className="my-4">
        <div>---------------------------------------------------------------</div>
      </div>
    </div>
  );
};

export const renderProject = (project: ProjectData) => {
  return (
    <div>
      <h2>⚪ FULL STACK PROJECTS: </h2>
      <br />
      {project.fullStackProjects.map((p) => renderSingleProject(p))}
      <h2>⚪ FRONTEND PROJECTS: </h2>
      <br />
      {project.frontendProjects.map((p) => renderSingleProject(p))}
      {project.otherProjects.map((other) => (
        <p key={other.title}>
          {other.description}{" "}
          <ExternalLink href={profile.links.github} />
        </p>
      ))}
    </div>
  );
};
