import { motion } from "framer-motion";
import SectionHead from "./SectionHead";
import TerminalApp from "../apps/TerminalApp";

export default function TerminalSection() {
  return (
    <section id="terminal" className="relative px-5 py-24 md:px-10 md:py-36" data-testid="terminal-section">
      <div className="mx-auto max-w-5xl">
        <SectionHead
          index="05"
          eyebrow="INTERACTIVE TERMINAL"
          title={
            <>
              Talk to the <span className="text-stroke-cyan">system.</span>
            </>
          }
          desc="A real shell with real commands — start with help, and yes, the sudo command works."
        />

        <motion.div
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.19, 1, 0.22, 1] }}
          className="overflow-hidden rounded-3xl border border-white/[0.09] shadow-[0_40px_100px_rgba(0,0,0,0.55)]"
          data-testid="terminal-window"
        >
          <div className="flex items-center gap-2 border-b border-white/[0.07] bg-[#0C1119] px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
            <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
            <span className="h-3 w-3 rounded-full bg-[#28C840]" />
            <span className="ml-3 font-mono2 text-[11px] text-white/45">visitor@divyansh-os: ~</span>
            <span className="ml-auto font-mono2 text-[9px] tracking-[0.2em] text-white/25">TRY: sudo hire divyansh</span>
          </div>
          <div className="h-[480px] md:h-[540px]">
            <TerminalApp />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
