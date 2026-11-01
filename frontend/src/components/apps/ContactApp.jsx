import { Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";
import ContactForm from "../common/ContactForm";
import { CONTACT } from "../../data/content";

export default function ContactApp() {
  return (
    <div className="p-5" data-testid="contact-app">
      <p className="font-mono2 text-[11px] tracking-[0.28em] text-[var(--cyan)]">GET IN TOUCH</p>
      <h2 className="mt-1.5 font-display text-xl font-bold tracking-tight text-white">
        Have a role or an idea?<br />My inbox is open.
      </h2>

      <div className="mt-4 flex flex-wrap gap-2" data-testid="contact-direct-links">
        <a data-testid="contact-link-email" href={`mailto:${CONTACT.email}`} className="flex items-center gap-2 rounded-full border border-white/12 px-3.5 py-1.5 text-xs font-medium text-white/75 transition hover:border-[var(--cyan)]/50 hover:text-white">
          <Mail size={13} /> {CONTACT.email}
        </a>
        <a data-testid="contact-link-github" href={CONTACT.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full border border-white/12 px-3.5 py-1.5 text-xs font-medium text-white/75 transition hover:border-[var(--cyan)]/50 hover:text-white">
          <Github size={13} /> GitHub
        </a>
        <a data-testid="contact-link-linkedin" href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full border border-white/12 px-3.5 py-1.5 text-xs font-medium text-white/75 transition hover:border-[var(--cyan)]/50 hover:text-white">
          <Linkedin size={13} /> LinkedIn
        </a>
      </div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.4 }} className="mt-5">
        <ContactForm />
        <p className="mt-3 font-mono2 text-[10px] text-white/30">
          Messages are delivered straight to Divyansh's inbox — no simulations, this actually sends.
        </p>
      </motion.div>
    </div>
  );
}
