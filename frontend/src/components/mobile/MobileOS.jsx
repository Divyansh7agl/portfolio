import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  X, User, FolderGit2, Activity, Cpu, Trophy, FlaskConical, SquareTerminal,
  FileText, Mail, Briefcase, Github, Linkedin, Download, Home, MapPin, ChevronRight,
} from "lucide-react";
import { APPS } from "../apps/registry";
import { OSContext } from "../desktop/Desktop";
import { LogoMark, Wordmark } from "../common/Logo";
import { useClock, useLocalStorage } from "../../lib/hooks";
import { useGithubStats } from "../../lib/useStats";
import { PROFILE, RESUME } from "../../data/content";

const MOBILE_APPS = ["about", "projects", "command", "skills", "achievements", "lab", "terminal", "resume", "contact"];

export default function MobileOS() {
  const navigate = useNavigate();
  const now = useClock();
  const [sheet, setSheet] = useState(null);
  const [welcomed, setWelcomed] = useLocalStorage("dos-welcomed-v1", false);
  const gh = useGithubStats();
  const prevRef = useRef(null);

  const openApp = (id) => {
    prevRef.current = sheet;
    setSheet(id);
  };
  const closeApp = () => setSheet(null);
  const ctx = { openApp, closeApp, openIds: [], onRecruiter: () => navigate("/recruiter"), minimizeApp: closeApp, toggleMax: () => {} };

  useEffect(() => {
    if (!welcomed) {
      setWelcomed(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const app = sheet ? APPS[sheet] : null;

  return (
    <OSContext.Provider value={ctx}>
      <div className="min-h-screen bg-ink-0 pb-20 noise" data-testid="mobile-os">
        {/* header */}
        <header className="glass sticky top-0 z-40 flex h-12 items-center justify-between px-4" data-testid="mobile-header">
          <div className="flex items-center gap-2">
            <LogoMark size={18} glow />
            <Wordmark size={13} />
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono2 text-[10px] text-white/50 tabular-nums" data-testid="mobile-clock">
              {now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
            </span>
            <button
              data-testid="mobile-recruiter-button"
              onClick={() => navigate("/recruiter")}
              className="flex items-center gap-1.5 rounded-full bg-[var(--cyan)] px-3 py-1.5 font-display text-[10px] font-bold text-ink-0"
            >
              <Briefcase size={11} /> RECRUITER MODE
            </button>
          </div>
        </header>

        {/* hero */}
        <section className="px-4 pt-5" data-testid="mobile-hero">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="overflow-hidden rounded-2xl border border-white/[0.08] bg-ink-2/70">
            <div className="flex gap-4 p-4">
              <img
                src={PROFILE.photo}
                alt="Divyansh Agarwal"
                className="h-24 w-20 shrink-0 rounded-xl border border-white/10 object-cover"
                style={{ objectPosition: "center 30%" }}
                data-testid="mobile-hero-photo"
              />
              <div className="min-w-0">
                <p className="font-mono2 text-[9px] tracking-[0.24em] text-[var(--cyan)]">FULL STACK · AI · CLOUD</p>
                <h1 className="mt-1 font-display text-xl font-extrabold tracking-tight text-white">{PROFILE.name}</h1>
                <p className="mt-0.5 flex items-center gap-1 font-mono2 text-[10px] text-white/45">
                  <MapPin size={9} /> {PROFILE.location}
                </p>
                <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-[#28C840]/30 bg-[#28C840]/10 px-2 py-0.5 font-mono2 text-[9px] text-[#8FE8C8]">
                  <span className="pulse-dot h-1 w-1 rounded-full bg-[#28C840]" /> OPEN TO INTERNSHIPS
                </span>
              </div>
            </div>
            <div className="flex gap-2 border-t border-white/[0.06] p-3">
              <a data-testid="mobile-resume-download" href={RESUME.url} download={RESUME.label} className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[var(--cyan)] py-2 text-[11px] font-bold text-ink-0">
                <Download size={12} /> Resume
              </a>
              <a data-testid="mobile-email" href={`mailto:${PROFILE.email}`} className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-white/12 py-2 text-[11px] font-medium text-white/75">
                <Mail size={12} /> Email
              </a>
              <a data-testid="mobile-github" href={PROFILE.socials.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center rounded-lg border border-white/12 px-3 text-white/75">
                <Github size={14} />
              </a>
              <a data-testid="mobile-linkedin" href={PROFILE.socials.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center rounded-lg border border-white/12 px-3 text-white/75">
                <Linkedin size={14} />
              </a>
            </div>
          </motion.div>
        </section>

        {/* live stats */}
        <section className="px-4 pt-4" data-testid="mobile-stats">
          {gh.data && (
            <div className="flex gap-2">
              {[["Repos", gh.data.public_repos], ["Stars", gh.data.total_stars], ["Followers", gh.data.followers]].map(([label, v]) => (
                <div key={label} className="flex-1 rounded-xl border border-white/[0.08] bg-ink-2/70 p-3 text-center">
                  <p className="font-display text-lg font-extrabold text-white tabular-nums">{v}</p>
                  <p className="font-mono2 text-[9px] tracking-[0.14em] text-white/40">{label.toUpperCase()}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* app grid */}
        <section className="px-4 pt-5">
          <p className="font-mono2 text-[10px] tracking-[0.24em] text-white/35">APPS — TAP TO OPEN</p>
          <div className="mt-3 grid grid-cols-2 gap-2.5" data-testid="mobile-app-grid">
            {MOBILE_APPS.map((id, i) => {
              const a = APPS[id];
              return (
                <motion.button
                  key={id}
                  data-testid={`mobile-app-${id}`}
                  onClick={() => openApp(id)}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.04, duration: 0.35 }}
                  whileTap={{ scale: 0.96 }}
                  className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-ink-2/70 p-3 text-left"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.08]" style={{ background: `${a.accent}12` }}>
                    <a.icon size={16} style={{ color: a.accent }} />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-[12px] font-bold text-white">{a.title}</span>
                    <span className="block truncate text-[10px] text-white/40">{a.desc}</span>
                  </span>
                  <ChevronRight size={12} className="ml-auto shrink-0 text-white/25" />
                </motion.button>
              );
            })}
          </div>
        </section>

        <p className="px-4 pt-6 text-center font-mono2 text-[10px] text-white/25">
          On a bigger screen? This portfolio turns into a full desktop OS.
        </p>

        {/* app sheet */}
        <AnimatePresence>
          {app && (
            <motion.div
              key={sheet}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-0 z-50 flex flex-col bg-ink-0"
              data-testid={`mobile-sheet-${sheet}`}
            >
              <div className="glass flex h-12 shrink-0 items-center justify-between px-4">
                <div className="flex items-center gap-2">
                  <app.icon size={15} style={{ color: app.accent }} />
                  <span className="font-display text-[13px] font-bold text-white">{app.title}</span>
                </div>
                <button data-testid={`mobile-sheet-close-${sheet}`} onClick={closeApp} aria-label="Close" className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/70">
                  <X size={15} />
                </button>
              </div>
              <div className="thin-scroll min-h-0 flex-1 overflow-y-auto">
                {app.component && <app.component />}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* bottom nav */}
        <nav className="glass fixed inset-x-0 bottom-0 z-40 flex items-center justify-around border-t border-white/[0.08] py-2" data-testid="mobile-bottom-nav">
          {[
            { id: "home", icon: Home, label: "Home", action: () => { closeApp(); window.scrollTo({ top: 0, behavior: "smooth" }); } },
            { id: "terminal", icon: SquareTerminal, label: "Terminal", action: () => openApp("terminal") },
            { id: "resume", icon: FileText, label: "Resume", action: () => openApp("resume") },
            { id: "contact", icon: Mail, label: "Contact", action: () => openApp("contact") },
            { id: "recruiter", icon: Briefcase, label: "Recruiter", action: () => navigate("/recruiter") },
          ].map(({ id, icon: Icon, label, action }) => (
            <button key={id} data-testid={`mobile-nav-${id}`} onClick={action} className="flex flex-col items-center gap-0.5 px-3 py-1 text-white/55 transition hover:text-white">
              <Icon size={17} />
              <span className="text-[9px] font-medium">{label}</span>
            </button>
          ))}
        </nav>
      </div>
    </OSContext.Provider>
  );
}
