import { motion } from "framer-motion";
import { GraduationCap, Github, Linkedin, Mail, MapPin, Sparkles } from "lucide-react";
import { PROFILE, EDUCATION } from "../../data/content";

export default function AboutApp() {
  return (
    <div className="p-6" data-testid="about-app">
      <div className="flex flex-col gap-6 sm:flex-row">
        <motion.div
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full shrink-0 sm:w-[220px]"
        >
          <div className="overflow-hidden rounded-2xl border border-white/10 shadow-[0_18px_50px_rgba(0,0,0,0.5)]">
            <img
              src={PROFILE.photo}
              alt="Divyansh Agarwal"
              className="aspect-[4/5] w-full object-cover"
              data-testid="about-photo"
              style={{ objectPosition: "center 30%" }}
            />
          </div>
          <div className="glass mt-3 flex items-center gap-2 rounded-full px-3 py-1.5" data-testid="about-availability">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-[#28C840]" />
            <span className="font-mono2 text-[10px] tracking-[0.14em] text-white/70">OPEN TO INTERNSHIPS</span>
          </div>
        </motion.div>

        <div className="min-w-0 flex-1">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.08 }}>
            <p className="font-mono2 text-[11px] tracking-[0.28em] text-[var(--cyan)]">ABOUT ME</p>
            <h1 className="mt-2 font-display text-2xl font-bold tracking-tight text-white">{PROFILE.name}</h1>
            <p className="mt-1 text-sm font-medium text-[#B7A6F8]">{PROFILE.role}</p>
            <p className="mt-4 text-sm leading-relaxed text-white/65">{PROFILE.intro}</p>
            <p className="mt-3 border-l-2 border-[var(--cyan)]/40 pl-3 text-sm italic leading-relaxed text-white/50">
              "{PROFILE.approach}"
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="glass mt-5 rounded-xl p-4"
            data-testid="about-education"
          >
            <div className="flex items-center gap-2">
              <GraduationCap size={15} className="text-[var(--cyan)]" />
              <span className="font-display text-sm font-bold text-white">Education</span>
            </div>
            <p className="mt-2 text-sm text-white/75">{EDUCATION.degree}</p>
            <p className="text-xs text-white/45">
              {EDUCATION.school} · {EDUCATION.period}
            </p>
            <p className="mt-1 font-mono2 text-[11px] text-[#8FE8C8]">{EDUCATION.detail}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="mt-5 flex flex-wrap items-center gap-2"
            data-testid="about-socials"
          >
            <a
              data-testid="about-link-github"
              href={PROFILE.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-white/12 px-3.5 py-1.5 text-xs font-medium text-white/75 transition hover:border-[var(--cyan)]/50 hover:text-white"
            >
              <Github size={13} /> GitHub
            </a>
            <a
              data-testid="about-link-linkedin"
              href={PROFILE.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-white/12 px-3.5 py-1.5 text-xs font-medium text-white/75 transition hover:border-[var(--cyan)]/50 hover:text-white"
            >
              <Linkedin size={13} /> LinkedIn
            </a>
            <a
              data-testid="about-link-email"
              href={`mailto:${PROFILE.email}`}
              className="flex items-center gap-2 rounded-full border border-white/12 px-3.5 py-1.5 text-xs font-medium text-white/75 transition hover:border-[var(--cyan)]/50 hover:text-white"
            >
              <Mail size={13} /> Email
            </a>
            <span className="ml-auto hidden items-center gap-1.5 font-mono2 text-[10px] text-white/35 sm:flex">
              <MapPin size={10} /> {PROFILE.location}
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
