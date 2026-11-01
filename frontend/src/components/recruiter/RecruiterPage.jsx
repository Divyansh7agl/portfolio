import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Lenis from "lenis";
import {
  Sun, Moon, Download, Mail, Github, Linkedin, MapPin, ArrowUpRight, Trophy,
  ExternalLink, Sparkles, FolderGit2, Star, Users, FolderDown,
} from "lucide-react";
import { toast } from "sonner";
import { PROFILE, EDUCATION, SKILLS, PROJECTS, ACHIEVEMENTS, RESUME } from "../../data/content";
import { sendContactMessage } from "../../lib/api";
import { useGithubStats } from "../../lib/useStats";
import ProjectMockup from "../common/ProjectMockup";

const NAV = [
  ["Summary", "#summary"],
  ["Skills", "#skills"],
  ["Projects", "#projects"],
  ["Achievements", "#achievements"],
  ["Contact", "#contact"],
];

const MARQUEE = ["FULL-STACK DEVELOPMENT", "AI INTEGRATION", "CLOUD — AWS & AZURE", "REACT · NEXT.JS", "PYTHON · NODE", "PROBLEM SOLVING"];

function Reveal({ children, delay = 0, className = "", as: Tag = "div" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
      className={className}
    >
      {Tag === "div" ? children : children}
    </motion.div>
  );
}

