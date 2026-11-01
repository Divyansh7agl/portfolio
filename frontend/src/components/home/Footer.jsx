import { Github, Linkedin } from "lucide-react";
import { LogoMark } from "../common/Logo";
import { PROFILE } from "../../data/content";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] px-5 pb-10 pt-16 md:px-10" data-testid="footer">
      <p aria-hidden className="text-stroke-dim pointer-events-none select-none text-center font-display text-[13vw] font-semibold leading-none tracking-[-0.02em]">
        DIVYANSH.OS
      </p>
      <div className="mx-auto mt-10 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-6 text-center sm:flex-row sm:text-left">
        <div className="flex items-center gap-3">
          <LogoMark size={18} />
          <span className="font-mono2 text-[10px] tracking-[0.18em] text-white/40">© 2026 DIVYANSH AGARWAL — BUILT WITH REACT · FASTAPI · MONGODB</span>
        </div>
        <div className="flex items-center gap-4">
          <a href={PROFILE.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-white/45 transition hover:text-white">
            <Github size={16} />
          </a>
          <a href={PROFILE.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-white/45 transition hover:text-white">
            <Linkedin size={16} />
          </a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }} className="font-mono2 text-[10px] tracking-[0.2em] text-white/45 transition hover:text-white">
            START A CONVERSATION
          </a>
        </div>
      </div>
    </footer>
  );
}
