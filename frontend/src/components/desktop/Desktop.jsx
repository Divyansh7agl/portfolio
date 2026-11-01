import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useNavigate } from "react-router-dom";
import TopBar from "./TopBar";
import Dock from "./Dock";
import BootScreen from "./BootScreen";
import WindowFrame from "./WindowFrame";
import WelcomeWindow from "./WelcomeWindow";
import { APPS, DESKTOP_ORDER } from "../apps/registry";
import { PROFILE } from "../../data/content";
import { OSContext, useOS } from "../../lib/osContext";

export { useOS };

function Wallpaper() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 14 });
  const sy = useSpring(my, { stiffness: 40, damping: 14 });
  const ref = useRef(null);

  return (
    <div
      ref={ref}
      className="absolute inset-0 overflow-hidden"
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        mx.set(((e.clientX - r.width / 2) / r.width) * 20);
        my.set(((e.clientY - r.height / 2) / r.height) * 14);
      }}
      data-testid="wallpaper"
    >
      <div className="absolute inset-0" style={{ background: "radial-gradient(120% 90% at 70% 10%, #101521 0%, #080B12 55%)" }} />
      <div className="grid-bg absolute inset-0 opacity-70" style={{ maskImage: "radial-gradient(80% 70% at 50% 40%, black, transparent)" }} />
      <motion.div className="aurora aurora-a h-[480px] w-[480px]" style={{ x: sx, y: sy, top: "-140px", right: "-80px", background: "radial-gradient(circle, rgba(0,240,255,0.14), transparent 65%)" }} />
      <motion.div className="aurora aurora-b h-[520px] w-[520px]" style={{ x: sy, y: sx, bottom: "-180px", left: "-120px", background: "radial-gradient(circle, rgba(139,92,246,0.13), transparent 65%)" }} />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-6 right-6 select-none font-display text-[13vw] font-extrabold leading-none tracking-tighter"
        style={{ WebkitTextStroke: "1px rgba(255,255,255,0.05)", color: "transparent" }}
        data-testid="desktop-watermark"
      >
        DIVYANSH<span style={{ WebkitTextStroke: "1px rgba(0,240,255,0.22)" }}>.OS</span>
      </div>
    </div>
  );
}

