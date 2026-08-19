// Single source of truth for all personal / contact information.
// Edit values here once; every command and section reads from this object.

export interface ProfileLinks {
  linkedIn: string;
  github: string;
  instagram: string;
  leetcode: string;
  codeforces: string;
  resume: string;
}

export interface Profile {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  githubUsername: string;
  summary: string;
  links: ProfileLinks;
}

export const profile: Profile = {
  name: "Sahil Kumar",
  title: "Software Engineer",
  location: "Kolkata, India",
  email: "sahil2002kumar02@gmail.com",
  phone: "+91-9682125161",
  githubUsername: "officialsahilkumar",
  summary:
    "Software engineer focused on AI systems and agent platforms, with strong full-stack and DevOps foundations. I build multi-tenant agent orchestration, RAG pipelines, and high-performance web applications.",
  links: {
    linkedIn: "https://www.linkedin.com/in/rahul-kumar-716045207/",
    github: "https://github.com/officialsahilkumar",
    instagram: "https://www.instagram.com/officialrahulsamyal/",
    leetcode: "https://leetcode.com/u/Corporate_Majdoor__/",
    codeforces: "https://codeforces.com/profile/Kalu---",
    resume:
      "https://drive.google.com/file/d/11u9ldjSP0WIFXEqw2qgle76tHJr3UvtP/view?usp=sharing",
  },
};
