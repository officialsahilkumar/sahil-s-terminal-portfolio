export interface Education {
  id: number;
  institution: string;
  degree: string;
  date: string;
  grade: string;
}

export const education: Education[] = [
  {
    id: 1,
    institution: "GL Bajaj Institute of Technology and Management, Greater Noida",
    degree: "Bachelor of Technology - BTech, Information Technology",
    date: "2021 - 2025",
    grade: "CGPA: 8.0",
  },
  {
    id: 2,
    institution: "Kendriya Vidyalaya Hiranagar",
    degree: "High School",
    date: "2021 batch",
    grade: "10th grade percentage: 86.4% \n12th grade percentage: 86.2%",
  },
];

export const renderEducation = (education: Education[]): JSX.Element => {
  const formattedEducation = education
    .map(
      (edu, index) =>
        `${edu.institution}
${edu.degree}
${edu.date}
${edu.grade}
${index !== education.length - 1 ? "\n--------------------------------------------------------------\n" : ""}`
    )
    .join("\n");

  return (
    <pre>
      <code>
        <br />
        {formattedEducation}
        <br />
      </code>
    </pre>
  );
};
