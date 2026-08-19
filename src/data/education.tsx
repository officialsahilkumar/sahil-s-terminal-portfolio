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
    institution: "RCC Institute of Information Technology, Kolkata",
    degree: "B.Tech - Computer Science and Engineering",
    date: "2019 - 2023",
    grade: "CGPA: 8.79",
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
