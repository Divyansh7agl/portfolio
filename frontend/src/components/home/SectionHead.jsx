import { motion } from "framer-motion";

export default function SectionHead({ index, eyebrow, title, desc, accent = "var(--cyan)" }) {
  return (
    <div className="mb-12 md:mb-16">
      <motion.p
        initial={{ opacity: 0, x: -18 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5 }}
        className="font-mono2 text-[11px] tracking-[0.32em]"
        style={{ color: accent }}
        data-testid={`section-eyebrow-${index}`}
      >
        {index} — {eyebrow}
      </motion.p>
      <div className="mt-4 overflow-hidden">
        <motion.h2
          initial={{ y: "112%" }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75, ease: [0.19, 1, 0.22, 1] }}
          className="font-display text-[clamp(2.3rem,5.5vw,4.3rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-white"
        >
          {title}
        </motion.h2>
      </div>
      {desc && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.15, duration: 0.55 }}
          className="mt-5 max-w-xl text-sm leading-relaxed text-white/50 md:text-base"
        >
          {desc}
        </motion.p>
      )}
    </div>
  );
}
