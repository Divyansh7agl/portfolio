const BACKEND = (process.env.REACT_APP_BACKEND_URL || "").replace(/\/$/, "");
const API = BACKEND ? `${BACKEND}/api` : "/api";

async function getJSON(path, signal) {
  const res = await fetch(`${API}${path}`, { signal });
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return res.json();
}

export function fetchGithubStats(signal) {
  return getJSON("/stats/github", signal);
}

export function fetchLeetcodeStats(signal) {
  return getJSON("/stats/leetcode", signal);
}

export async function sendContactMessage(payload) {
  const res = await fetch(`${API}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.detail || "Message could not be delivered. Please email me directly.");
  }
  return data;
}
