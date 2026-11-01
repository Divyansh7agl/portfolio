import { motion } from "framer-motion";
import { Medal, Trophy, Target, GraduationCap } from "lucide-react";
import { ACHIEVEMENTS } from "../../data/content";

const TAG_STYLE = {
  Robotics: "#FF6B6B", Innovation: "#FF9900", Cloud: "#38BDF8", Experience: "#34D399",
  AI: "#A78BFA", Hackathon: "#FBBF24", Sport: "#4ADE80", DSA: "#22D3EE", Academic: "#8B5CF6",
};

export default function AchievementsApp() {
  return (
    <div className="p-5" data-testid="achievements-app">
      <p className="font-mono2 text-[11px] tracking-[0.28em] text-[#FBBF24]">TRACK RECORD</p>
      <h2 className="mt-1.5 font-display text-xl font-bold tracking-tight text-white">Wins, medals & milestones</h2>

      <div className="relative mt-6 pl-5" data-testid="achievement-timeline">
        <span className="absolute left-[7px] top-1 h-[calc(100%-8px)] w-px bg-gradient-to-b from-[var(--cyan)]/50 via-white/10 to-transparent" />
        <div className="space-y-6 pr-1">
          {ACHIEVEMENTS.map((a, i) => {
            const color = TAG_STYLE[a.tag] || "#8B5CF6";
            return (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: Math.min(i * 0.05, 0.3) }}
                className="relative"
                data-testid={`achievement-item-${i}`}
              >
                <span className="absolute -left-5 top-1.5 h-[9px] w-[9px] rounded-full border-2 bg-ink-0" style={{ borderColor: color, boxShadow: `0 0 10px ${color}66` }} />
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display text-[15px] font-bold leading-snug text-white">{a.title}</h3>
                      <span className="rounded-full border px-2 py-0.5 font-mono2 text-[9px]" style={{ borderColor: `${color}55`, background: `${color}14`, color }}>
                        {a.tag}
                      </span>
                    </div>
                    <p className="mt-0.5 font-mono2 text-[10px] tracking-wide text-white/40">
                      {a.year ? `${a.year}${a.org ? " · " + a.org : ""}` : a.org}
                    </p>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-white/60">{a.desc}</p>
                  </div>
                  {a.photo && (
                    <img
                      src={a.photo}
                      alt={a.title}
                      loading="lazy"
                      className="h-[84px] w-[128px] shrink-0 rounded-lg border border-white/10 object-cover"
                      data-testid={`achievement-photo-${i}`}
                    />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[
          { icon: Target, label: "150+ DSA problems practiced" },
          { icon: Medal, label: "Gold medal — Inter-University Kabaddi" },
          { icon: GraduationCap, label: "9.04 SGPA — first semester" },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2.5 rounded-xl border border-white/[0.08] bg-ink-2/70 px-3.5 py-3" data-testid="achievement-stat-pill">
            <Icon size={15} className="shrink-0 text-[var(--cyan)]" />
            <span className="text-xs font-medium text-white/70">{label}</span>
          </div>
        ))}
      </div>
      <p className="mt-4 flex items-center gap-1.5 font-mono2 text-[10px] text-white/30">
        <Trophy size={10} /> Every item on this timeline is real — hackathon photos included.
      </p>
    </div>
  );
}
