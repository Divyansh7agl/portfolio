import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Award, ExternalLink, Github, X } from "lucide-react";
import SectionHead from "./SectionHead";
import { PROJECTS, PROFILE } from "../../data/content";
import { PROJECT_IMAGES } from "../../data/projectImages";

function ProjectImage({ p, className = "" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);
  const host = p.links?.live ? new URL(p.links.live).hostname : null;

  return (
    <div ref={ref} className={`scanlines absolute inset-0 overflow-hidden ${className}`} data-testid={`project-image-${p.id}`}>
      <motion.div style={{ y }} className="absolute inset-x-0 -top-[8%] h-[116%]">
        <img
          src={PROJECT_IMAGES[p.id]}
          alt={`${p.name} — thematic visual`}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.05]"
          style={{ filter: "brightness(1.45) contrast(1.06) saturate(1.18)" }}
        />
      </motion.div>
      {/* accent duotone + blends */}
      <div className="pointer-events-none absolute inset-0 mix-blend-overlay" style={{ background: p.accent, opacity: 0.2 }} />
      <div className="pointer-events-none absolute inset-0" style={{ background: `linear-gradient(90deg, rgba(10,15,26,0.85) 0%, ${p.accent}1c 30%, transparent 60%)` }} />
      <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 68%, rgba(5,7,12,0.45))" }} />
      {/* floating status chip */}
      <div className="absolute bottom-4 left-4 z-[3] flex items-center gap-2 rounded-full border border-white/15 bg-black/55 px-3.5 py-1.5 backdrop-blur-md" data-testid={`project-image-chip-${p.id}`}>
        {host ? (
          <>
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-[#28C840]" />
            <span className="font-mono2 text-[10px] tracking-[0.14em] text-white/80">{host}</span>
          </>
        ) : (
          <span className="font-mono2 text-[10px] tracking-[0.2em] text-white/55">IN THE LAB — EXPERIMENTAL</span>
        )}
      </div>
      <span className="absolute right-4 top-4 z-[3] h-3.5 w-3.5 border-r-2 border-t-2" style={{ borderColor: `${p.accent}cc` }} />
      <span className="absolute bottom-4 right-4 z-[3] h-3.5 w-3.5 border-b-2 border-r-2" style={{ borderColor: `${p.accent}cc` }} />
    </div>
  );
}

function StackCard({ p, i, onCase }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["end end", "end 35%"] });
  const dim = useTransform(scrollYProgress, [0, 1], ["brightness(1)", "brightness(0.38)"]);

  return (
    <div ref={ref} className="sticky" style={{ top: `${86 + i * 14}px` }}>
      <motion.article
        style={{ filter: dim }}
        className="group mb-10 overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#0A0F1A] shadow-[0_40px_90px_rgba(0,0,0,0.55)]"
        data-testid={`work-card-${p.id}`}
      >
        <div className="grid lg:grid-cols-[1fr_1.05fr]">
          <div className="flex flex-col p-7 md:p-11">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono2 text-[11px] tracking-[0.3em] text-white/30">{String(i + 1).padStart(2, "0")}</span>
              <span className="rounded-full px-2.5 py-1 font-mono2 text-[9px] tracking-[0.16em]" style={{ background: `${p.accent}14`, color: p.accent, border: `1px solid ${p.accent}38` }}>
                {p.category}
              </span>
              {p.achievement && (
                <span className="flex items-center gap-1.5 rounded-full border border-[#FBBF24]/30 bg-[#FBBF24]/10 px-2.5 py-1 font-mono2 text-[9px] text-[#FBBF24]">
                  <Award size={9} /> {p.achievement}
                </span>
              )}
            </div>

            <h3 className="mt-6 font-display text-4xl font-semibold tracking-[-0.02em] text-white md:text-6xl" data-testid={`work-title-${p.id}`}>
              {p.name}
            </h3>
            <p className="mt-2 font-mono2 text-[11px] tracking-[0.18em]" style={{ color: p.accent }}>
              {p.tagline}
            </p>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/55 md:text-[15px]">{p.desc}</p>

            <div className="mt-6 flex flex-wrap gap-1.5">
              {p.tech.length ? (
                p.tech.map((t) => (
                  <span key={t} className="rounded-md border border-white/[0.09] bg-white/[0.04] px-2 py-1 font-mono2 text-[10px] text-white/55">
                    {t}
                  </span>
                ))
              ) : (
                <span className="font-mono2 text-[10px] text-white/30">frontend exploration build</span>
              )}
            </div>

            <div className="mt-auto flex flex-wrap items-center gap-2.5 pt-8">
              <button
                data-testid={`work-case-${p.id}`}
                onClick={onCase}
                className="flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold text-[#05070C]"
                style={{ background: p.accent }}
              >
                Case study <ArrowUpRight size={13} />
              </button>
              {p.links?.live && (
                <a data-testid={`work-live-${p.id}`} href={p.links.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-xs font-semibold text-white/80 transition hover:border-white/40">
                  <ExternalLink size={12} /> Live
                </a>
              )}
              <a data-testid={`work-github-${p.id}`} href={PROFILE.socials.githubRepos} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-xs font-semibold text-white/80 transition hover:border-white/40">
                <Github size={12} /> GitHub
              </a>
            </div>
          </div>

          <div className="relative min-h-[250px] border-t border-white/[0.06] lg:min-h-[520px] lg:border-l lg:border-t-0">
            <ProjectImage p={p} />
          </div>
        </div>
      </motion.article>
    </div>
  );
}

