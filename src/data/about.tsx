import { profile } from "./profile";
import { skillData } from "./skills";
import { ExternalLink } from "../components/ui/ExternalLink";

export const about = profile;

export const renderAbout = (data: typeof profile): JSX.Element => {
  return (
    <div>
      <br />
      <p>Name: {data.name}</p>
      <p>Role: {data.title}</p>
      <br />
      <p>Location: {data.location}</p>
      <p>
        Email: <ExternalLink href={`mailto:${data.email}`}>{data.email}</ExternalLink>
      </p>
      <p>
        Phone: <ExternalLink href={`tel:${data.phone}`}>{data.phone}</ExternalLink>
      </p>
      <br />
      <p>Skills:</p>
      <ul>
        {skillData.map((skill, index) => (
          <li key={index}>- {skill.title}: {skill.skills.join(", ")}</li>
        ))}
      </ul>
      <br />
      <p>Summary:</p>
      <p>- {data.summary}</p>
      <br />
      <p>Connect with Me:</p>
      <br />
      <ul>
        <li>- LinkedIn: <ExternalLink href={data.links.linkedIn} /></li>
        <li>- GitHub: <ExternalLink href={data.links.github} /></li>
        <li>- Leetcode: <ExternalLink href={data.links.leetcode} /></li>
        <li>- Codeforces: <ExternalLink href={data.links.codeforces} /></li>
        <li>- Instagram: <ExternalLink href={data.links.instagram} /></li>
      </ul>
      <br />
    </div>
  );
};
