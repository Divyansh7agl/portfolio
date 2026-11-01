import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { LogoMark } from "../common/Logo";

const LINES = [
  "initializing kernel v3",
  "loading modules: react · fastapi · mongo",
  "linking github.com/Divyansh7agl",
  "profile found: divyansh agarwal",
  "system ready",
];

export default function Preloader({ onDone }) {
  const [n, setN] = useState(0);
  const doneRef = useRef(false);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    const start = performance.now();
    const D = 1200;
    let raf;

    const finish = () => {
      if (!doneRef.current) {
        doneRef.current = true;
        setN(100);
        setTimeout(() => {
          onDoneRef.current?.();
        }, 200);
      }
    };

    const tick = (t) => {
      const p = Math.min((t - start) / D, 1);
      setN(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        finish();
      }
    };

    raf = requestAnimationFrame(tick);

    // Safety fallback timeout to prevent hanging under any circumstances
    const fallbackTimer = setTimeout(finish, 2000);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(fallbackTimer);
    };
  }, []);

  const handleSkip = () => {
    if (!doneRef.current) {
      doneRef.current = true;
      setN(100);
      onDoneRef.current?.();
    }
  };

  return (
    <motion.div
      data-testid="preloader"
      className="fixed inset-0 z-[10000] flex cursor-pointer flex-col justify-between overflow-hidden bg-[#05070C] p-6 md:p-10 select-none"
      exit={{ y: "-100%" }}
      transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
      onClick={handleSkip}
    >
      <div className="grid-bg absolute inset-0 opacity-40 pointer-events-none" />
      <div
        className="absolute left-0 top-0 h-[2px] bg-[var(--cyan)] shadow-[0_0_16px_rgba(0,240,255,0.8)] transition-all duration-75"
        style={{ width: `${n}%` }}
      />

      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-3">
          <LogoMark size={26} glow />
          <span className="font-display text-sm font-semibold tracking-wide text-white">
            DIVYANSH<span className="text-[var(--cyan)]">.OS</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono2 text-[10px] tracking-[0.3em] text-white/40">PORTFOLIO SYSTEM v3</span>
          <span className="hidden sm:inline-block font-mono2 text-[9px] tracking-wider text-white/30 border border-white/10 rounded px-2 py-0.5">
            click to skip
          </span>
        </div>
      </div>

      <div className="relative flex items-end justify-between gap-6">
        <div className="hidden font-mono2 text-[10px] leading-5 text-white/35 sm:block" data-testid="preloader-log">
          {LINES.slice(0, Math.min(LINES.length, Math.ceil(n / 20))).map((l) => (
            <motion.div key={l} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <span className="text-[#28C840]">[ ok ]</span> {l}
            </motion.div>
          ))}
        </div>
        <span
          className="font-display text-[22vw] font-semibold leading-[0.85] text-white sm:text-[9rem] md:text-[11rem]"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          {n}
          <span className="text-[var(--cyan)]">%</span>
        </span>
      </div>
    </motion.div>
  );
}
