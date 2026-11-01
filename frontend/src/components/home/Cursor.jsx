import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 260, damping: 26, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 260, damping: 26, mass: 0.5 });

  useEffect(() => {
    try {
      if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
      if (!window.matchMedia("(pointer: fine)").matches) return;
    } catch {
      return;
    }
    setEnabled(true);
    document.documentElement.classList.add("custom-cursor-on");
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target;
      setHover(!!(t && t.closest && t.closest("a,button,input,textarea,select,[data-hover]")));
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.classList.remove("custom-cursor-on");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div className="pointer-events-none fixed left-0 top-0 z-[9998] mix-blend-difference" style={{ x, y }} data-testid="cursor-dot">
        <div className="h-[9px] w-[9px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
      </motion.div>
      <motion.div className="pointer-events-none fixed left-0 top-0 z-[9998] mix-blend-difference" style={{ x: rx, y: ry }} data-testid="cursor-ring">
        <motion.div
          animate={{ scale: hover ? 1.7 : 1, opacity: hover ? 0.45 : 0.75 }}
          transition={{ duration: 0.25 }}
          className="h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white"
        />
      </motion.div>
    </>
  );
}
