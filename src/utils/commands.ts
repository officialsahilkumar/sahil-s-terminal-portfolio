import React from "react";
import type { Command } from "../types";
import { about, renderAbout } from "../data/about";
import { experience, renderExperience } from "../data/experience";
import { certifications, renderCertifications } from "../data/certifications";
import { education, renderEducation } from "../data/education";
import { projects, renderProject } from "../data/projects";
import { renderHelp } from "../data/commands";
import { renderSkills } from "../data/skills";
import { renderAchievements } from "../data/achievements";
import { renderContact } from "../data/contact";
import { openNewWindow } from "../data/openNewWindow";
import Contributions from "../data/contributions";
import { Banner } from "../components/Banner";
import { profile } from "../data/profile";

// The single command registry. Each entry carries its help text, category,
// and the function that renders its output. `help` is generated from this
// object, so there is no separate command list to keep in sync.
//
// Note: `clear` and `init` are intercepted in App before execute() is called
// (they need to clear terminal state); their entries exist here so they show
// up in help and pass command validation.
export const commands: Record<string, Command> = {
  help: { description: "Show available commands", category: "info", execute: () => renderHelp(commands) },
  ask: { description: "Ask the AI agent about Sahil (e.g. ask what is his AI experience)", category: "info", execute: () => React.createElement(React.Fragment) },
  whoami: { description: "Display personal information", category: "info", execute: () => renderAbout(about) },
  myprojects: { description: "List projects", category: "info", execute: () => renderProject(projects) },
  work: { description: "Show work experience", category: "info", execute: () => renderExperience(experience) },
  certs: { description: "List certifications", category: "info", execute: () => renderCertifications(certifications) },
  edu: { description: "Show education details", category: "info", execute: () => renderEducation(education) },
  skills: { description: "Show technical skills", category: "info", execute: () => renderSkills() },
  achievements: { description: "List achievements", category: "info", execute: () => renderAchievements() },
  contributions: { description: "List my recent open source contributions", category: "info", execute: () => React.createElement(Contributions) },
  contactme: { description: "Show contact information", category: "info", execute: () => renderContact() },
  resume: { description: "Open resume", category: "links", execute: () => openNewWindow(profile.links.resume) },
  linkedin: { description: "Open LinkedIn profile", category: "links", execute: () => openNewWindow(profile.links.linkedIn) },
  github: { description: "Open GitHub profile", category: "links", execute: () => openNewWindow(profile.links.github) },
  leetcode: { description: "Open LeetCode profile", category: "links", execute: () => openNewWindow(profile.links.leetcode) },
  codeforces: { description: "Open Codeforces profile", category: "links", execute: () => openNewWindow(profile.links.codeforces) },
  instagram: { description: "Open Instagram profile", category: "links", execute: () => openNewWindow(profile.links.instagram) },
  clear: { description: "Clear the terminal", category: "system", execute: () => React.createElement(React.Fragment) },
  init: { description: "Initialize the terminal", category: "system", execute: () => React.createElement(Banner) },
};
