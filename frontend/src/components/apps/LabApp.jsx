import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Compass } from "lucide-react";
import { LAB } from "../../data/content";

const STATUS = {
  Shipped: { color: "#34D399", live: false },
  Active: { color: "#00F0FF", live: true },
  Live: { color: "#A78BFA", live: false },
};
const CATS = ["All", "AI experiments", "Full-stack applications", "Cloud infrastructure", "Developer tools"];

export default function LabApp() {
  const [cat, setCat] = useState("All");
  const list = LAB.experiments.filter((e) => cat === "All" || e.category === cat);

  return (
    <div className="p-5" data-testid="lab-app">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono2 text-[11px] tracking-[0.28em] text-[var(--cyan)]">ENGINEERING LAB</p>
          <h2 className="mt-1.5 font-display text-xl font-bold tracking-tight text-white">Always building something</h2>
        </div>
        <span className="font-mono2 text-[10px] text-white/30">{LAB.experiments.length} active threads</span>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5" data-testid="lab-filters">
        {CATS.map((c) => (
          <button
            key={c}
            data-testid={`lab-filter-${c.toLowerCase().replace(/[^a-z]+/g, "-")}`}
            onClick={() => setCat(c)}
            className={`rounded-full px-3 py-1 text-[11px] font-semibold transition ${
              cat === c ? "bg-[var(--cyan)] text-ink-0" : "border border-white/10 text-white/50 hover:text-white"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-4 divide-y divide-white/[0.06]">
        {list.map((e, i) => {
          const st = STATUS[e.status] || STATUS.Active;
          return (
            <motion.div
              key={e.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.25) }}
              className="group flex items-start gap-4 py-4"
              data-testid={`lab-experiment-${i}`}
            >
              <span className="font-display text-2xl font-extrabold leading-none text-white/[0.12] transition group-hover:text-white/25">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-[15px] font-bold text-white">{e.title}</h3>
                  <span className="flex items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono2 text-[9px]" style={{ borderColor: `${st.color}44`, background: `${st.color}12`, color: st.color }}>
                    {st.live && <span className="pulse-dot h-1 w-1 rounded-full" style={{ background: st.color }} />}
                    {e.status.toUpperCase()}
                  </span>
                  <span className="font-mono2 text-[9px] tracking-[0.14em] text-white/30">{e.category}</span>
                </div>
                <p className="mt-1.5 max-w-[520px] text-[13px] leading-relaxed text-white/55">{e.desc}</p>
                <div className="mt-2 flex flex-wrap items-center gap-1.5">
                  {e.stack.map((t) => (
                    <span key={t} className="rounded-md border border-white/[0.08] bg-white/[0.04] px-1.5 py-0.5 font-mono2 text-[9px] text-white/50">{t}</span>
                  ))}
                  {e.link && (
                    <a href={e.link} target="_blank" rel="noopener noreferrer" data-testid={`lab-link-${i}`} className="ml-1 flex items-center gap-1 text-[11px] font-semibold text-[var(--cyan)] hover:underline">
                      open <ArrowUpRight size={11} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-5 rounded-xl border border-[var(--violet)]/25 bg-[var(--violet)]/[0.07] p-4"
        data-testid="lab-currently-exploring"
      >
        <div className="flex items-center gap-2">
          <Compass size={14} className="text-[#C4B5FD]" />
          <span className="font-display text-[13px] font-bold text-white">Currently exploring</span>
          <span className="ml-auto font-mono2 text-[9px] text-white/35">config-driven · updates often</span>
        </div>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {LAB.currentlyExploring.map((t) => (
            <span key={t} className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 font-mono2 text-[10px] text-white/60">{t}</span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
