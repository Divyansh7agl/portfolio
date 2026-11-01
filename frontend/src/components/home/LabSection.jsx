import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Compass, FlaskConical } from "lucide-react";
import SectionHead from "./SectionHead";
import { LAB } from "../../data/content";

const STATUS = {
  Shipped: { color: "#34D399", live: false },
  Active: { color: "#00F0FF", live: true },
  Live: { color: "#A78BFA", live: false },
};

const CATEGORIES = ["All", "AI experiments", "Full-stack applications", "Cloud infrastructure", "Developer tools"];

export default function LabSection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredExperiments = LAB.experiments.filter(
    (e) => activeCategory === "All" || e.category === activeCategory
  );

  return (
    <section id="lab" className="relative px-5 py-24 md:px-10 md:py-36" data-testid="lab-section">
      <div className="mx-auto max-w-7xl">
        <SectionHead
          index="04"
          eyebrow="ENGINEERING LAB"
          title={
            <>
              Always building <span className="text-stroke-cyan">something.</span>
            </>
          }
          desc="Side-projects, proof-of-concepts, and active engineering experiments from my workbench."
        />

        {/* Filter categories */}
        <div className="mb-10 flex flex-wrap gap-2" data-testid="lab-filters">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              data-testid={`lab-filter-${cat.toLowerCase().replace(/[^a-z]+/g, "-")}`}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-1.5 font-mono2 text-xs transition duration-200 ${
                activeCategory === cat
                  ? "bg-[var(--cyan)] font-semibold text-[#05070C] shadow-[0_0_20px_rgba(0,240,255,0.4)]"
                  : "border border-white/10 bg-white/[0.03] text-white/60 hover:border-white/20 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Experiment cards grid */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" data-testid="lab-experiments-grid">
          {filteredExperiments.map((exp, i) => {
            const st = STATUS[exp.status] || STATUS.Active;
            return (
              <motion.article
                key={exp.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: Math.min(i * 0.05, 0.25) }}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#0A0F1A]/80 p-6 backdrop-blur-sm transition duration-300 hover:border-[var(--cyan)]/30 hover:bg-[#0D1424] hover:shadow-[0_20px_50px_rgba(0,240,255,0.06)]"
                data-testid={`lab-card-${i}`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono2 text-xs tracking-wider text-white/30">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono2 text-[10px]"
                      style={{
                        borderColor: `${st.color}44`,
                        background: `${st.color}14`,
                        color: st.color,
                      }}
                    >
                      {st.live && (
                        <span className="pulse-dot h-1.5 w-1.5 rounded-full" style={{ background: st.color }} />
                      )}
                      {exp.status.toUpperCase()}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-lg font-bold text-white transition group-hover:text-[var(--cyan)]">
                    {exp.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-white/60">
                    {exp.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.06]">
                  <div className="flex flex-wrap items-center gap-1.5 mb-3">
                    {exp.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-white/[0.07] bg-white/[0.03] px-2 py-0.5 font-mono2 text-[10px] text-white/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-mono2 text-[10px] tracking-wider text-white/30">
                      {exp.category}
                    </span>
                    {exp.link ? (
                      <a
                        href={exp.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid={`lab-link-${i}`}
                        className="flex items-center gap-1 text-xs font-semibold text-[var(--cyan)] transition hover:underline"
                      >
                        Launch <ArrowUpRight size={13} />
                      </a>
                    ) : (
                      <span className="font-mono2 text-[10px] text-white/30">Internal prototype</span>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Currently exploring banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 rounded-2xl border border-[var(--violet)]/25 bg-[var(--violet)]/[0.06] p-6 backdrop-blur-md"
          data-testid="lab-currently-exploring"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Compass size={18} className="text-[#C4B5FD]" />
              <span className="font-display text-base font-bold text-white">Currently exploring</span>
            </div>
            <span className="font-mono2 text-[10px] tracking-wider text-white/40">
              Active research · updated weekly
            </span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {LAB.currentlyExploring.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-black/30 px-3.5 py-1.5 font-mono2 text-xs text-white/70"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