function DesktopIcons({ onOpen }) {
  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col items-start justify-start gap-1 p-6 pt-16">
      <div className="pointer-events-auto grid grid-cols-1 gap-1 sm:grid-cols-none sm:grid-flow-col sm:grid-rows-5 sm:gap-2" data-testid="desktop-icons">
        {DESKTOP_ORDER.map((id, i) => {
          const app = APPS[id];
          return (
            <motion.button
              key={id}
              data-testid={`desktop-icon-${id}`}
              aria-label={`Open ${app.title}`}
              onClick={() => onOpen(id)}
              initial={{ opacity: 0, y: 14, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.15 + i * 0.06, duration: 0.4, ease: "easeOut" }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.94 }}
              className="group flex w-[92px] flex-col items-center gap-1.5 rounded-xl p-2.5 transition-colors hover:bg-white/[0.05]"
            >
              <span
                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-ink-2/80 shadow-[0_8px_24px_rgba(0,0,0,0.45)] transition-all duration-200 group-hover:shadow-[0_0_24px_rgba(0,240,255,0.18)]"
                style={{ backdropFilter: "blur(8px)" }}
              >
                <app.icon size={21} style={{ color: app.accent }} />
              </span>
              <span className="text-[11px] font-medium text-white/70 transition group-hover:text-white">{app.title}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

export default function Desktop() {
  const navigate = useNavigate();
  const [booted, setBooted] = useState(false);
  const [windows, setWindows] = useState([]);
  const [welcomed, setWelcomed] = useState(() => window.localStorage.getItem("dos-welcomed-v1") !== "1");
  const zRef = useRef(100);
  const areaRef = useRef(null);

  const focus = useCallback((id) => {
    zRef.current += 1;
    const z = zRef.current;
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, z, state: w.state === "min" ? "normal" : w.state } : w)));
  }, []);

  const openApp = useCallback((id) => {
    const app = APPS[id];
    if (!app) return;
    zRef.current += 1;
    const z = zRef.current;
    setWindows((ws) => {
      if (ws.some((w) => w.id === id)) return ws.map((w) => (w.id === id ? { ...w, z, state: "normal" } : w));
      const n = ws.length;
      const vw = window.innerWidth, vh = window.innerHeight;
      const x = Math.max(20, Math.min((vw - Math.min(app.w, vw - 40)) / 2 + ((n % 5) - 2) * 40, vw - Math.min(app.w, vw - 40) - 20));
      const y = Math.max(54, (vh - Math.min(app.h, vh - 160)) / 2 + ((n % 5) - 2) * 30);
      const pos = { x: Math.round(x), y: Math.round(y) };
      return [...ws, { id, z, state: "normal", pos, prevPos: pos }];
    });
  }, []);

  const closeApp = useCallback((id) => {
    setWindows((ws) => ws.filter((w) => w.id !== id));
    if (id === "welcome") {
      window.localStorage.setItem("dos-welcomed-v1", "1");
      setWelcomed(false);
    }
  }, []);

  const minimizeApp = useCallback((id) => {
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, state: "min" } : w)));
  }, []);

  const toggleMax = useCallback((id) => {
    setWindows((ws) =>
      ws.map((w) => {
        if (w.id !== id) return w;
        if (w.state === "max") return { ...w, state: "normal", pos: w.prevPos || w.pos };
        return { ...w, state: "max", prevPos: w.pos };
      })
    );
  }, []);

  useEffect(() => {
    if (!booted) return;
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      setWindows((ws) => {
        if (!ws.length) return ws;
        const top = ws.reduce((a, b) => (a.z > b.z ? a : b));
        return ws.filter((w) => w.id !== top.id);
      });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [booted]);

  useEffect(() => {
    if (booted && welcomed) openApp("welcome");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [booted]);

  const openIds = windows.map((w) => w.id);
  const focused = windows.length ? windows.reduce((a, b) => (a.z > b.z ? a : b)) : null;
  const activeTitle = focused && focused.id !== "welcome" ? APPS[focused.id]?.title : null;

  const ctx = { openApp, closeApp, minimizeApp, toggleMax, openIds, onRecruiter: () => navigate("/recruiter") };

  return (
    <OSContext.Provider value={ctx}>
      <div ref={areaRef} className="fixed inset-0 select-none overflow-hidden bg-ink-0 noise" data-testid="desktop-root">
        <Wallpaper />

        <AnimatePresence>{!booted && <BootScreen key="boot" onDone={() => setBooted(true)} />}</AnimatePresence>

        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.03 }}
          animate={booted ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <TopBar onRecruiter={ctx.onRecruiter} activeTitle={activeTitle} />
          <DesktopIcons onOpen={openApp} />
          <p className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 text-center lg:flex" data-testid="desktop-hint">
            <span className="font-mono2 text-[11px] tracking-[0.3em] text-white/25">CLICK AN ICON · DRAG WINDOWS · ESC TO CLOSE</span>
          </p>

          <AnimatePresence>
            {windows
              .filter((w) => w.state !== "min")
              .map((w) => (
                <WindowFrame
                  key={w.id}
                  win={w}
                  app={APPS[w.id]}
                  constraintsRef={areaRef}
                  onClose={closeApp}
                  onMinimize={minimizeApp}
                  onToggleMax={toggleMax}
                  onFocus={focus}
                >
                  {w.id === "welcome" ? (
                    <WelcomeWindow onRecruiter={ctx.onRecruiter} />
                  ) : (
                    <AppPane appId={w.id} />
                  )}
                </WindowFrame>
              ))}
          </AnimatePresence>

          <Dock openIds={openIds} onOpen={openApp} />
        </motion.div>

        <span className="sr-only" aria-live="polite">{PROFILE.name} — interactive developer portfolio</span>
      </div>
    </OSContext.Provider>
  );
}

function AppPane({ appId }) {
  const app = APPS[appId];
  const Comp = app.component;
  return (
    <div className="thin-scroll h-full overflow-y-auto overflow-x-hidden bg-[#0B0F19]/95" data-testid={`app-pane-${appId}`}>
      <Comp />
    </div>
  );
}
