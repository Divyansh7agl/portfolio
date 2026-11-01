import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import { SKILLS } from "../../data/content";
import { useOS } from "../desktop/Desktop";

export default function SkillsApp() {
  const { openApp } = useOS();
  return (
    <div className="p-5" data-testid="skills-app">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="font-mono2 text-[11px] tracking-[0.28em] text-[var(--violet)]">STACK MATRIX</p>
          <h2 className="mt-1.5 font-display text-xl font-bold tracking-tight text-white">What I work with</h2>
        </div>
        <span className="font-mono2 text-[10px] text-white/30">no inflated percentages, ever</span>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 pr-1 sm:grid-cols-2">
        {SKILLS.map((s, i) => (
          <motion.div
            key={s.category}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
            className="rounded-xl border border-white/[0.08] bg-ink-2/70 p-4"
            data-testid={`skill-category-${s.category.toLowerCase().replace(/[^a-z]+/g, "-")}`}
          >
            <h3 className="font-display text-[13px] font-bold text-white">{s.category}</h3>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {s.items.map((it) => (
                <span key={it} className="rounded-md border border-[var(--violet)]/25 bg-[var(--violet)]/10 px-2 py-0.5 font-mono2 text-[10px] text-[#C4B5FD]">
                  {it}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        onClick={() => openApp("command")}
        data-testid="skills-open-command-center"
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--cyan)]/25 bg-[var(--cyan)]/[0.06] py-2.5 text-xs font-semibold text-[var(--cyan)] transition hover:bg-[var(--cyan)]/[0.12]"
      >
        <Activity size={13} /> For live GitHub & LeetCode stats — open the Command Center
      </motion.button>
    </div>
  );
}
