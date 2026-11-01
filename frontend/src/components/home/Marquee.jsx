import { Sparkles } from "lucide-react";

export default function Marquee({ items = [] }) {
  if (!items || !items.length) return null;

  return (
    <div
      className="relative overflow-hidden border-y border-white/[0.08] bg-[#070A12]/80 py-4 backdrop-blur-md"
      data-testid="home-marquee"
    >
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
            {items.map((item) => (
              <span
                key={`${copy}-${item}`}
                className="flex items-center font-mono2 text-xs tracking-[0.28em] text-white/50"
              >
                <span className="px-8">{item}</span>
                <Sparkles size={11} className="text-[var(--cyan)] opacity-75" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
