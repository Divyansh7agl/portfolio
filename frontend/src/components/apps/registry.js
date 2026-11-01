import { User, FolderGit2, Cpu, Trophy, FlaskConical, SquareTerminal, FileText, Mail, Activity, Info } from "lucide-react";
import AboutApp from "./AboutApp";
import ProjectsApp from "./ProjectsApp";
import SkillsApp from "./SkillsApp";
import CommandCenterApp from "./CommandCenterApp";
import AchievementsApp from "./AchievementsApp";
import LabApp from "./LabApp";
import TerminalApp from "./TerminalApp";
import ResumeApp from "./ResumeApp";
import ContactApp from "./ContactApp";

export const APPS = {
  about: { id: "about", title: "About Me", icon: User, component: AboutApp, w: 800, h: 580, accent: "#00F0FF", desc: "Who I am & how I work" },
  projects: { id: "projects", title: "Projects", icon: FolderGit2, component: ProjectsApp, w: 920, h: 640, accent: "#38BDF8", desc: "Explorer + case studies" },
  command: { id: "command", title: "Command Center", icon: Activity, component: CommandCenterApp, w: 920, h: 640, accent: "#22D3EE", desc: "Live GitHub & LeetCode stats" },
  skills: { id: "skills", title: "Skills", icon: Cpu, component: SkillsApp, w: 780, h: 560, accent: "#8B5CF6", desc: "The stack I work with" },
  achievements: { id: "achievements", title: "Achievements", icon: Trophy, component: AchievementsApp, w: 840, h: 620, accent: "#FBBF24", desc: "Wins, medals & milestones" },
  lab: { id: "lab", title: "Engineering Lab", icon: FlaskConical, component: LabApp, w: 880, h: 620, accent: "#00F0FF", desc: "What I'm building & exploring" },
  terminal: { id: "terminal", title: "Terminal", icon: SquareTerminal, component: TerminalApp, w: 680, h: 460, accent: "#22E5A1", desc: "DIVYANSH.OS shell" },
  resume: { id: "resume", title: "Resume", icon: FileText, component: ResumeApp, w: 800, h: 660, accent: "#A78BFA", desc: "View & download PDF" },
  contact: { id: "contact", title: "Contact", icon: Mail, component: ContactApp, w: 660, h: 620, accent: "#00F0FF", desc: "Say hello" },
  welcome: { id: "welcome", title: "Welcome", icon: Info, component: null, w: 580, h: 430, accent: "#00F0FF", desc: "", hidden: true },
};

export const DESKTOP_ORDER = ["about", "projects", "command", "skills", "achievements", "lab", "terminal", "resume", "contact"];
export const DOCK_ORDER = DESKTOP_ORDER;
