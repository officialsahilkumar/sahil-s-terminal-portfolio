export const achievements: string[] = [
  "Achieved 1850+ rating on LeetCode and 1470+ rating on Codeforces.",
  "Solved 800+ DSA problems across multiple platforms.",
  "Ranked 249/30,708 and 434/37,342 in LeetCode Weekly 470 and Biweekly 178 contests, respectively.",
  "Won 1st place in Neuro Nest Hackathon - GL Bajaj Institute of Technology and Management.",
];

export const renderAchievements = (): JSX.Element => {
  return (
    <div>
      <br />
      <h2>Achievements :</h2>
      <br />
      <ul>
        {achievements.map((achievement, index) => (
          <li key={index}>- {achievement}</li>
        ))}
      </ul>
      <br />
    </div>
  );
};
