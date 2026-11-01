import { useCallback, useEffect, useState } from "react";
import { fetchGithubStats, fetchLeetcodeStats } from "./api";

export function useGithubStats() {
  const [state, setState] = useState({ loading: true, error: null, data: null });
  const load = useCallback(() => {
    const ctrl = new AbortController();
    setState({ loading: true, error: null, data: null });
    fetchGithubStats(ctrl.signal)
      .then((d) =>
        setState(d.available ? { loading: false, error: null, data: d } : { loading: false, error: d.reason || "GitHub stats unavailable.", data: null })
      )
      .catch((e) => {
        if (e.name === "AbortError") return;
        setState({ loading: false, error: "Could not reach the stats service.", data: null });
      });
    return () => ctrl.abort();
  }, []);
  useEffect(() => load(), [load]);
  return { ...state, retry: load };
}

export function useLeetcodeStats() {
  const [state, setState] = useState({ loading: true, error: null, data: null });
  const load = useCallback(() => {
    const ctrl = new AbortController();
    setState({ loading: true, error: null, data: null });
    fetchLeetcodeStats(ctrl.signal)
      .then((d) =>
        setState(d.available ? { loading: false, error: null, data: d } : { loading: false, error: d.reason || "LeetCode stats unavailable.", data: null })
      )
      .catch((e) => {
        if (e.name === "AbortError") return;
        setState({ loading: false, error: "Could not reach the stats service.", data: null });
      });
    return () => ctrl.abort();
  }, []);
  useEffect(() => load(), [load]);
  return { ...state, retry: load };
}