export default function RecruiterPage() {
  const [theme, setTheme] = useState(() => window.localStorage.getItem("dos-recruiter-theme") || "light");
  const lenisRef = useRef(null);
  const reduced = useRef(false);
  const gh = useGithubStats();

  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.matchMedia === "function") {
      try {
        reduced.current = !!window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      } catch {}
    }
  }, []);

  useEffect(() => {
    document.title = "Divyansh Agarwal — Full Stack Developer | Recruiter View";
    window.localStorage.setItem("dos-recruiter-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (reduced.current) return;
    try {
      const lenis = new Lenis({ lerp: 0.1 });
      lenisRef.current = lenis;
      let raf;
      const loop = (t) => {
        lenis.raf(t);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
      return () => {
        cancelAnimationFrame(raf);
        lenis.destroy();
        lenisRef.current = null;
      };
    } catch (e) {
      console.warn("Lenis init failed:", e);
    }
  }, []);

  const scrollTo = (hash) => {
    if (lenisRef.current) lenisRef.current.scrollTo(hash, { offset: -64 });
    else document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
  };

  const r = theme;
  const surface = { background: "var(--r-bg)", color: "var(--r-text)" };
  const featured = PROJECTS.filter((p) => p.links?.live || p.caseStudy);

  return (
    <div className={`${r === "light" ? "recruiter-theme-light" : "recruiter-theme-dark"} min-h-screen font-body transition-colors duration-300`} style={surface} data-testid="recruiter-page" data-theme={r}>
      {/* nav */}
      <header className="sticky top-0 z-50 border-b backdrop-blur-xl" style={{ borderColor: "var(--r-line)", background: "color-mix(in srgb, var(--r-bg) 80%, transparent)" }} data-testid="recruiter-nav">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-6 px-5">
          <span className="font-display text-sm font-extrabold tracking-tight" style={{ color: "var(--r-text)" }}>
            {PROFILE.name}
          </span>
          <nav className="ml-auto hidden items-center gap-5 md:flex">
            {NAV.map(([label, hash]) => (
              <button key={hash} data-testid={`recruiter-nav-${hash.slice(1)}`} onClick={() => scrollTo(hash)} className="text-[13px] font-medium transition hover:opacity-70" style={{ color: "var(--r-muted)" }}>
                {label}
              </button>
            ))}
          </nav>
          <button
            data-testid="recruiter-theme-toggle"
            onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
            aria-label="Toggle light or dark theme"
            className="flex h-9 w-9 items-center justify-center rounded-full border transition hover:scale-105"
            style={{ borderColor: "var(--r-line)", color: "var(--r-text)" }}
          >
            {r === "light" ? <Moon size={14} /> : <Sun size={14} />}
          </button>
          <a data-testid="recruiter-resume-download" href={RESUME.url} download={RESUME.label} className="flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-bold text-white shadow-sm" style={{ background: "var(--r-accent)" }}>
            <Download size={13} /> Resume
          </a>
        </div>
      </header>

      {/* hero */}
      <section className="mx-auto max-w-6xl px-5 pt-14 md:pt-20" data-testid="recruiter-hero">
        <div className="grid items-center gap-10 md:grid-cols-[1.25fr_1fr]">
          <div>
            <p className="font-mono2 text-[11px] tracking-[0.3em]" style={{ color: "var(--r-accent)" }}>
              FULL STACK DEVELOPER · JODHPUR, INDIA
            </p>
            <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl" style={{ color: "var(--r-text)" }}>
              {["Divyansh", "Agarwal"].map((w) => (
                <span key={w} className="block overflow-hidden">
                  <motion.span initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.7, ease: [0.2, 0.9, 0.25, 1] }} className="block">
                    {w}
                  </motion.span>
                </span>
              ))}
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed sm:text-lg" style={{ color: "var(--r-muted)" }}>
              {PROFILE.intro}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a data-testid="recruiter-hero-resume" href={RESUME.url} download={RESUME.label} className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-white shadow-md" style={{ background: "var(--r-accent)" }}>
                <Download size={14} /> Download resume
              </a>
              <a data-testid="recruiter-hero-email" href={`mailto:${PROFILE.email}`} className="flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition hover:scale-[1.02]" style={{ borderColor: "var(--r-line)", color: "var(--r-text)" }}>
                <Mail size={14} /> {PROFILE.email}
              </a>
              <a data-testid="recruiter-hero-github" href={PROFILE.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="flex h-10 w-10 items-center justify-center rounded-full border transition hover:scale-105" style={{ borderColor: "var(--r-line)", color: "var(--r-text)" }}>
                <Github size={15} />
              </a>
              <a data-testid="recruiter-hero-linkedin" href={PROFILE.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex h-10 w-10 items-center justify-center rounded-full border transition hover:scale-105" style={{ borderColor: "var(--r-line)", color: "var(--r-text)" }}>
                <Linkedin size={15} />
              </a>
            </div>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="mx-auto w-full max-w-[300px]">
            <div className="overflow-hidden rounded-3xl border shadow-xl" style={{ borderColor: "var(--r-line)" }} data-testid="recruiter-hero-photo">
              <img src={PROFILE.photo} alt="Divyansh Agarwal" className="aspect-[4/5] w-full object-cover" style={{ objectPosition: "center 30%" }} />
            </div>
            <div className="mt-3 flex items-center justify-between rounded-2xl border px-4 py-2.5" style={{ borderColor: "var(--r-line)", background: "var(--r-card)" }}>
              <span className="flex items-center gap-2 text-xs font-semibold" style={{ color: "var(--r-text)" }}>
                <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-[#28C840]" /> Open to internships · 2026
              </span>
              <span className="flex items-center gap-1 font-mono2 text-[10px]" style={{ color: "var(--r-muted)" }}>
                <MapPin size={10} /> Jodhpur
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* marquee */}
      <div className="mt-14 overflow-hidden border-y py-3" style={{ borderColor: "var(--r-line)", background: "var(--r-bg2)" }} data-testid="recruiter-marquee">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
              {MARQUEE.map((item) => (
                <span key={`${copy}-${item}`} className="flex items-center font-mono2 text-[11px] tracking-[0.25em]" style={{ color: "var(--r-muted)" }}>
                  <span className="px-6">{item}</span>
                  <Sparkles size={9} style={{ color: "var(--r-accent)" }} />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* stats strip */}
      <section className="mx-auto max-w-6xl px-5 pt-12" data-testid="recruiter-stats">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            gh.data ? { icon: FolderGit2, value: gh.data.public_repos, label: "Public GitHub repos" } : null,
            gh.data ? { icon: Star, value: gh.data.total_stars, label: "Stars earned" } : null,
            { icon: Trophy, value: "150+", label: "DSA problems practiced" },
            { icon: Users, value: "9.04", label: "SGPA — first semester" },
          ]
            .filter(Boolean)
            .map(({ icon: Icon, value, label }) => (
              <Reveal key={label}>
                <div className="rounded-2xl border p-4" style={{ borderColor: "var(--r-line)", background: "var(--r-card)" }}>
                  <Icon size={15} style={{ color: "var(--r-accent)" }} />
                  <p className="mt-2 font-display text-2xl font-extrabold tabular-nums" style={{ color: "var(--r-text)" }}>{value}</p>
                  <p className="text-[11px]" style={{ color: "var(--r-muted)" }}>{label}</p>
                </div>
              </Reveal>
            ))}
        </div>
      </section>

      {/* summary + education */}
      <section id="summary" className="mx-auto max-w-6xl scroll-mt-20 px-5 pt-20" data-testid="recruiter-summary">
        <Reveal>
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl" style={{ color: "var(--r-text)" }}>Professional summary</h2>
        </Reveal>
        <div className="mt-6 grid gap-4 md:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <div className="h-full rounded-2xl border p-6" style={{ borderColor: "var(--r-line)", background: "var(--r-card)" }}>
              <p className="text-sm leading-relaxed sm:text-base" style={{ color: "var(--r-muted)" }}>
                {PROFILE.heroSub}
              </p>
              <p className="mt-4 text-sm leading-relaxed sm:text-base" style={{ color: "var(--r-muted)" }}>
                {PROFILE.approach}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-2xl border p-6" style={{ borderColor: "var(--r-line)", background: "var(--r-card)" }} data-testid="recruiter-education">
              <p className="font-mono2 text-[10px] tracking-[0.24em]" style={{ color: "var(--r-accent)" }}>EDUCATION</p>
              <p className="mt-3 font-display text-lg font-bold" style={{ color: "var(--r-text)" }}>{EDUCATION.degree}</p>
              <p className="mt-1 text-sm" style={{ color: "var(--r-muted)" }}>{EDUCATION.school}</p>
              <p className="mt-1 font-mono2 text-[11px]" style={{ color: "var(--r-muted)" }}>{EDUCATION.period}</p>
              <p className="mt-3 inline-block rounded-full px-3 py-1 font-mono2 text-[11px]" style={{ background: "var(--r-chip)", color: "var(--r-accent)" }}>
                {EDUCATION.detail}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* skills */}
      <section id="skills" className="mx-auto max-w-6xl scroll-mt-20 px-5 pt-20" data-testid="recruiter-skills">
        <Reveal>
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl" style={{ color: "var(--r-text)" }}>Technical skills</h2>
        </Reveal>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((s, i) => (
            <Reveal key={s.category} delay={i * 0.05}>
              <div className="h-full rounded-2xl border p-5" style={{ borderColor: "var(--r-line)", background: "var(--r-card)" }}>
                <h3 className="font-display text-sm font-bold" style={{ color: "var(--r-text)" }}>{s.category}</h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {s.items.map((it) => (
                    <span key={it} className="rounded-md px-2 py-1 font-mono2 text-[10px]" style={{ background: "var(--r-chip)", color: "var(--r-accent)" }}>
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* projects */}
      <section id="projects" className="mx-auto max-w-6xl scroll-mt-20 px-5 pt-20" data-testid="recruiter-projects">
        <Reveal>
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl" style={{ color: "var(--r-text)" }}>Featured projects</h2>
        </Reveal>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {featured.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.05}>
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border" style={{ borderColor: "var(--r-line)", background: "var(--r-card)" }} data-testid={`recruiter-project-${p.id}`}>
                <div className="h-[150px]"><ProjectMockup variant={p.mockup} accent={p.accent} /></div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-base font-bold" style={{ color: "var(--r-text)" }}>{p.name}</h3>
                    <span className="ml-auto font-mono2 text-[9px] tracking-[0.14em]" style={{ color: "var(--r-muted)" }}>{p.category}</span>
                  </div>
                  <p className="mt-2 flex-1 text-[13px] leading-relaxed" style={{ color: "var(--r-muted)" }}>{p.desc}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.tech.slice(0, 5).map((t) => (
                      <span key={t} className="rounded border px-1.5 py-0.5 font-mono2 text-[9px]" style={{ borderColor: "var(--r-line)", color: "var(--r-muted)" }}>{t}</span>
                    ))}
                  </div>
                  <div className="mt-4 flex gap-2">
                    <a data-testid={`recruiter-project-github-${p.id}`} href={PROFILE.socials.githubRepos} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[11px] font-semibold transition hover:opacity-80" style={{ borderColor: "var(--r-line)", color: "var(--r-text)" }}>
                      <Github size={12} /> GitHub
                    </a>
                    {p.links?.live && (
                      <a data-testid={`recruiter-project-live-${p.id}`} href={p.links.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-bold text-white" style={{ background: "var(--r-accent)" }}>
                        <ExternalLink size={12} /> Live demo
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-4 flex flex-wrap items-center gap-2 rounded-2xl border p-4" style={{ borderColor: "var(--r-line)", background: "var(--r-card)" }} data-testid="recruiter-more-builds">
            <span className="font-mono2 text-[10px] tracking-[0.2em]" style={{ color: "var(--r-muted)" }}>MORE BUILDS:</span>
            {PROJECTS.filter((p) => !featured.includes(p)).map((p) => (
              <span key={p.id} className="rounded-full border px-3 py-1 text-[11px] font-semibold" style={{ borderColor: "var(--r-line)", color: "var(--r-text)" }}>
                {p.name}
              </span>
            ))}
            <a href={PROFILE.socials.githubRepos} target="_blank" rel="noopener noreferrer" className="ml-auto flex items-center gap-1 text-[11px] font-semibold" style={{ color: "var(--r-accent)" }}>
              view all on GitHub <ArrowUpRight size={11} />
            </a>
          </div>
        </Reveal>
      </section>

      {/* achievements */}
      <section id="achievements" className="mx-auto max-w-6xl scroll-mt-20 px-5 pt-20" data-testid="recruiter-achievements">
        <Reveal>
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl" style={{ color: "var(--r-text)" }}>Achievements</h2>
        </Reveal>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {ACHIEVEMENTS.map((a, i) => (
            <Reveal key={a.title} delay={Math.min(i * 0.04, 0.2)}>
              <div className="flex h-full items-start gap-4 rounded-2xl border p-4" style={{ borderColor: "var(--r-line)", background: "var(--r-card)" }} data-testid={`recruiter-achievement-${i}`}>
                {a.photo && <img src={a.photo} alt="" loading="lazy" className="h-16 w-24 shrink-0 rounded-lg object-cover" />}
                <div className="min-w-0">
                  <p className="font-mono2 text-[10px]" style={{ color: "var(--r-accent)" }}>
                    {a.year || a.tag}
                    {a.org ? ` · ${a.org}` : ""}
                  </p>
                  <h3 className="mt-0.5 text-sm font-bold leading-snug" style={{ color: "var(--r-text)" }}>{a.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed" style={{ color: "var(--r-muted)" }}>{a.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* resume band */}
      <section className="mx-auto max-w-6xl px-5 pt-20" data-testid="recruiter-resume-band">
        <Reveal>
          <div className="flex flex-col items-center gap-4 rounded-3xl border p-8 text-center sm:p-10" style={{ borderColor: "var(--r-line)", background: "var(--r-card)" }}>
            <p className="font-mono2 text-[10px] tracking-[0.28em]" style={{ color: "var(--r-accent)" }}>ONE PAGE · EVERYTHING THAT MATTERS</p>
            <h2 className="max-w-lg font-display text-2xl font-bold tracking-tight" style={{ color: "var(--r-text)" }}>
              Short on time? The resume has the whole story.
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              <a data-testid="recruiter-resume-band-download" href={RESUME.url} download={RESUME.label} className="flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white shadow-md" style={{ background: "var(--r-accent)" }}>
                <Download size={14} /> Download PDF
              </a>
              <a data-testid="recruiter-resume-band-open" href={RESUME.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold" style={{ borderColor: "var(--r-line)", color: "var(--r-text)" }}>
                Open in new tab
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* contact */}
      <section id="contact" className="mx-auto max-w-6xl scroll-mt-20 px-5 pt-20" data-testid="recruiter-contact">
        <Reveal>
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl" style={{ color: "var(--r-text)" }}>Contact</h2>
        </Reveal>
        <div className="mt-6 grid gap-6 pb-20 md:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <div className="space-y-3">
              <a href={`mailto:${PROFILE.email}`} data-testid="recruiter-contact-email" className="flex items-center gap-3 rounded-2xl border p-4 transition hover:scale-[1.01]" style={{ borderColor: "var(--r-line)", background: "var(--r-card)" }}>
                <Mail size={16} style={{ color: "var(--r-accent)" }} />
                <span className="text-sm font-semibold" style={{ color: "var(--r-text)" }}>{PROFILE.email}</span>
              </a>
              <a href={PROFILE.socials.github} target="_blank" rel="noopener noreferrer" data-testid="recruiter-contact-github" className="flex items-center gap-3 rounded-2xl border p-4" style={{ borderColor: "var(--r-line)", background: "var(--r-card)" }}>
                <Github size={16} style={{ color: "var(--r-accent)" }} />
                <span className="text-sm font-semibold" style={{ color: "var(--r-text)" }}>github.com/Divyansh7agl</span>
              </a>
              <a href={PROFILE.socials.linkedin} target="_blank" rel="noopener noreferrer" data-testid="recruiter-contact-linkedin" className="flex items-center gap-3 rounded-2xl border p-4" style={{ borderColor: "var(--r-line)", background: "var(--r-card)" }}>
                <Linkedin size={16} style={{ color: "var(--r-accent)" }} />
                <span className="text-sm font-semibold" style={{ color: "var(--r-text)" }}>LinkedIn / divyansh-agarwal</span>
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <RecruiterContactForm />
          </Reveal>
        </div>
      </section>

      <footer className="border-t py-8 text-center" style={{ borderColor: "var(--r-line)" }} data-testid="recruiter-footer">
        <p className="font-mono2 text-[11px]" style={{ color: "var(--r-muted)" }}>
          © 2026 {PROFILE.name} · Built as DIVYANSH.OS with React, FastAPI & MongoDB
        </p>
      </footer>
    </div>
  );
}

function RecruiterContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);

  const onSubmit = async (ev) => {
    ev.preventDefault();
    const e = {};
    if (form.name.trim().length < 2) e.name = "Please enter your name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (form.subject.trim().length < 2) e.subject = "Add a short subject";
    if (form.message.trim().length < 10) e.message = "Message needs at least 10 characters";
    setErrors(e);
    if (Object.keys(e).length) return;
    setSending(true);
    try {
      await sendContactMessage(form);
      toast.success("Message delivered — Divyansh will get back to you soon.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      toast.error(err.message || "Something went wrong. Please email directly.");
    } finally {
      setSending(false);
    }
  };

  const inputStyle = { borderColor: "var(--r-line)", background: "var(--r-card)", color: "var(--r-text)" };

  return (
    <form onSubmit={onSubmit} className="space-y-3 rounded-2xl border p-5" style={{ borderColor: "var(--r-line)", background: "var(--r-card)" }} data-testid="recruiter-contact-form" noValidate>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block font-mono2 text-[10px] tracking-[0.16em]" style={{ color: "var(--r-muted)" }}>NAME</span>
          <input data-testid="recruiter-contact-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2" style={inputStyle} />
          {errors.name && <span className="mt-1 block text-[11px] text-[#E11D48]" data-testid="recruiter-contact-error-name">{errors.name}</span>}
        </label>
        <label className="block">
          <span className="mb-1 block font-mono2 text-[10px] tracking-[0.16em]" style={{ color: "var(--r-muted)" }}>EMAIL</span>
          <input data-testid="recruiter-contact-email-input" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2" style={inputStyle} />
          {errors.email && <span className="mt-1 block text-[11px] text-[#E11D48]" data-testid="recruiter-contact-error-email">{errors.email}</span>}
        </label>
      </div>
      <label className="block">
        <span className="mb-1 block font-mono2 text-[10px] tracking-[0.16em]" style={{ color: "var(--r-muted)" }}>SUBJECT</span>
        <input data-testid="recruiter-contact-subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2" style={inputStyle} />
        {errors.subject && <span className="mt-1 block text-[11px] text-[#E11D48]" data-testid="recruiter-contact-error-subject">{errors.subject}</span>}
      </label>
      <label className="block">
        <span className="mb-1 block font-mono2 text-[10px] tracking-[0.16em]" style={{ color: "var(--r-muted)" }}>MESSAGE</span>
        <textarea data-testid="recruiter-contact-message" rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full resize-none rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2" style={inputStyle} />
        {errors.message && <span className="mt-1 block text-[11px] text-[#E11D48]" data-testid="recruiter-contact-error-message">{errors.message}</span>}
      </label>
      <button data-testid="recruiter-contact-submit" type="submit" disabled={sending} className="flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-bold text-white disabled:opacity-60" style={{ background: "var(--r-accent)" }}>
        {sending ? "Sending…" : "Send message"}
      </button>
      <p className="font-mono2 text-[10px]" style={{ color: "var(--r-muted)" }}>
        Delivered straight to Divyansh's inbox — real email, no simulation.
      </p>
    </form>
  );
}
