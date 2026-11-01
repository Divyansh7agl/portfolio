import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import SectionHead from "./SectionHead";
import ContactForm from "../common/ContactForm";
import { PROFILE } from "../../data/content";

export default function ContactSection() {
  return (
    <section id="contact" className="relative overflow-hidden px-5 py-24 md:px-10 md:py-36" data-testid="contact-section">
      <div className="aurora aurora-a pointer-events-none absolute -right-52 top-1/4 h-[560px] w-[560px]" style={{ background: "radial-gradient(circle, rgba(0,240,255,0.1), transparent 65%)" }} />

      <div className="relative mx-auto max-w-7xl">
        <SectionHead index="07" eyebrow="TRANSMIT" title={undefined} />

        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: "60%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.85, ease: [0.19, 1, 0.22, 1] }}
            className="font-display font-semibold leading-[0.95] tracking-[-0.03em]"
            data-testid="contact-headline"
          >
            <span className="block text-[clamp(2.6rem,8.5vw,7rem)] text-white">LET'S BUILD</span>
            <span className="text-stroke block text-[clamp(2.6rem,8.5vw,7rem)]">SOMETHING GREAT.</span>
          </motion.h2>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-3">
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              href={`mailto:${PROFILE.email}`}
              data-testid="contact-giant-email"
              className="group block"
            >
              <span className="font-mono2 text-[10px] tracking-[0.3em] text-white/40">EMAIL ME — REPLIES FAST</span>
              <span className="mt-2 block break-all font-display text-xl font-semibold text-white transition group-hover:text-[var(--cyan)] md:text-2xl">
                {PROFILE.email}
              </span>
            </motion.a>

            <div className="flex flex-wrap gap-2.5 pt-4" data-testid="contact-socials">
              <a href={PROFILE.socials.github} target="_blank" rel="noopener noreferrer" data-testid="contact-github" className="flex items-center gap-2 rounded-full border border-white/12 px-5 py-2.5 text-xs font-medium text-white/75 transition hover:border-[var(--cyan)]/50 hover:text-white">
                <Github size={14} /> github.com/Divyansh7agl
              </a>
              <a href={PROFILE.socials.linkedin} target="_blank" rel="noopener noreferrer" data-testid="contact-linkedin" className="flex items-center gap-2 rounded-full border border-white/12 px-5 py-2.5 text-xs font-medium text-white/75 transition hover:border-[var(--cyan)]/50 hover:text-white">
                <Linkedin size={14} /> LinkedIn
              </a>
            </div>

            <p className="flex items-center gap-2 pt-6 font-mono2 text-[10px] tracking-[0.2em] text-white/35">
              <MapPin size={11} /> JODHPUR, RAJASTHAN, INDIA — OPEN TO REMOTE & INTERNSHIPS
            </p>
          </div>

          <motion.div initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.55, delay: 0.1 }}>
            <div className="rounded-3xl border border-white/[0.08] bg-[#0A0F19] p-6 md:p-8">
              <p className="mb-5 font-mono2 text-[10px] tracking-[0.28em] text-white/40">DIRECT LINE — THIS FORM REALLY SENDS</p>
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
