import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LogoMark } from "../common/Logo";

const LOG_LINES = [
  "[ ok ] initializing DIVYANSH.OS kernel v2.4",
  "[ ok ] mounting /apps — 9 packages",
  "[ ok ] linking github.com/Divyansh7agl",
  "[ ok ] loading profile: divyansh",
];

export default function BootScreen({ onDone }) {
  const [lines, setLines] = useState(0);

  useEffect(() => {
    const step = setInterval(() => setLines((l) => (l >= LOG_LINES.length ? l : l + 1)), 380);
    const done = setTimeout(onDone, 2650);
    return () => {
      clearInterval(step);
      clearTimeout(done);
    };
  }, [onDone]);

  return (
    <motion.div
      data-testid="boot-screen"
      className="fixed inset-0 z-[10000] flex cursor-pointer flex-col items-center justify-center bg-ink-0"
      onClick={onDone}
      exit={{ opacity: 0, scale: 1.04, filter: "blur(8px)" }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="grid-bg absolute inset-0 opacity-60" />
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <LogoMark size={64} glow />
      </motion.div>

      <div className="relative mt-6 overflow-hidden text-center">
        {["DIVYANSH", ".OS"].map((part, i) => (
          <motion.span
            key={part}
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ delay: 0.25 + i * 0.16, duration: 0.65, ease: [0.2, 0.9, 0.25, 1] }}
            className="inline-block font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
          >
            {part}
            {i === 1 && <span className="text-[var(--cyan)]">{""}</span>}
          </motion.span>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="relative mt-2 font-mono2 text-[11px] tracking-[0.3em] text-[var(--cyan)]"
      >
        DEVELOPER PORTFOLIO SYSTEM
      </motion.p>

      <div className="relative mt-8 w-[280px] font-mono2 text-[10px] leading-5 text-white/45" data-testid="boot-log">
        {LOG_LINES.slice(0, lines).map((l, i) => (
          <motion.div key={l} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}>
            {l}
          </motion.div>
        ))}
      </div>

      <div className="relative mt-6 h-[3px] w-[280px] overflow-hidden rounded-full bg-white/10">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.3, ease: "easeInOut" }}
          className="h-full rounded-full bg-gradient-to-r from-[var(--cyan)] to-[var(--violet)]"
        />
      </div>

      <p className="relative mt-6 font-mono2 text-[10px] text-white/25">click anywhere to skip</p>
    </motion.div>
  );
}
