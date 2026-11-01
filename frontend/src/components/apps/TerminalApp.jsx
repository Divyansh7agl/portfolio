import { useState } from "react";
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useOS } from "../../lib/osContext";
import { PROFILE, SKILLS, PROJECTS, ACHIEVEMENTS, EDUCATION, RESUME } from "../../data/content";

const HELP = [
  ["help", "show this list"],
  ["whoami", "who's asking"],
  ["about", "short introduction"],
  ["skills", "the stack"],
  ["projects", "things I've built"],
  ["achievements", "wins & milestones"],
  ["education", "where I study"],
  ["resume", "grab my resume"],
  ["contact", "reach me"],
  ["github", "my code"],
  ["date", "current date & time"],
  ["clear", "wipe the screen"],
  ["sudo hire divyansh", "the good stuff"],
];

export default function TerminalApp() {
  const os = useOS();
  const openApp = os?.openApp || ((id) => document.getElementById(id)?.scrollIntoView?.({ behavior: "smooth" }));
  const [lines, setLines] = useState(() => [
    { id: "init-0", kind: "ok", text: "DIVYANSH.OS terminal v2.4 — type `help` to get started." },
  ]);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState([]);
  const [hIdx, setHIdx] = useState(-1);
  const [burst, setBurst] = useState(false);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const push = (...items) => setLines((ls) => [...ls, ...items.map((it, i) => ({ ...it, id: `${Date.now()}-${ls.length}-${i}` }))]);

  const run = (raw) => {
    const cmd = raw.trim();
    if (!cmd) return;
    push({ kind: "cmd", text: cmd });
    setHistory((h) => [cmd, ...h].slice(0, 40));
    setHIdx(-1);

    if (cmd === "sudo hire divyansh") {
      setTimeout(() => push({ kind: "info", text: "[sudo] password for recruiter: ••••••••••" }), 450);
      setTimeout(() => push({ kind: "ok", text: "Access granted. Let's build something great together." }), 1350);
      setTimeout(() => {
        push({
          kind: "node",
          node: (
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <button
                data-testid="terminal-hire-contact-button"
                onClick={() => openApp("contact")}
                className="rounded-md bg-[var(--cyan)] px-3 py-1.5 font-display text-[11px] font-bold text-ink-0"
              >
                Open contact app →
              </button>
              <a href={`mailto:${PROFILE.email}`} className="font-mono2 text-[11px] text-[#8FE8C8] underline-offset-2 hover:underline">
                {PROFILE.email}
              </a>
            </div>
          ),
        });
        setBurst(true);
        setTimeout(() => setBurst(false), 1600);
      }, 1500);
      return;
    }

    const c = cmd.toLowerCase().replace(/\s+/g, " ");
    switch (c) {
      case "help":
        push({ kind: "out", text: "Available commands:" });
        push(...HELP.map(([k, d]) => ({ kind: "list", text: `  ${k.padEnd(20, " ")} ${d}` })));
        break;
      case "whoami":
        push({ kind: "out", text: "recruiter@divyansh.os — you're a visitor with excellent taste." });
        push({ kind: "out", text: `${PROFILE.name} — ${PROFILE.roleShort}. Jodhpur, India.` });
        break;
      case "about":
        push({ kind: "out", text: PROFILE.intro });
        break;
      case "skills":
        SKILLS.forEach((s) => push({ kind: "list", text: `  ${s.category.padEnd(11, " ")} ${s.items.join(", ")}` }));
        break;
      case "projects":
        PROJECTS.forEach((p) => push({ kind: "list", text: `  ${p.name.padEnd(16, " ")} ${p.tagline}` }));
        push({ kind: "info", text: "tip: open the Projects app for full case studies" });
        break;
      case "achievements":
        ACHIEVEMENTS.forEach((a) => push({ kind: "list", text: `  ${a.year ? a.year + "  " : ""}${a.title}${a.org ? " — " + a.org : ""}` }));
        break;
      case "education":
        push({ kind: "out", text: `${EDUCATION.degree}, ${EDUCATION.school} (${EDUCATION.period})` });
        push({ kind: "ok", text: EDUCATION.detail });
        break;
      case "resume":
        push({ kind: "out", text: `Latest resume: ${RESUME.label}` });
        push({
          kind: "node",
          node: (
            <button data-testid="terminal-resume-button" onClick={() => openApp("resume")} className="mt-1 rounded-md bg-[var(--cyan)] px-3 py-1.5 font-display text-[11px] font-bold text-ink-0">
              Open resume viewer →
            </button>
          ),
        });
        break;
      case "contact":
        push({ kind: "out", text: `email     ${PROFILE.email}` });
        push({ kind: "out", text: `github    ${PROFILE.socials.github}` });
        push({ kind: "out", text: `linkedin  ${PROFILE.socials.linkedin}` });
        push({
          kind: "node",
          node: (
            <button data-testid="terminal-contact-button" onClick={() => openApp("contact")} className="mt-1 rounded-md bg-[var(--cyan)] px-3 py-1.5 font-display text-[11px] font-bold text-ink-0">
              Open contact app →
            </button>
          ),
        });
        break;
      case "github":
        push({ kind: "out", text: `github.com/Divyansh7agl — ${PROJECTS.length}+ builds, all open` });
        window.open(PROFILE.socials.github, "_blank", "noopener");
        break;
      case "date":
        push({ kind: "out", text: new Date().toString() });
        break;
      case "clear":
        setLines([]);
        break;
      default: {
        const closest = HELP.map(([k]) => k).find((k) => k.startsWith(c[0]) && c[0]);
        push({ kind: "err", text: `command not found: ${cmd}` });
        push({ kind: "info", text: `did you mean \`${closest || "help"}\`? Try \`help\` for the full list.` });
      }
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      run(value);
      setValue("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(hIdx + 1, history.length - 1);
      if (history[next]) { setHIdx(next); setValue(history[next]); }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = hIdx - 1;
      if (next >= 0 && history[next]) { setHIdx(next); setValue(history[next]); }
      else { setHIdx(-1); setValue(""); }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const m = HELP.map(([k]) => k).find((k) => k.startsWith(value.trim().toLowerCase()) && value.trim());
      if (m) setValue(m);
    }
  };

  const suggestions = value.trim()
    ? HELP.map(([k]) => k).filter((k) => k.startsWith(value.trim().toLowerCase()) && k !== value.trim().toLowerCase())
    : [];

  return (
    <div className="relative h-full bg-black" data-testid="terminal-app" onClick={() => inputRef.current?.focus()}>
      {burst && (
        <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden" data-testid="terminal-confetti">
          {Array.from({ length: 26 }).map((_, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 1, x: "50%", y: "55%", scale: 1 }}
              animate={{ opacity: 0, x: `${50 + (Math.random() * 80 - 40)}%`, y: `${20 + Math.random() * 70}%`, scale: 0.4 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute h-1.5 w-1.5 rounded-sm"
              style={{ background: i % 3 === 0 ? "#8B5CF6" : i % 3 === 1 ? "#00F0FF" : "#22E5A1" }}
            />
          ))}
        </div>
      )}
      <div ref={scrollRef} className="thin-scroll h-full overflow-y-auto p-4 font-mono2 text-[12px] leading-6" data-testid="terminal-output">
        <AnimatePresence initial={false}>
          {lines.map((l) => (
            <motion.div
              key={l.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18 }}
              className={`whitespace-pre-wrap ${
                l.kind === "cmd" ? "text-white/90" : l.kind === "ok" ? "text-[#22E5A1]" : l.kind === "err" ? "text-[#FF6B6B]" : l.kind === "info" ? "text-[var(--cyan)]" : l.kind === "list" ? "text-white/55" : "text-[#9BA6B8]"
              }`}
              data-testid={`terminal-line-${l.kind}`}
            >
              {l.kind === "cmd" ? <span><span className="text-[#22E5A1]">visitor@divyansh.os</span><span className="text-white/40">:~$ </span>{l.text}</span> : l.node || l.text}
            </motion.div>
          ))}
        </AnimatePresence>

        <div className="relative mt-1 flex items-center gap-2">
          <span className="shrink-0 text-[#22E5A1]">visitor@divyansh.os</span>
          <span className="shrink-0 text-white/40">:~$</span>
          <div className="relative min-w-0 flex-1">
            <input
              ref={inputRef}
              data-testid="terminal-input"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={onKeyDown}
              spellCheck={false}
              autoCapitalize="off"
              autoComplete="off"
              aria-label="Terminal command input"
              className="w-full bg-transparent text-white/90 caret-transparent outline-none"
            />
            {!value && <span className="term-caret pointer-events-none absolute left-0 top-1" data-testid="terminal-caret" />}
            {suggestions.length > 0 && (
              <div className="absolute bottom-7 left-0 z-10 w-max max-w-[260px] overflow-hidden rounded-lg border border-white/10 bg-[#0C111C] shadow-2xl" data-testid="terminal-suggestions">
                {suggestions.slice(0, 5).map((s) => (
                  <button key={s} onClick={() => setValue(s)} className="block w-full px-3 py-1.5 text-left text-[11px] text-white/60 transition hover:bg-white/[0.06] hover:text-white">
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
