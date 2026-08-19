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
    title: "Associate Software Engineer",
    company: "Accenture",
    location: "Kolkata",
    date: "March 2024 - Present",
    bullets: [
      "Developed a real-time wildlife monitoring platform for Utah DWR using React, TypeScript, Node.js, and Google Cloud Pub/Sub to track GPS-collared animals and analyze movement data.",
      "Built interactive geospatial visualizations using Google Maps SDK, processing satellite-transmitted GPS coordinates to display animal movements with species-based filtering.",
      "Implemented geofencing and species-specific boundary alerts to identify when tracked animals moved outside designated areas and highlight potential movement risks.",
      "Processed large-scale wildlife datasets covering 11,798+ animals and 20+ years of data to support analysis of migration patterns, population trends, disease, mortality, and habitat connectivity.",
      "Supported BMW Canada integrations using IBM IIB, troubleshooting transaction failures and implementing integration-flow changes.",
      "Performed AWS server patching and vulnerability remediation, validating fixes through Wiz vulnerability scans.",
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
