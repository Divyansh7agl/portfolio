import { motion } from "framer-motion";
import { AlertTriangle, Code2, Crown, ExternalLink, FolderGit2, RefreshCw, Star, Users } from "lucide-react";
import SectionHead from "./SectionHead";
import { useGithubStats, useLeetcodeStats } from "../../lib/useStats";
import { languageColor } from "../common/ProjectMockup";

const Card = ({ children, className = "", span = 1, testid }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.5 }}
    className={`h-full rounded-3xl border border-white/[0.07] bg-[#0A0F19] p-6 ${span === 2 ? "md:col-span-2" : ""} ${span === 3 ? "md:col-span-3" : ""} ${className}`}
    data-testid={testid}
  >
    {children}
  </motion.div>
);

const Chip = ({ icon: Icon, label, value }) => (
  <div className="flex flex-1 items-center gap-2.5 rounded-xl border border-white/[0.07] bg-white/[0.03] px-3.5 py-2.5" data-testid="signal-chip">
    <Icon size={14} className="text-[var(--cyan)]" />
    <span className="font-display text-lg font-semibold text-white tabular-nums">{value}</span>
    <span className="font-mono2 text-[9px] tracking-wide text-white/40">{label}</span>
  </div>
);

const Skeleton = ({ className = "" }) => <div className={`animate-pulse rounded-lg bg-white/[0.06] ${className}`} />;

