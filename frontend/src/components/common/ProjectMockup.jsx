import { motion } from "framer-motion";

const LANG_COLORS = {
  JavaScript: "#f1e05a", TypeScript: "#3178c6", Python: "#3572A5", HTML: "#e34c26", CSS: "#563d7c",
  "C++": "#f34b7d", C: "#aaaaaa", Dart: "#00B4AB", Go: "#00ADD8", Java: "#b07219",
};

function Row({ w = "100%", o = 0.12, d = 0 }) {
  return <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: d, duration: 0.6 }} className="h-1.5 rounded-full" style={{ width: w, background: "currentColor", opacity: o, transformOrigin: "left" }} />;
}

export default function ProjectMockup({ variant, accent, className = "" }) {
  const c = accent || "#00F0FF";
  return (
    <div
      className={`relative flex h-full w-full items-center justify-center overflow-hidden ${className}`}
      style={{ background: `linear-gradient(135deg, ${c}14 0%, #0B0F19 60%)` }}
      data-testid={`project-mockup-${variant}`}
    >
      <div className="grid-bg absolute inset-0 opacity-40" />
      <div className="relative z-10 w-[72%]">
        {variant === "cloud" && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-sm bg-[#FF9900]" /><Row w="58%" o={0.35} />
              <span className="ml-auto font-mono2 text-[8px] text-white/40">AWS</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-sm bg-[#0089D6]" /><Row w="74%" o={0.35} />
              <span className="ml-auto font-mono2 text-[8px] text-white/40">AZURE</span>
            </div>
            <div className="flex h-10 items-end gap-1 pt-1">
              {[0.5, 0.8, 0.35, 0.95, 0.6, 0.75, 0.45].map((h, i) => (
                <motion.span key={i} initial={{ height: 2 }} animate={{ height: `${h * 100}%` }} transition={{ delay: 0.2 + i * 0.07, duration: 0.5 }} className="flex-1 rounded-t-sm" style={{ background: `${c}55` }} />
              ))}
            </div>
          </div>
        )}
        {variant === "voice" && (
          <div className="space-y-3">
            <div className="flex h-9 items-center justify-center gap-[3px] rounded-lg border border-white/10 bg-black/30 px-3">
              {[0.3, 0.7, 1, 0.5, 0.9, 0.4, 0.8, 0.35, 0.65, 0.5].map((h, i) => (
                <motion.span key={i} animate={{ scaleY: [h, h * 0.4, h] }} transition={{ repeat: Infinity, duration: 0.9, delay: i * 0.08 }} className="h-5 w-[3px] rounded-full" style={{ background: c }} />
              ))}
            </div>
            <div className="flex flex-col gap-1.5">
              <Row w="70%" o={0.3} d={0.1} />
              <Row w="46%" o={0.2} d={0.2} />
            </div>
          </div>
        )}
        {variant === "optimizer" && (
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border-2" style={{ borderColor: c }}>
              <span className="font-mono2 text-xs font-bold" style={{ color: c }}>92</span>
            </div>
            <div className="flex-1 space-y-2">
              <Row w="80%" o={0.3} /><Row w="60%" o={0.2} /><Row w="70%" o={0.15} />
            </div>
          </div>
        )}
        {variant === "directory" && (
          <div className="space-y-2">
            {["A", "B", "C"].map((_, i) => (
              <div key={i} className="flex items-center gap-2 rounded-md border border-white/[0.07] bg-black/25 px-2.5 py-1.5">
                <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 1.6, delay: i * 0.3 }} className="h-1.5 w-1.5 rounded-full bg-[#34D399]" />
                <Row w={`${62 - i * 12}%`} o={0.28} d={i * 0.1} />
              </div>
            ))}
          </div>
        )}
        {variant === "board" && (
          <div className="grid w-[84px] grid-cols-3 gap-[3px]">
            {Array.from({ length: 9 }).map((_, i) => (
              <motion.span key={i} initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.04 }} className="aspect-square rounded-[3px]" style={{ background: i % 2 ? `${c}22` : "#ffffff08" }} />
            ))}
          </div>
        )}
        {variant === "player" && (
          <div className="space-y-2.5">
            <div className="flex items-center gap-3">
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 7, ease: "linear" }} className="h-9 w-9 rounded-full border-2 border-white/15 border-t-[#4ADE80]" />
              <div className="flex-1 space-y-1.5"><Row w="70%" o={0.3} /><Row w="40%" o={0.16} /></div>
            </div>
            <div className="h-1 rounded-full bg-white/10"><motion.div initial={{ width: "10%" }} animate={{ width: "64%" }} transition={{ duration: 1.2 }} className="h-full rounded-full bg-[#4ADE80]" /></div>
          </div>
        )}
        {variant === "grid" && (
          <div className="grid w-[76px] grid-cols-3 gap-[3px]">
            {Array.from({ length: 9 }).map((_, i) => (
              <motion.span key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 + i * 0.05 }} className="flex aspect-square items-center justify-center rounded-[3px] font-mono2 text-[10px]" style={{ background: `${c}14`, color: c }}>
                {["X", "", "O", "", "X", "", "O", "", ""][i]}
              </motion.span>
            ))}
          </div>
        )}
      </div>
      <span className="absolute bottom-1.5 right-2 z-10 rounded-sm bg-black/40 px-1.5 py-0.5 font-mono2 text-[7px] tracking-[0.2em] text-white/35">
        CONCEPT PREVIEW
      </span>
      <span className="absolute inset-x-0 bottom-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${c}44, transparent)` }} />
    </div>
  );
}

export const languageColor = (name) => LANG_COLORS[name] || "#8B5CF6";
