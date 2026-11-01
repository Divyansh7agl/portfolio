import { motion } from "framer-motion";
import { Github, ExternalLink, RefreshCw, Star, Users, FolderGit2, AlertTriangle, Loader2, Code2, Crown } from "lucide-react";
import { useGithubStats, useLeetcodeStats } from "../../lib/useStats";
import { languageColor } from "../common/ProjectMockup";
import { SKILLS, PROFILE } from "../../data/content";

const Chip = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-ink-2/70 px-3 py-2" data-testid="command-stat-chip">
    <Icon size={14} className="text-[var(--cyan)]" />
    <span className="font-display text-base font-bold text-white tabular-nums">{value}</span>
    <span className="font-mono2 text-[10px] text-white/45">{label}</span>
  </div>
);

function Skeleton({ className = "" }) {
  return <div className={`animate-pulse rounded-md bg-white/[0.06] ${className}`} />;
}

function GithubSection() {
  const { loading, error, data, retry } = useGithubStats();
  return (
    <section data-testid="command-github-section">
      <div className="flex items-center gap-2">
        <Github size={15} className="text-white" />
        <h3 className="font-display text-sm font-bold text-white">GitHub</h3>
        {data && (
          <a href={data.profile_url} target="_blank" rel="noopener noreferrer" data-testid="command-github-profile-link" className="ml-auto flex items-center gap-1 rounded-full border border-white/12 px-3 py-1 text-[11px] text-white/70 transition hover:border-white/30 hover:text-white">
            @{data.username} <ExternalLink size={10} />
          </a>
        )}
      </div>

      {loading && (
        <div className="mt-3 space-y-3" data-testid="command-github-loading">
          <div className="flex gap-2">{[0, 1, 2].map((i) => <Skeleton key={i} className="h-11 flex-1" />)}</div>
          <Skeleton className="h-24" />
          <Skeleton className="h-40" />
        </div>
      )}

      {!loading && error && (
        <div className="mt-3 rounded-xl border border-[#FF6B6B]/25 bg-[#FF6B6B]/[0.06] p-4" data-testid="command-github-error">
          <p className="flex items-center gap-2 text-xs text-[#FF9B9B]"><AlertTriangle size={13} /> {error}</p>
          <button onClick={retry} data-testid="command-github-retry" className="mt-2 flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-1.5 text-[11px] text-white/75 hover:border-white/40">
            <RefreshCw size={11} /> Retry
          </button>
        </div>
      )}

      {!loading && data && (
        <div className="mt-3 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            {data.avatar_url && <img src={data.avatar_url} alt={`${data.username} avatar`} className="h-9 w-9 rounded-full border border-white/15" />}
            <span className="font-display text-sm font-bold text-white">{data.name}</span>
            {data.bio && <span className="hidden truncate font-mono2 text-[10px] text-white/40 sm:block">— {data.bio}</span>}
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Chip icon={FolderGit2} label="public repos" value={data.public_repos} />
            <Chip icon={Star} label="total stars" value={data.total_stars} />
            <Chip icon={Users} label="followers" value={data.followers} />
          </div>

          {data.top_languages.length > 0 && (
            <div data-testid="command-languages">
              <p className="mb-1.5 font-mono2 text-[10px] tracking-[0.2em] text-white/40">LANGUAGES ACROSS REPOS</p>
              <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
                {data.top_languages.map((l, i) => (
                  <motion.span key={l.name} initial={{ width: 0 }} animate={{ width: `${(l.repos / data.top_languages.reduce((a, b) => a + b.repos, 0)) * 100}%` }} transition={{ delay: 0.15 + i * 0.1, duration: 0.6 }} style={{ background: languageColor(l.name) }} title={`${l.name} · ${l.repos} repos`} />
                ))}
              </div>
              <div className="mt-1.5 flex flex-wrap gap-2.5">
                {data.top_languages.map((l) => (
                  <span key={l.name} className="flex items-center gap-1 font-mono2 text-[10px] text-white/55">
                    <span className="h-2 w-2 rounded-sm" style={{ background: languageColor(l.name) }} /> {l.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {data.top_repos.length > 0 && (
            <div className="overflow-hidden rounded-xl border border-white/[0.08]" data-testid="command-top-repos">
              {data.top_repos.map((r, i) => (
                <a key={r.name} href={r.html_url} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-3 bg-ink-2/60 px-3.5 py-2.5 transition hover:bg-white/[0.05] ${i ? "border-t border-white/[0.06]" : ""}`} data-testid={`command-repo-${i}`}>
                  <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: r.language ? languageColor(r.language) : "#3a4358" }} />
                  <span className="truncate font-mono2 text-xs text-white/80">{r.name}</span>
                  <span className="ml-auto flex shrink-0 items-center gap-2 font-mono2 text-[10px] text-white/40">
                    {r.language || "—"} <span className="flex items-center gap-0.5"><Star size={9} /> {r.stars}</span>
                  </span>
                </a>
              ))}
            </div>
          )}

          {Object.keys(data.activity).length > 0 && (
            <div data-testid="command-activity">
              <p className="mb-1.5 font-mono2 text-[10px] tracking-[0.2em] text-white/40">PUBLIC ACTIVITY — LAST 4 WEEKS</p>
              <div className="flex flex-wrap gap-[3px]">
                {(() => {
                  const cells = [];
                  const now = new Date();
                  for (let i = 27; i >= 0; i--) {
                    const d = new Date(now);
                    d.setDate(d.getDate() - i);
                    const key = d.toISOString().slice(0, 10);
                    const count = data.activity[key] || 0;
                    cells.push(
                      <span
                        key={key}
                        title={`${key}: ${count} events`}
                        className="h-[9px] w-[9px] rounded-[2px]"
                        style={{ background: count === 0 ? "rgba(255,255,255,0.06)" : `rgba(0,240,255,${Math.min(0.25 + count * 0.25, 1)})` }}
                      />
                    );
                  }
                  return cells;
                })()}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

function LeetcodeSection() {
  const { loading, error, data, retry } = useLeetcodeStats();
  return (
    <section data-testid="command-leetcode-section">
      <div className="flex items-center gap-2">
        <Code2 size={15} className="text-[#FBBF24]" />
        <h3 className="font-display text-sm font-bold text-white">LeetCode</h3>
        {data && (
          <a href={data.profile_url} target="_blank" rel="noopener noreferrer" data-testid="command-leetcode-profile-link" className="ml-auto flex items-center gap-1 rounded-full border border-white/12 px-3 py-1 text-[11px] text-white/70 transition hover:border-white/30 hover:text-white">
            @{data.username} <ExternalLink size={10} />
          </a>
        )}
      </div>
      {loading && <div className="mt-3 space-y-2" data-testid="command-leetcode-loading"><Skeleton className="h-16" /></div>}
      {!loading && error && (
        <div className="mt-3 rounded-xl border border-dashed border-white/15 p-4" data-testid="command-leetcode-unavailable">
          <p className="flex items-center gap-2 text-xs text-white/50"><AlertTriangle size={13} className="shrink-0 text-[#FBBF24]" /> {error}</p>
          {data === null && retry && error.includes("not configured") && (
            <p className="mt-2 font-mono2 text-[10px] leading-relaxed text-white/35">
              Add <span className="text-[var(--cyan)]">LEETCODE_USERNAME</span> to the backend config and the live stats appear here automatically.
            </p>
          )}
        </div>
      )}
      {!loading && data && (
        <div className="mt-3 rounded-xl border border-white/[0.08] bg-ink-2/60 p-4" data-testid="command-leetcode-data">
          <div className="flex items-center gap-3">
            <Crown size={16} className="text-[#FBBF24]" />
            <span className="font-display text-2xl font-extrabold text-white tabular-nums">{data.solved.total}</span>
            <span className="text-xs text-white/45">problems solved{data.ranking ? ` · global rank #${data.ranking}` : ""}</span>
          </div>
          <div className="mt-3 space-y-2">
            {[["Easy", data.solved.easy, "#22E5A1"], ["Medium", data.solved.medium, "#FBBF24"], ["Hard", data.solved.hard, "#FF6B6B"]].map(([label, n, color]) => (
              <div key={label} className="flex items-center gap-2.5">
                <span className="w-14 font-mono2 text-[10px] text-white/50">{label}</span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.07]">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${(n / Math.max(data.solved.total, 1)) * 100}%` }} transition={{ duration: 0.6 }} className="h-full rounded-full" style={{ background: color }} />
                </div>
                <span className="w-8 text-right font-mono2 text-[10px] text-white/60 tabular-nums">{n}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default function CommandCenterApp() {
  return (
    <div className="p-5" data-testid="command-center-app">
      <div className="flex items-end justify-between">
        <div>
          <p className="font-mono2 text-[11px] tracking-[0.28em] text-[var(--cyan)]">DEVELOPER COMMAND CENTER</p>
          <h2 className="mt-1.5 font-display text-xl font-bold tracking-tight text-white">Live signals, real data</h2>
        </div>
        <span className="font-mono2 text-[10px] text-white/30">fetched server-side · nothing faked</span>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-5 pr-1 lg:grid-cols-2">
        <GithubSection />
        <div className="space-y-5">
          <LeetcodeSection />
          <section data-testid="command-stack-section">
            <h3 className="font-display text-sm font-bold text-white">Technical overview</h3>
            <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {SKILLS.map((s) => (
                <div key={s.category} className="rounded-xl border border-white/[0.08] bg-ink-2/70 p-3" data-testid="command-stack-category">
                  <p className="font-mono2 text-[9px] tracking-[0.2em] text-white/40">{s.category.toUpperCase()}</p>
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {s.items.map((it) => (
                      <span key={it} className="rounded border border-white/[0.08] bg-white/[0.04] px-1.5 py-0.5 font-mono2 text-[9px] text-white/55">{it}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
