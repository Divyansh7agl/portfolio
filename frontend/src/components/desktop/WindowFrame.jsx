import { useEffect } from "react";
import { motion, useDragControls, useMotionValue } from "framer-motion";
import { X, Minus, Square } from "lucide-react";

export default function WindowFrame({ win, app, constraintsRef, onClose, onMinimize, onToggleMax, onFocus, children }) {
  const controls = useDragControls();
  const x = useMotionValue(win.pos.x);
  const y = useMotionValue(win.pos.y);
  const max = win.state === "max";

  useEffect(() => {
    if (max) {
      x.set(0);
      y.set(0);
    } else {
      x.set(win.pos.x);
      y.set(win.pos.y);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [max, win.state]);

  return (
    <motion.div
      className="os-window glass"
      data-testid={`window-${win.id}`}
      data-testid-focus={undefined}
      drag={!max}
      dragControls={controls}
      dragListener={false}
      dragConstraints={constraintsRef}
      dragMomentum={false}
      dragElastic={0}
      initial={{ opacity: 0, scale: 0.9, filter: "blur(6px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.92, y: 140, transition: { duration: 0.22, ease: "easeIn" } }}
      transition={{ duration: 0.28, ease: [0.2, 0.9, 0.25, 1] }}
      style={{ left: 0, top: 42, x, y, zIndex: win.z, width: max ? "100%" : `min(${app.w}px, calc(100vw - 40px))`, height: max ? "calc(100% - 42px)" : `min(${app.h}px, calc(100vh - 140px))` }}
      onPointerDown={() => onFocus(win.id)}
    >
      <div
        className="os-window-titlebar flex h-10 shrink-0 items-center gap-3 border-b border-white/[0.07] bg-white/[0.03] px-3 select-none"
        onPointerDown={(e) => {
          if (!max) controls.start(e);
        }}
        onDoubleClick={() => onToggleMax(win.id)}
        data-testid={`window-titlebar-${win.id}`}
      >
        <div className="flex items-center gap-1.5" data-testid={`window-controls-${win.id}`}>
          <button
            data-testid={`window-close-${win.id}`}
            aria-label={`Close ${app.title}`}
            onClick={(e) => { e.stopPropagation(); onClose(win.id); }}
            className="group flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#FF5F57] transition hover:brightness-125"
          >
            <X size={9} className="opacity-0 transition group-hover:opacity-70 text-black" />
          </button>
          <button
            data-testid={`window-minimize-${win.id}`}
            aria-label={`Minimize ${app.title}`}
            onClick={(e) => { e.stopPropagation(); onMinimize(win.id); }}
            className="group flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#FEBC2E] transition hover:brightness-125"
          >
            <Minus size={9} className="opacity-0 transition group-hover:opacity-70 text-black" />
          </button>
          <button
            data-testid={`window-maximize-${win.id}`}
            aria-label={`Maximize ${app.title}`}
            onClick={(e) => { e.stopPropagation(); onToggleMax(win.id); }}
            className="group flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#28C840] transition hover:brightness-125"
          >
            <Square size={7} className="opacity-0 transition group-hover:opacity-70 text-black" />
          </button>
        </div>
        <div className="flex min-w-0 items-center gap-2">
          <app.icon size={13} style={{ color: app.accent }} />
          <span className="truncate font-mono2 text-[11px] font-medium tracking-wide text-white/80">
            {app.title}
            <span className="text-white/30"> — divyansh@sde</span>
          </span>
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
    </motion.div>
  );
}
