import { motion } from "framer-motion";
import SectionHead from "./SectionHead";
import { ACHIEVEMENTS } from "../../data/content";

export default function AchievementsSection() {
  return (
    <section id="honors" className="relative px-5 py-24 md:px-10 md:py-36" data-testid="honors-section">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <SectionHead
            index="06"
            eyebrow="HONORS & MILESTONES"
            title={
              <>
                Podiums, medals & <span className="text-stroke-cyan">proof.</span>
              </>
            }
            desc="From IIT Bombay robotics finals to a Kabaddi gold medal — the pattern is the same: show up, compete, finish strong."
          />
        </div>

        <div className="relative border-l border-white/[0.08] pl-8" data-testid="honors-timeline">
          {ACHIEVEMENTS.map((a, i) => {
            const big = !!a.year;
            return (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, x: 26 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, delay: Math.min(i * 0.04, 0.25) }}
                className={`relative ${i ? "pt-10" : ""}`}
                data-testid={`honor-${i}`}
              >
                <span
                  className="absolute -left-[37px] top-1.5 h-[10px] w-[10px] rounded-full border-2 bg-[#05070C]"
                  style={{ borderColor: big ? "var(--cyan)" : "rgba(255,255,255,0.35)", boxShadow: big ? "0 0 12px rgba(0,240,255,0.6)" : "none" }}
                />
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  <div className="min-w-0 flex-1">
                    {a.year && <p className="font-mono2 text-[11px] tracking-[0.3em] text-[var(--cyan)]">{a.year}</p>}
                    <h3 className={`mt-1 font-display font-semibold tracking-tight text-white ${big ? "text-xl md:text-2xl" : "text-base md:text-lg"}`}>{a.title}</h3>
                    {a.org && <p className="mt-0.5 font-mono2 text-[10px] tracking-[0.16em] text-white/40">{a.org}</p>}
                    <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/50">{a.desc}</p>
                  </div>
                  {a.photo && (
                    <motion.img
                      whileHover={{ scale: 1.04, rotate: -1 }}
                      src={a.photo}
                      alt={a.title}
                      loading="lazy"
                      className="h-[92px] w-[140px] shrink-0 rounded-xl border border-white/10 object-cover shadow-lg"
                      data-testid={`honor-photo-${i}`}
                    />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
