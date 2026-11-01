import { useRef, useState } from "react";
import { Download, ExternalLink, Upload, RotateCcw, FileText } from "lucide-react";
import { RESUME } from "../../data/content";

const LS_KEY = "dos-resume-custom";

export default function ResumeApp() {
  const [custom, setCustom] = useState(() => window.localStorage.getItem(LS_KEY) || "");
  const blobRef = useRef(null);
  const fileRef = useRef(null);

  const url = custom ? URL.createObjectURL(base64ToBlob(custom)) : RESUME.url;

  function base64ToBlob(b64) {
    const bin = atob(b64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return new Blob([bytes], { type: "application/pdf" });
  }

  const onUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") return;
    const reader = new FileReader();
    reader.onload = () => {
      const b64 = reader.result.split(",")[1];
      try {
        window.localStorage.setItem(LS_KEY, b64);
        setCustom(b64);
      } catch {
        setCustom(b64);
      }
    };
    reader.readAsDataURL(file);
  };

  const reset = () => {
    window.localStorage.removeItem(LS_KEY);
    setCustom("");
  };

  return (
    <div className="flex h-full flex-col" data-testid="resume-app">
      <div className="flex flex-wrap items-center gap-2 border-b border-white/[0.07] p-3">
        <span className="mr-1 flex items-center gap-2 pl-1 font-display text-[13px] font-bold text-white">
          <FileText size={14} className="text-[#A78BFA]" /> {RESUME.label}
        </span>
        <a
          data-testid="resume-download"
          href={url}
          download={RESUME.label}
          className="flex items-center gap-1.5 rounded-lg bg-[var(--cyan)] px-3 py-1.5 text-[11px] font-bold text-ink-0 transition hover:brightness-110"
        >
          <Download size={12} /> Download PDF
        </a>
        <button
          data-testid="resume-newtab"
          onClick={() => window.open(url, "_blank", "noopener")}
          className="flex items-center gap-1.5 rounded-lg border border-white/12 px-3 py-1.5 text-[11px] font-medium text-white/75 transition hover:border-white/30 hover:text-white"
        >
          <ExternalLink size={12} /> Open in new tab
        </button>
        <input ref={fileRef} type="file" accept="application/pdf" hidden onChange={onUpload} data-testid="resume-upload-input" />
        <button
          data-testid="resume-upload"
          onClick={() => fileRef.current?.click()}
          className="flex items-center gap-1.5 rounded-lg border border-white/12 px-3 py-1.5 text-[11px] font-medium text-white/75 transition hover:border-white/30 hover:text-white"
        >
          <Upload size={12} /> Upload latest
        </button>
        {custom && (
          <button data-testid="resume-reset" onClick={reset} className="flex items-center gap-1.5 rounded-lg border border-[#FF6B6B]/30 px-3 py-1.5 text-[11px] font-medium text-[#FF6B6B]">
            <RotateCcw size={12} /> Use default
          </button>
        )}
        {custom && <span className="font-mono2 text-[10px] text-[#8FE8C8]">custom resume loaded</span>}
      </div>
      <div className="min-h-0 flex-1 p-3">
        <iframe
          key={url}
          data-testid="resume-frame"
          title="Divyansh Agarwal — Resume"
          src={`${url}#toolbar=0`}
          className="h-full w-full rounded-lg border border-white/10 bg-white"
        />
      </div>
    </div>
  );
}
