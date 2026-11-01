import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { ArrowDown, Copy, Check, MapPin } from "lucide-react";
import { toast } from "sonner";
import { LogoMark } from "../common/Logo";
import { PROFILE, HERO_WORDS } from "../../data/content";
import { useReducedMotion } from "../../lib/hooks";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!<>-_#";

function useScramble(words, reduced) {
  const [text, setText] = useState(words[0]);
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (reduced) {
      setText(words[0]);
      return;
    }
    let interval;
    const timeout = setTimeout(() => {
      const next = words[(idx + 1) % words.length];
      let step = 0;
      const total = 18;
      interval = setInterval(() => {
        step += 1;
        const settled = Math.floor((step / total) * next.length);
        let out = next.slice(0, settled);
        for (let i = settled; i < next.length; i++) {
          out += next[i] === " " ? " " : CHARS[Math.floor(Math.random() * CHARS.length)];
        }
        setText(out);
        if (step >= total) {
          clearInterval(interval);
          setText(next);
          setIdx((i) => (i + 1) % words.length);
        }
      }, 42);
    }, 2400);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [idx, words, reduced]);
  return text;
}

const Line = ({ children, ready, delay }) => (
  <span className="block overflow-hidden">
    <motion.span
      initial={{ y: "112%" }}
      animate={ready ? { y: 0 } : { y: "112%" }}
      transition={{ delay, duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
      className="block"
    >
      {children}
    </motion.span>
  </span>
);

export default function Hero({ ready, scrollTo }) {
  const reduced = useReducedMotion();
  const role = useScramble(HERO_WORDS, reduced);
  const [copied, setCopied] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rX = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 70, damping: 16 });
  const rY = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), { stiffness: 70, damping: 16 });
  const { scrollY } = useScroll();
  const photoY = useTransform(scrollY, [0, 600], [0, 70]);
  const fade = useTransform(scrollY, [0, 450], [1, 0]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      toast.success("Email copied to clipboard");
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error(PROFILE.email);
    }
  };

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-5 pb-24 pt-28 md:px-10">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" style={{ maskImage: "radial-gradient(75% 65% at 50% 40%, black, transparent)" }} />
      <div className="aurora aurora-a pointer-events-none absolute -right-40 top-[-160px] h-[560px] w-[560px]" style={{ background: "radial-gradient(circle, rgba(0,240,255,0.13), transparent 65%)" }} />
      <div className="aurora aurora-b pointer-events-none absolute -left-52 bottom-[-220px] h-[620px] w-[620px]" style={{ background: "radial-gradient(circle, rgba(139,92,246,0.12), transparent 65%)" }} />

      <motion.div style={{ opacity: fade }} className="relative mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        {/* left — kinetic type */}
        <div>
          <Line ready={ready} delay={0.1}>
            <p className="flex items-center gap-3 font-mono2 text-[10px] tracking-[0.34em] text-white/50 md:text-[11px]">
              <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-[#28C840] shadow-[0_0_10px_rgba(40,200,64,0.9)]" />
              DIVYANSH.OS — SYSTEM ONLINE
            </p>
          </Line>

          <h1 className="mt-7 font-display font-semibold leading-[0.92] tracking-[-0.03em]" data-testid="hero-name">
            <Line ready={ready} delay={0.22}>
              <span className="text-[clamp(3.4rem,10.5vw,8.6rem)] text-white">DIVYANSH</span>
            </Line>
            <Line ready={ready} delay={0.34}>
              <span className="text-stroke text-[clamp(3.4rem,10.5vw,8.6rem)]">AGARWAL</span>
            </Line>
          </h1>

          <Line ready={ready} delay={0.5}>
            <p className="mt-7 flex items-center gap-3 font-mono2 text-xs tracking-[0.18em] text-[var(--cyan)] md:text-sm" data-testid="hero-role-rotator">
              <span className="text-white/30">&gt;</span> {role}
              <span className="term-caret" style={{ width: 9 }} />
            </p>
          </Line>

          <Line ready={ready} delay={0.6}>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-white/55 md:text-base">
              I build products, experiment with AI, and solve real-world engineering problems — across the stack, from
              intuitive interfaces to backend systems.
            </p>
          </Line>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.75, duration: 0.7 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <button
              data-testid="hero-cta-work"
              onClick={() => scrollTo("#work")}
              className="group flex items-center gap-2.5 rounded-full bg-[var(--cyan)] px-6 py-3 font-display text-sm font-bold text-[#05070C] shadow-[0_0_36px_rgba(0,240,255,0.3)] transition hover:shadow-[0_0_54px_rgba(0,240,255,0.55)]"
            >
              View the work
              <ArrowDown size={15} className="transition group-hover:translate-y-0.5" />
            </button>
            <button
              data-testid="hero-cta-email"
              onClick={copyEmail}
              className="flex items-center gap-2.5 rounded-full border border-white/15 px-6 py-3 font-mono2 text-xs text-white/75 transition hover:border-[var(--cyan)]/60 hover:text-white"
            >
              {copied ? <Check size={14} className="text-[#28C840]" /> : <Copy size={13} />}
              {PROFILE.email}
            </button>
            <span className="ml-1 hidden items-center gap-1.5 font-mono2 text-[10px] tracking-[0.18em] text-white/35 md:flex">
              <MapPin size={10} /> JODHPUR, IN
            </span>
          </motion.div>
        </div>

        {/* right — treated portrait */}
        <motion.div style={{ y: photoY }} className="relative mx-auto w-full max-w-[340px] lg:max-w-none" data-testid="hero-photo-wrap">
          <motion.div
            initial={{ opacity: 0, scale: 0.94, rotate: 2 }}
            animate={ready ? { opacity: 1, scale: 1, rotate: 0 } : {}}
            transition={{ delay: 0.55, duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
            style={{ perspective: 1100 }}
            className="relative"
            onMouseMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              mx.set((e.clientX - r.left) / r.width - 0.5);
              my.set((e.clientY - r.top) / r.height - 0.5);
            }}
            onMouseLeave={() => {
              mx.set(0);
              my.set(0);
            }}
          >
            <div className="absolute -inset-10 -z-10 rounded-full opacity-70 blur-3xl" style={{ background: "radial-gradient(circle, rgba(0,240,255,0.16), rgba(139,92,246,0.1) 55%, transparent 75%)" }} />
            <motion.div
              style={{ rotateX: rX, rotateY: rY, transformStyle: "preserve-3d" }}
              className="scanlines relative overflow-hidden rounded-[30px] border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.6)]"
              data-testid="hero-photo"
            >
              <img
                src={PROFILE.photo}
                alt="Divyansh Agarwal"
                className="aspect-[4/5] w-full object-cover"
                style={{ objectPosition: "center 30%", filter: "contrast(1.07) saturate(1.02)" }}
              />
              <div className="absolute inset-0 z-[1]" style={{ background: "linear-gradient(185deg, rgba(5,7,12,0.05) 45%, rgba(5,7,12,0.82))" }} />
              <span className="absolute left-4 top-4 z-[3] h-4 w-4 border-l-2 border-t-2 border-[var(--cyan)]/70" />
              <span className="absolute right-4 top-4 z-[3] h-4 w-4 border-r-2 border-t-2 border-[var(--cyan)]/70" />
              <span className="absolute bottom-4 left-4 z-[3] h-4 w-4 border-b-2 border-l-2 border-[var(--cyan)]/70" />
              <span className="absolute bottom-4 right-4 z-[3] h-4 w-4 border-b-2 border-r-2 border-[var(--cyan)]/70" />
              <div className="absolute inset-x-4 bottom-4 z-[3] flex items-center justify-between rounded-2xl border border-white/10 bg-black/45 px-4 py-3 backdrop-blur-md">
                <span className="font-mono2 text-[10px] tracking-[0.2em] text-white/80">DIVYANSH_AGARWAL.RAW</span>
                <span className="flex items-center gap-1.5 font-mono2 text-[9px] text-[#8FE8C8]">
                  <span className="pulse-dot h-1 w-1 rounded-full bg-[#28C840]" /> OPEN TO WORK
                </span>
              </div>
            </motion.div>

            {/* rotating badge */}
            <div className="absolute -left-10 -top-10 hidden h-28 w-28 items-center justify-center md:flex" style={{ transform: "translateZ(60px)" }} data-testid="hero-orbit-badge">
              <svg viewBox="0 0 120 120" className="spin-slow absolute inset-0 h-full w-full">
                <defs>
                  <path id="orbit" d="M60,60 m-47,0 a47,47 0 1,1 94,0 a47,47 0 1,1 -94,0" />
                </defs>
                <text className="fill-white/55 font-mono2" style={{ fontSize: "9px", letterSpacing: "2.6px" }}>
                  <textPath href="#orbit">DIVYANSH.OS · FULL STACK · AI · CLOUD ·</textPath>
                </text>
              </svg>
              <LogoMark size={34} glow />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.div initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ delay: 1.4 }} className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2" data-testid="hero-scroll-cue">
        <span className="font-mono2 text-[9px] tracking-[0.4em] text-white/35">SCROLL</span>
        <span className="scroll-cue-line block h-9 w-px bg-gradient-to-b from-[var(--cyan)] to-transparent" />
      </motion.div>
    </section>
  );
}
    