import { profile } from "./profile";
import { ExternalLink } from "../components/ui/ExternalLink";

export const renderContact = (): JSX.Element => {
  return (
    <div>
      <br />
      <p>Email: <ExternalLink href={`mailto:${profile.email}`}>{profile.email}</ExternalLink></p>
      <p>Phone: <ExternalLink href={`tel:${profile.phone}`}>{profile.phone}</ExternalLink></p>
      <p>LinkedIn: <ExternalLink href={profile.links.linkedIn} /></p>
      <p>GitHub: <ExternalLink href={profile.links.github} /></p>
      <p>Leetcode: <ExternalLink href={profile.links.leetcode} /></p>
      <p>Codeforces: <ExternalLink href={profile.links.codeforces} /></p>
      <p>Instagram: <ExternalLink href={profile.links.instagram} /></p>
      <br />
    </div>
  );
};
