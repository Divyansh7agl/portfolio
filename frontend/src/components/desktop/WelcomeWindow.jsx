import { useOS } from "./Desktop";
import { motion } from "framer-motion";
import { ArrowRight, Briefcase, FolderGit2 } from "lucide-react";
import { PROFILE } from "../../data/content";

export default function WelcomeWindow({ onRecruiter }) {
  const { openApp, closeApp } = useOS();
  return (
    <div className="flex h-full flex-col justify-between p-6" data-testid="welcome-window">
      <div>
        <p className="font-mono2 text-[11px] tracking-[0.25em] text-[var(--cyan)]">WELCOME ABOARD</p>
        <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-white">
          This is my desk, <span className="text-[var(--cyan)]">literally.</span>
        </h2>
        <p className="mt-3 max-w-[420px] text-sm leading-relaxed text-white/60">
          {PROFILE.first} built this portfolio as an operating system. Click any desktop icon or dock item to open an
          app, drag windows by their title bar, minimize or maximize them — everything actually works.
        </p>
        <ul className="mt-4 space-y-1.5 font-mono2 text-[11px] text-white/45">
          <li>→ double-click a title bar to maximize</li>
          <li>→ try the Terminal and run <span className="text-[var(--cyan)]">help</span></li>
          <li>→ short on time? use Recruiter Mode</li>
        </ul>
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-2">
        <motion.button
          data-testid="welcome-open-about"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => openApp("about")}
          className="flex items-center gap-2 rounded-full bg-[var(--cyan)] px-4 py-2 text-xs font-bold text-ink-0"
        >
          Open About <ArrowRight size={12} />
        </motion.button>
        <motion.button
          data-testid="welcome-open-projects"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => openApp("projects")}
          className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white/80 transition hover:border-white/30"
        >
          <FolderGit2 size={12} /> Projects
        </motion.button>
        <motion.button
          data-testid="welcome-recruiter"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onRecruiter}
          className="flex items-center gap-2 rounded-full border border-[var(--violet)]/40 bg-[var(--violet)]/15 px-4 py-2 text-xs font-semibold text-[#C4B5FD]"
        >
          <Briefcase size={12} /> Recruiter Mode
        </motion.button>
        <button
          data-testid="welcome-dismiss"
          onClick={() => closeApp("welcome")}
          className="ml-auto text-[11px] text-white/35 underline-offset-2 hover:text-white/70 hover:underline"
        >
          dismiss
        </button>
      </div>
    </div>
  );
}
