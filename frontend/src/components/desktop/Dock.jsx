import { motion } from "framer-motion";
import { APPS, DOCK_ORDER } from "../apps/registry";

export default function Dock({ openIds, onOpen }) {
  return (
    <motion.nav
      initial={{ y: 90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.55, duration: 0.6, ease: [0.2, 0.9, 0.25, 1] }}
      className="glass fixed bottom-3 left-1/2 z-[9500] flex -translate-x-1/2 items-end gap-1 rounded-2xl px-2.5 py-2"
      style={{ boxShadow: "0 20px 50px rgba(0,0,0,0.55), 0 0 0 1px rgba(0,240,255,0.08)" }}
      data-testid="dock"
      aria-label="Applications dock"
    >
      {DOCK_ORDER.map((id) => {
        const app = APPS[id];
        const open = openIds.includes(id);
        return (
          <motion.div key={id} className="relative flex flex-col items-center">
            <motion.button
              data-testid={`dock-${id}`}
              aria-label={`Open ${app.title}`}
              onClick={() => onOpen(id)}
              whileHover={{ scale: 1.22, y: -10 }}
              whileTap={{ scale: 0.94 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              className="group relative flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.07] bg-ink-2/90 transition-colors hover:border-white/20"
              style={{ boxShadow: `0 4px 18px rgba(0,0,0,0.4)` }}
            >
              <app.icon size={19} style={{ color: app.accent }} />
              {open && (
                <span className="absolute -bottom-[5px] h-1 w-1 rounded-full bg-[var(--cyan)] shadow-[0_0_6px_var(--cyan)]" data-testid={`dock-indicator-${id}`} />
              )}
              <span className="pointer-events-none absolute -top-9 whitespace-nowrap rounded-md border border-white/10 bg-ink-1 px-2 py-1 font-mono2 text-[10px] text-white/85 opacity-0 transition-all duration-200 group-hover:-translate-y-1 group-hover:opacity-100">
                {app.title}
              </span>
            </motion.button>
          </motion.div>
        );
      })}
    </motion.nav>
  );
}
