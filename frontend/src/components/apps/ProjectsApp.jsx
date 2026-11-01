import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, ChevronLeft, Award, ArrowUpRight } from "lucide-react";
import { PROJECTS, PROFILE } from "../../data/content";
import ProjectMockup from "../common/ProjectMockup";

const FILTERS = ["All", "AI", "Full-Stack", "Cloud", "Frontend"];
const match = (p, f) =>
  f === "All" ||
  (f === "AI" && p.category.includes("AI")) ||
  (f === "Full-Stack" && p.category.includes("Full-Stack")) ||
  (f === "Cloud" && p.category.includes("Cloud")) ||
  (f === "Frontend" && p.category === "Frontend");

function Card({ p, onOpen }) {
  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35 }}
      whileHover={{ y: -4 }}
      onClick={() => onOpen(p.id)}
      data-testid={`project-card-${p.id}`}
      className="group overflow-hidden rounded-xl border border-white/[0.08] bg-ink-2/70 text-left transition-colors hover:border-white/20"
    >
      <div className="relative h-[128px]">
        <ProjectMockup variant={p.mockup} accent={p.accent} />
        {p.achievement && (
          <span className="absolute left-2 top-2 z-10 flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 font-mono2 text-[9px] text-[#FBBF24] backdrop-blur">
            <Award size={9} /> {p.achievement}
          </span>
        )}
      </div>
      <div className="p-3.5">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-display text-sm font-bold text-white">{p.name}</h3>
          <span className="font-mono2 text-[9px] tracking-[0.16em] text-white/35">{p.category}</span>
        </div>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/50">{p.desc}</p>
        <div className="mt-2.5 flex flex-wrap gap-1">
          {p.tech.slice(0, 4).map((t) => (
            <span key={t} className="rounded-md border border-white/[0.08] bg-white/[0.04] px-1.5 py-0.5 font-mono2 text-[9px] text-white/55">
              {t}
            </span>
          ))}
        </div>
        <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold" style={{ color: p.accent }}>
          Open case study <ArrowUpRight size={11} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </motion.button>
  );
}

function Detail({ p, onBack }) {
  const cs = p.caseStudy;
  const Section = ({ title, children }) => (
    <div className="mt-5" data-testid={`case-section-${title.toLowerCase().replace(/[^a-z]+/g, "-")}`}>
      <h4 className="font-mono2 text-[10px] tracking-[0.24em] text-[var(--cyan)]">{title.toUpperCase()}</h4>
      <div className="mt-2 text-sm leading-relaxed text-white/65">{children}</div>
    </div>
  );
  return (
    <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} className="p-5" data-testid="project-detail">
      <button onClick={onBack} data-testid="project-back-button" className="mb-4 flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1 text-[11px] text-white/60 transition hover:border-white/30 hover:text-white">
        <ChevronLeft size={12} /> All projects
      </button>
      <div className="overflow-hidden rounded-xl border border-white/[0.08]">
        <div className="h-[150px]"><ProjectMockup variant={p.mockup} accent={p.accent} /></div>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <h2 className="font-display text-xl font-bold tracking-tight text-white">{p.name}</h2>
        <span className="rounded-full px-2 py-0.5 font-mono2 text-[9px] tracking-[0.14em]" style={{ background: `${p.accent}18`, color: p.accent, border: `1px solid ${p.accent}40` }}>
          {p.category}
        </span>
        {p.achievement && <span className="flex items-center gap-1 font-mono2 text-[10px] text-[#FBBF24]"><Award size={10} /> {p.achievement}</span>}
      </div>
      <div className="mt-3 flex flex-wrap gap-2" data-testid="project-links">
        <a data-testid={`project-github-${p.id}`} href={PROFILE.socials.githubRepos} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 rounded-lg border border-white/12 px-3 py-1.5 text-xs font-medium text-white/75 transition hover:border-white/30 hover:text-white">
          <Github size={12} /> GitHub
        </a>
        {p.links?.live && (
          <a data-testid={`project-live-${p.id}`} href={p.links.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold text-ink-0" style={{ background: p.accent }}>
            <ExternalLink size={12} /> Live demo
          </a>
        )}
      </div>
      {cs ? (
        <>
          <Section title="Overview">{cs.overview}</Section>
          <Section title="Problem">{cs.problem}</Section>
          <Section title="Solution">{cs.solution}</Section>
          {cs.architecture && (
            <Section title="Architecture">
              <ul className="space-y-1.5">
                {cs.architecture.map((a) => (
                  <li key={a} className="flex items-start gap-2 font-mono2 text-xs text-white/60">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full" style={{ background: p.accent }} /> {a}
                  </li>
                ))}
              </ul>
            </Section>
          )}
          {cs.implementation && (
            <Section title="Technical implementation">
              <ul className="list-disc space-y-1 pl-4 text-xs text-white/60">
                {cs.implementation.map((a) => <li key={a}>{a}</li>)}
              </ul>
            </Section>
          )}
          {cs.challenges && <Section title="Key challenges">{cs.challenges}</Section>}
          {cs.learned && <Section title="What I learned">{cs.learned}</Section>}
        </>
      ) : (
        <div className="mt-5 rounded-xl border border-dashed border-white/15 p-4 text-center text-xs text-white/40" data-testid="case-study-placeholder">
          Detailed case study coming soon — this was a focused frontend build. Check the links above for more.
        </div>
      )}
      <div className="mt-6 flex flex-wrap gap-1.5">
        {p.tech.length ? p.tech.map((t) => (
          <span key={t} className="rounded-md border border-white/[0.08] bg-white/[0.04] px-2 py-0.5 font-mono2 text-[10px] text-white/55">{t}</span>
        )) : <span className="font-mono2 text-[10px] text-white/30">tech details on request</span>}
      </div>
    </motion.div>
  );
}

export default function ProjectsApp() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const list = PROJECTS.filter((p) => match(p, filter));
  const project = PROJECTS.find((p) => p.id === selected);

  if (project) return <Detail p={project} onBack={() => setSelected(null)} />;

  return (
    <div className="p-5" data-testid="projects-app">
      <div className="flex flex-wrap items-center gap-1.5" data-testid="project-filters">
        {FILTERS.map((f) => (
          <button
            key={f}
            data-testid={`project-filter-${f.toLowerCase()}`}
            onClick={() => setFilter(f)}
            className={`rounded-full px-3 py-1 text-[11px] font-semibold transition ${
              filter === f ? "bg-[var(--cyan)] text-ink-0" : "border border-white/10 text-white/50 hover:text-white"
            }`}
          >
            {f}
          </button>
        ))}
        <span className="ml-auto font-mono2 text-[10px] text-white/30">{list.length} projects</span>
      </div>
      <motion.div layout className="mt-4 grid grid-cols-1 gap-3.5 pr-1 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((p) => <Card key={p.id} p={p} onOpen={setSelected} />)}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
