import { motion } from "framer-motion";
import { GraduationCap, Github, Linkedin, Mail } from "lucide-react";
import SectionHead from "./SectionHead";
import { PROFILE, EDUCATION, STATS, ACHIEVEMENTS } from "../../data/content";

function Statement() {
  const words = PROFILE.intro.split(" ");
  return (
    <motion.p
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ staggerChildren: 0.014 }}
      className="font-display text-2xl font-medium leading-snug tracking-tight text-white md:text-[2.6rem] md:leading-[1.22]"
      data-testid="about-statement"
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            variants={{ hidden: { y: "110%" }, show: { y: 0 } }}
            transition={{ duration: 0.55, ease: [0.19, 1, 0.22, 1] }}
            className={`inline-block ${w.includes("AI") || w.includes("software") ? "text-[var(--cyan)]" : ""}`}
          >
            {w}
          </motion.span>
          {i < words.length - 1 && "\u00A0"}
        </span>
      ))}
    </motion.p>
  );
}

export default function AboutSection() {
  const ideathon = ACHIEVEMENTS.find((a) => a.title.includes("Ideathon"));
  return (
    <section id="profile" className="relative px-5 py-24 md:px-10 md:py-36" data-testid="about-section">
      <div className="mx-auto max-w-7xl">
        <SectionHead index="01" eyebrow="PROFILE" title={<>The human behind <span className="text-stroke-cyan">the machine</span>.</>} />

        <div className="grid gap-12 lg:grid-cols-[1.35fr_0.65fr]">
          <div>
            <Statement />
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: 0.2, duration: 0.55 }}
              className="mt-8 max-w-xl border-l-2 border-[var(--violet)]/50 pl-5 text-sm italic leading-relaxed text-white/55 md:text-base"
            >
              {PROFILE.approach}
            </motion.p>

            <div className="mt-12 grid grid-cols-2 gap-3 lg:grid-cols-4" data-testid="about-stats">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: i * 0.07, duration: 0.5 }}
                  whileHover={{ y: -4 }}
                  className="h-full rounded-2xl border border-white/[0.07] bg-[#0A0F19] p-5 transition-colors hover:border-[var(--cyan)]/30"
                >
                  <p className="font-display text-3xl font-semibold tracking-tight text-white md:text-4xl">{s.value}</p>
                  <p className="mt-1.5 text-[11px] leading-snug text-white/45">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55 }}
              className="rounded-2xl border border-white/[0.07] bg-[#0A0F19] p-6"
              data-testid="about-education"
            >
              <div className="flex items-center gap-2.5">
                <GraduationCap size={16} className="text-[var(--cyan)]" />
                <span className="font-mono2 text-[10px] tracking-[0.26em] text-white/45">EDUCATION</span>
              </div>
              <p className="mt-4 font-display text-lg font-semibold text-white">{EDUCATION.degree}</p>
              <p className="mt-1 text-sm text-white/50">{EDUCATION.school}</p>
              <p className="mt-1 font-mono2 text-[11px] text-white/40">{EDUCATION.period}</p>
              <p className="mt-3 inline-block rounded-full border border-[#28C840]/30 bg-[#28C840]/10 px-3 py-1 font-mono2 text-[10px] text-[#8FE8C8]">
                {EDUCATION.detail}
              </p>
            </motion.div>

            {ideathon?.photo && (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55 }}
                className="scanlines relative overflow-hidden rounded-2xl border border-white/[0.07]"
                data-testid="about-photo"
              >
                <img src={ideathon.photo} alt="Divyansh at Prometeo Ideathon, IIT Jodhpur" loading="lazy" className="aspect-[4/3] w-full object-cover" />
                <span className="absolute bottom-3 left-3 z-[3] rounded-md bg-black/55 px-2.5 py-1 font-mono2 text-[9px] tracking-[0.16em] text-white/70">
                  PROMETEO · IIT JODHPUR
                </span>
              </motion.div>
            )}

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="flex flex-wrap gap-2" data-testid="about-socials">
              {[
                { icon: Github, label: "GitHub", href: PROFILE.socials.github, id: "github" },
                { icon: Linkedin, label: "LinkedIn", href: PROFILE.socials.linkedin, id: "linkedin" },
                { icon: Mail, label: "Email", href: `mailto:${PROFILE.email}`, id: "email" },
              ].map(({ icon: Icon, label, href, id }) => (
                <a
                  key={id}
                  data-testid={`about-social-${id}`}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full border border-white/12 px-4 py-2 text-xs font-medium text-white/70 transition hover:border-[var(--cyan)]/50 hover:text-white"
                >
                  <Icon size={13} /> {label}
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
