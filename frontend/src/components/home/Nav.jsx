import { Link } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import { LogoMark } from "../common/Logo";

const LINKS = [
  ["Work", "#work"],
  ["Signals", "#signals"],
  ["Lab", "#lab"],
  ["Terminal", "#terminal"],
  ["Contact", "#contact"],
];

export default function Nav({ scrollTo }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 26 });

  return (
    <header className="fixed inset-x-0 top-0 z-[900]">
      <motion.div className="h-[2px] origin-left bg-[var(--cyan)] shadow-[0_0_12px_rgba(0,240,255,0.7)]" style={{ scaleX }} data-testid="nav-progress" />
      <div className="border-b border-white/[0.06] bg-[#05070C]/70 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5 md:px-8">
          <button onClick={() => scrollTo(0)} className="flex items-center gap-2.5" data-testid="nav-logo" aria-label="Back to top">
            <LogoMark size={22} glow />
            <span className="font-display text-sm font-semibold tracking-wide text-white">
              DIVYANSH<span className="text-[var(--cyan)]">.OS</span>
            </span>
          </button>

          <nav className="hidden items-center gap-7 lg:flex">
            {LINKS.map(([label, hash]) => (
              <button
                key={hash}
                data-testid={`nav-link-${hash.slice(1)}`}
                onClick={() => scrollTo(hash)}
                className="group relative font-mono2 text-[11px] tracking-[0.22em] text-white/55 transition hover:text-white"
              >
                {label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-[var(--cyan)] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/recruiter"
              data-testid="nav-recruiter-link"
              className="hidden font-mono2 text-[10px] tracking-[0.2em] text-white/55 transition hover:text-[var(--cyan)] sm:inline-block"
            >
              RECRUITER
            </Link>
            <Link
              to="/os"
              data-testid="nav-os-link"
              className="hidden rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono2 text-[10px] tracking-[0.16em] text-white/70 transition hover:border-[var(--cyan)]/40 hover:text-white md:inline-block"
            >
              OS MODE
            </Link>
            <button
              data-testid="nav-hire"
              onClick={() => scrollTo("#contact")}
              className="flex items-center gap-2 rounded-full bg-[var(--cyan)] px-4 py-2 font-display text-[11px] font-bold text-[#05070C] shadow-[0_0_28px_rgba(0,240,255,0.3)] transition hover:shadow-[0_0_44px_rgba(0,240,255,0.55)]"
            >
              HIRE ME
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