function CaseOverlay({ p, onClose }) {
  const cs = p.caseStudy;
  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.__lenis?.stop?.();
    return () => {
      document.body.style.overflow = "";
      window.__lenis?.start?.();
    };
  }, []);

  const Sec = ({ t, children }) => (
    <div className="mt-9" data-testid={`case-sec-${t.toLowerCase().replace(/[^a-z]+/g, "-")}`}>
      <p className="font-mono2 text-[10px] tracking-[0.3em]" style={{ color: p.accent }}>
        {t.toUpperCase()}
      </p>
      <div className="mt-3 text-sm leading-relaxed text-white/65 md:text-base">{children}</div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[2000] backdrop-blur-md"
      style={{ background: "rgba(5,7,12,0.96)" }}
      data-testid={`case-overlay-${p.id}`}
    >
      <button
        data-testid="case-close"
        onClick={onClose}
        aria-label="Close case study"
        className="fixed right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/80 backdrop-blur transition hover:border-[var(--cyan)]/60 hover:text-white"
      >
        <X size={17} />
      </button>
      <motion.div
        initial={{ y: 70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
        className="thin-scroll h-full overflow-y-auto"
      >
        <div className="mx-auto max-w-3xl px-5 py-16 md:py-24">
          <p className="font-mono2 text-[11px] tracking-[0.3em]" style={{ color: p.accent }}>
            CASE STUDY — {p.category.toUpperCase()}
          </p>
          <h2 className="mt-4 font-display text-5xl font-semibold tracking-[-0.02em] text-white md:text-7xl">{p.name}</h2>
          <p className="mt-3 text-sm text-white/50">{p.tagline}</p>

          <div className="mt-8 flex flex-wrap gap-2.5">
            {p.links?.live && (
              <a href={p.links.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold text-[#05070C]" style={{ background: p.accent }}>
                <ExternalLink size={13} /> Visit live product
              </a>
            )}
            <a href={PROFILE.socials.githubRepos} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-xs font-semibold text-white/80">
              <Github size={13} /> GitHub
            </a>
          </div>

          <div className="group relative mt-10 h-64 overflow-hidden rounded-3xl border border-white/[0.08] md:h-80">
            <ProjectImage p={p} />
          </div>

          {cs ? (
            <>
              <Sec t="Overview">{cs.overview}</Sec>
              <Sec t="Problem">{cs.problem}</Sec>
              <Sec t="Solution">{cs.solution}</Sec>
              {cs.architecture && (
                <Sec t="Architecture">
                  <ul className="space-y-2">
                    {cs.architecture.map((a) => (
                      <li key={a} className="flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-2.5 font-mono2 text-xs text-white/60">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full" style={{ background: p.accent }} /> {a}
                      </li>
                    ))}
                  </ul>
                </Sec>
              )}
              {cs.implementation && (
                <Sec t="Technical implementation">
                  <ul className="list-disc space-y-1.5 pl-5 text-white/60">
                    {cs.implementation.map((a) => (
                      <li key={a}>{a}</li>
                    ))}
                  </ul>
                </Sec>
              )}
              {cs.challenges && <Sec t="Key challenges">{cs.challenges}</Sec>}
              {cs.learned && <Sec t="What I learned">{cs.learned}</Sec>}
            </>
          ) : (
            <div className="mt-10 rounded-2xl border border-dashed border-white/15 p-6 text-center text-sm text-white/40" data-testid="case-soon">
              A detailed case study for this build is on the way — it was a focused frontend exploration.
            </div>
          )}

          <div className="mt-10 flex flex-wrap gap-1.5 border-t border-white/[0.07] pt-8">
            {p.tech.length ? (
              p.tech.map((t) => (
                <span key={t} className="rounded-md border border-white/[0.09] bg-white/[0.04] px-2.5 py-1 font-mono2 text-[10px] text-white/55">
                  {t}
                </span>
              ))
            ) : (
              <span className="font-mono2 text-[10px] text-white/30">tech details on request</span>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const [open, setOpen] = useState(null);
  const project = PROJECTS.find((p) => p.id === open);

  return (
    <section id="work" className="relative px-5 py-24 md:px-10 md:py-36" data-testid="projects-section">
      <div className="mx-auto max-w-7xl">
        <SectionHead
          index="02"
          eyebrow="SELECTED WORK"
          title={
            <>
              Built things that <span className="text-stroke-cyan">ship.</span>
            </>
          }
          desc="Products with live URLs, real users and hackathon podiums — not tutorial projects. Scroll slowly; each one stacks into the next."
        />
        <div className="relative">
          {PROJECTS.map((p, i) => (
            <StackCard key={p.id} p={p} i={i} onCase={() => setOpen(p.id)} />
          ))}
        </div>
      </div>
      <AnimatePresence>{project && <CaseOverlay p={project} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  );
}