export default function SignalsSection() {
  const gh = useGithubStats();
  const lc = useLeetcodeStats();

  return (
    <section id="signals" className="relative px-5 py-24 md:px-10 md:py-36" data-testid="signals-section">
      <div className="mx-auto max-w-7xl">
        <SectionHead
          index="03"
          eyebrow="DEVELOPER COMMAND CENTER"
          title={
            <>
              Live signals, <span className="text-stroke-cyan">zero spin.</span>
            </>
          }
          desc="Pulled from the GitHub and LeetCode APIs on every visit, cached server-side. If a number is here, it's real."
        />

        <div className="grid gap-3 md:grid-cols-3">
          {/* profile */}
          <Card span={2} testid="signal-github">
            {gh.loading && (
              <div className="space-y-3" data-testid="signal-loading">
                <div className="flex gap-3">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="flex-1 space-y-2 pt-1">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-3 w-64" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Skeleton className="h-11 flex-1" />
                  <Skeleton className="h-11 flex-1" />
                  <Skeleton className="h-11 flex-1" />
                </div>
                <Skeleton className="h-2.5 w-full rounded-full" />
              </div>
            )}
            {!gh.loading && gh.error && (
              <div data-testid="signal-error">
                <p className="flex items-center gap-2 text-sm text-[#FF9B9B]">
                  <AlertTriangle size={15} /> {gh.error}
                </p>
                <button onClick={gh.retry} data-testid="signal-retry" className="mt-3 flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs text-white/75 transition hover:border-white/40">
                  <RefreshCw size={12} /> Retry
                </button>
              </div>
            )}
            {!gh.loading && gh.data && (
              <>
                <div className="flex flex-wrap items-center gap-4">
                  {gh.data.avatar_url && (
                    <img src={gh.data.avatar_url} alt="GitHub avatar" className="h-12 w-12 rounded-full border border-white/15" />
                  )}
                  <div className="min-w-0">
                    <p className="font-display text-lg font-semibold text-white">{gh.data.name}</p>
                    {gh.data.bio && <p className="truncate text-xs text-white/45">{gh.data.bio}</p>}
                  </div>
                  <a
                    href={gh.data.profile_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="signal-github-link"
                    className="ml-auto flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 font-mono2 text-[10px] text-white/70 transition hover:border-[var(--cyan)]/50 hover:text-white"
                  >
                    @{gh.data.username} <ExternalLink size={10} />
                  </a>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Chip icon={FolderGit2} label="public repos" value={gh.data.public_repos} />
                  <Chip icon={Star} label="total stars" value={gh.data.total_stars} />
                  <Chip icon={Users} label="followers" value={gh.data.followers} />
                </div>
                {gh.data.top_languages.length > 0 && (
                  <div className="mt-5" data-testid="signal-languages">
                    <div className="flex h-3 w-full overflow-hidden rounded-full bg-white/[0.05]">
                      {gh.data.top_languages.map((l, i) => (
                        <motion.span
                          key={l.name}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(l.repos / gh.data.top_languages.reduce((a, b) => a + b.repos, 0)) * 100}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.15 + i * 0.09, duration: 0.7 }}
                          style={{ background: languageColor(l.name) }}
                          title={`${l.name} · ${l.repos} repos`}
                        />
                      ))}
                    </div>
                    <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1.5">
                      {gh.data.top_languages.map((l) => (
                        <span key={l.name} className="flex items-center gap-1.5 font-mono2 text-[10px] text-white/55">
                          <span className="h-2 w-2 rounded-sm" style={{ background: languageColor(l.name) }} /> {l.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </Card>

          {/* leetcode */}
          <Card testid="signal-leetcode">
            <div className="flex items-center gap-2">
              <Code2 size={15} className="text-[#FBBF24]" />
              <span className="font-display text-sm font-semibold text-white">LeetCode</span>
            </div>
            {lc.loading && <Skeleton className="mt-4 h-20" />}
            {!lc.loading && lc.data && (
              <div className="mt-4" data-testid="signal-leetcode-data">
                <div className="flex items-end gap-3">
                  <Crown size={18} className="pb-1 text-[#FBBF24]" />
                  <span className="font-display text-5xl font-semibold text-white tabular-nums">{lc.data.solved.total}</span>
                  <span className="pb-1.5 text-xs text-white/45">solved{lc.data.ranking ? ` · rank #${lc.data.ranking}` : ""}</span>
                </div>
                <div className="mt-4 space-y-2">
                  {[["Easy", lc.data.solved.easy, "#22E5A1"], ["Medium", lc.data.solved.medium, "#FBBF24"], ["Hard", lc.data.solved.hard, "#FF6B6B"]].map(([l, n, c]) => (
                    <div key={l} className="flex items-center gap-3">
                      <span className="w-14 font-mono2 text-[10px] text-white/45">{l}</span>
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.07]">
                        <motion.div initial={{ width: 0 }} whileInView={{ width: `${(n / Math.max(lc.data.solved.total, 1)) * 100}%` }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="h-full rounded-full" style={{ background: c }} />
                      </div>
                      <span className="w-7 text-right font-mono2 text-[10px] text-white/55 tabular-nums">{n}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {!lc.loading && lc.error && (
              <p className="mt-4 font-mono2 text-[11px] leading-relaxed text-white/40" data-testid="signal-leetcode-empty">
                <AlertTriangle size={12} className="mr-1.5 inline shrink-0 text-[#FBBF24]" />
                {lc.error}
              </p>
            )}
          </Card>

          {/* activity */}
          {gh.data && (
            <Card testid="signal-activity">
              <p className="font-mono2 text-[10px] tracking-[0.24em] text-white/45">PUBLIC ACTIVITY — LAST 4 WEEKS</p>
              <div className="mt-4 flex flex-wrap gap-[5px]">
                {(() => {
                  const cells = [];
                  const now = new Date();
                  for (let i = 27; i >= 0; i--) {
                    const d = new Date(now);
                    d.setDate(d.getDate() - i);
                    const key = d.toISOString().slice(0, 10);
                    const count = gh.data.activity[key] || 0;
                    cells.push(
                      <motion.span
                        key={key}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.012, duration: 0.3 }}
                        title={`${key}: ${count} events`}
                        className="h-[11px] w-[11px] rounded-[3px]"
                        style={{ background: count === 0 ? "rgba(255,255,255,0.06)" : `rgba(0,240,255,${Math.min(0.3 + count * 0.25, 1)})` }}
                      />
                    );
                  }
                  return cells;
                })()}
              </div>
              <p className="mt-3 font-mono2 text-[9px] text-white/30">one square = one day of public GitHub events</p>
            </Card>
          )}

          {/* top repos */}
          {gh.data && gh.data.top_repos.length > 0 && (
            <Card span={2} testid="signal-repos">
              <p className="font-mono2 text-[10px] tracking-[0.24em] text-white/45">TOP REPOSITORIES</p>
              <div className="mt-4 divide-y divide-white/[0.06]">
                {gh.data.top_repos.map((r, i) => (
                  <a key={r.name} href={r.html_url} target="_blank" rel="noopener noreferrer" data-testid={`signal-repo-${i}`} className="flex items-center gap-3 py-2.5 transition hover:opacity-80">
                    <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: r.language ? languageColor(r.language) : "#3a4358" }} />
                    <span className="truncate font-mono2 text-xs text-white/80">{r.name}</span>
                    <span className="ml-auto flex shrink-0 items-center gap-3 font-mono2 text-[10px] text-white/40">
                      {r.language || "—"}
                      <span className="flex items-center gap-1">
                        <Star size={9} /> {r.stars}
                      </span>
                    </span>
                  </a>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}
