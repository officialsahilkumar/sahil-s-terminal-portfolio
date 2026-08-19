export interface Certification {
  id: number;
  title: string;
  issuer: string;
  certificate_link: string;
}

export const certifications: Certification[] = [
  {
    id: 1,
    title: "Cybersecurity Skilling Program",
    issuer: "IIT Kanpur",
    certificate_link: "https://drive.google.com/file/d/13N2kf4UsjL97aI2vrknDT7ETWkZmG4a4/view",
  },
  {
    id: 2,
    title: "Winner of Neuro Nest Hackathon",
    issuer: "GL Bajaj Institute of Technology and Management",
    certificate_link: "https://drive.google.com/file/d/1XkO_gSIDdYulrDEsYwnQ3lQfy07AEG0K/view",
  },
];

export const renderCertifications = (
  certifications: Certification[]
): JSX.Element => {
  return (
    <div>
      <br />
      <h2>Certifications :</h2>
      <br />
      <ul>
        {certifications.map((certification) => (
          <li key={certification.id}>
            - {certification.title} - {certification.issuer} -{" "}
            <a href={certification.certificate_link} target="_blank" rel="noopener noreferrer">
              📄
            </a>{" "}
            (clickable link)
          </li>
        ))}
      </ul>
      <br />
    </div>
  );
};
