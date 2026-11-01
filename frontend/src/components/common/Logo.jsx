export function LogoMark({ size = 22, glow = false }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      style={glow ? { filter: "drop-shadow(0 0 8px rgba(0,240,255,.5))" } : undefined}
    >
      <rect x="2" y="2" width="60" height="60" rx="15" fill="#0B111C" />
      <rect x="2" y="2" width="60" height="60" rx="15" stroke="rgba(0,240,255,0.4)" strokeWidth="2" />
      <path d="M18 21 L30 32 L18 43" stroke="#00F0FF" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="34" y="40" width="13" height="5" rx="2.5" fill="#8B5CF6" />
    </svg>
  );
}

export function Wordmark({ size = 15 }) {
  return (
    <span
      className="font-display font-bold tracking-tight"
      style={{ fontSize: size, letterSpacing: "-0.02em" }}
      data-testid="brand-wordmark"
    >
      DIVYANSH
      <span style={{ color: "var(--cyan)" }}>.OS</span>
    </span>
  );
}
