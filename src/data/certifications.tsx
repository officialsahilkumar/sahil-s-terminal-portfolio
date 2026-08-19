export interface Certification {
  id: number;
  title: string;
  issuer: string;
  certificate_link: string;
}

export const certifications: Certification[] = [];

export const renderCertifications = (
  certifications: Certification[]
): JSX.Element => {
  return (
    <div>
      <br />
      <h2>Certifications :</h2>
      <br />
      {certifications.length === 0 ? (
        <p>No certifications as of now.</p>
      ) : (
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
      )}
      <br />
    </div>
  );
};
