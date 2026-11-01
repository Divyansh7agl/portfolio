import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { LogoMark, Wordmark } from "../common/Logo";
import { useClock } from "../../lib/hooks";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function TopBar({ onRecruiter, activeTitle }) {
  const now = useClock();
  const date = `${DAYS[now.getDay()]} ${now.getDate()} ${now.toLocaleString("en", { month: "short" })}`;
  const time = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  return (
    <header
      className="glass fixed inset-x-0 top-0 z-[9500] flex h-[42px] items-center justify-between border-x-0 border-t-0 px-4"
      data-testid="top-bar"
    >
      <div className="flex items-center gap-3">
        <LogoMark size={20} glow />
        <Wordmark />
        <span className="hidden rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono2 text-[10px] text-white/50 sm:inline-block">
          v2.4
        </span>
      </div>

      <div className="hidden items-center gap-2 lg:flex" data-testid="system-status">
        <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-[#28C840] shadow-[0_0_8px_rgba(40,200,64,0.8)]" />
        <span className="font-mono2 text-[10px] tracking-[0.18em] text-white/50">ALL SYSTEMS OPERATIONAL</span>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-3 font-mono2 text-[11px] text-white/60 md:flex" data-testid="top-clock">
          <span>{date}</span>
          <span className="text-white/30">|</span>
          <span className="text-white/85 tabular-nums">{time}</span>
        </div>
        {activeTitle && (
          <span className="hidden max-w-[180px] truncate rounded-md border border-white/10 px-2 py-1 font-mono2 text-[10px] text-white/60 xl:block">
            {activeTitle}
          </span>
        )}
        <motion.button
          data-testid="recruiter-mode-button"
          onClick={onRecruiter}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="flex items-center gap-2 rounded-full bg-[var(--cyan)] px-3.5 py-1.5 font-display text-[11px] font-bold tracking-wide text-ink-0 shadow-[0_0_24px_rgba(0,240,255,0.35)] transition hover:shadow-[0_0_34px_rgba(0,240,255,0.55)]"
        >
          <Briefcase size={12} />
          RECRUITER MODE
        </motion.button>
      </div>
    </header>
  );
}
