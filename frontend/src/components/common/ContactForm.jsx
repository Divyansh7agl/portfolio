import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2, CheckCircle2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { sendContactMessage } from "../../lib/api";

export default function ContactForm({ compact = false }) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const validate = () => {
    const e = {};
    if (form.name.trim().length < 2) e.name = "Please enter your name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (form.subject.trim().length < 2) e.subject = "Add a short subject";
    if (form.message.trim().length < 10) e.message = "Message needs at least 10 characters";
    return e;
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    setSending(true);
    try {
      await sendContactMessage(form);
      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
      toast.success("Message delivered — Divyansh will get back to you soon.");
    } catch (err) {
      toast.error(err.message || "Something went wrong. Please email directly.");
    } finally {
      setSending(false);
    }
  };

  const field = (key, label, props = {}, testid) => (
    <label className={`block ${props.full ? "" : ""}`}>
      <span className="mb-1 block font-mono2 text-[10px] tracking-[0.18em] text-white/45">{label}</span>
      {props.textarea ? (
        <textarea
          data-testid={testid}
          rows={compact ? 3 : 4}
          className="w-full resize-none rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[var(--cyan)]/60 focus:bg-white/[0.06]"
          value={form[key]}
          onChange={(ev) => setForm({ ...form, [key]: ev.target.value })}
          placeholder={props.placeholder}
        />
      ) : (
        <input
          data-testid={testid}
          type={props.type || "text"}
          className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[var(--cyan)]/60 focus:bg-white/[0.06]"
          value={form[key]}
          onChange={(ev) => setForm({ ...form, [key]: ev.target.value })}
          placeholder={props.placeholder}
        />
      )}
      {errors[key] && (
        <span className="mt-1 flex items-center gap-1 text-[11px] text-[#FF6B6B]" data-testid={`contact-error-${key}`}>
          <AlertTriangle size={10} /> {errors[key]}
        </span>
      )}
    </label>
  );

  return (
    <form onSubmit={onSubmit} className="space-y-3" data-testid="contact-form" noValidate>
      <div className="grid gap-3 sm:grid-cols-2">
        {field("name", "YOUR NAME", { placeholder: "Ada Lovelace" }, "contact-name-input")}
        {field("email", "YOUR EMAIL", { type: "email", placeholder: "you@example.com" }, "contact-email-input")}
      </div>
      {field("subject", "SUBJECT", { placeholder: "Internship opportunity / collaboration" }, "contact-subject-input")}
      {field("message", "MESSAGE", { textarea: true, placeholder: "Tell me about the role, project or idea…" }, "contact-message-input")}
      <motion.button
        data-testid="contact-submit-button"
        type="submit"
        disabled={sending}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--cyan)] py-2.5 font-display text-sm font-bold text-ink-0 shadow-[0_0_24px_rgba(0,240,255,0.25)] transition disabled:opacity-60"
      >
        {sending ? <Loader2 size={15} className="animate-spin" /> : sent ? <CheckCircle2 size={15} /> : <Send size={14} />}
        {sending ? "Sending…" : sent ? "Sent — message received" : "Send message"}
      </motion.button>
    </form>
  );
}
