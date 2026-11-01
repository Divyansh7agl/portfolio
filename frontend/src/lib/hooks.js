import { useEffect, useState, useCallback } from "react";

export function useIsMobile(breakpoint = 820) {
  const [mobile, setMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < breakpoint;
  });

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    try {
      const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
      const on = () => setMobile(mq.matches);
      on();
      if (mq.addEventListener) {
        mq.addEventListener("change", on);
        return () => mq.removeEventListener("change", on);
      } else if (mq.addListener) {
        mq.addListener(on);
        return () => mq.removeListener(on);
      }
    } catch {
      // safe fallback
    }
  }, [breakpoint]);

  return mobile;
}

export function useClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return now;
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false;
    try {
      return !!window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    try {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      const on = () => setReduced(mq.matches);
      if (mq.addEventListener) {
        mq.addEventListener("change", on);
        return () => mq.removeEventListener("change", on);
      } else if (mq.addListener) {
        mq.addListener(on);
        return () => mq.removeListener(on);
      }
    } catch {
      // safe fallback
    }
  }, []);

  return reduced;
}

export function useLocalStorage(key, initial) {
  const [val, setVal] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw !== null ? JSON.parse(raw) : initial;
    } catch {
      return initial;
    }
  });
  const set = useCallback(
    (v) => {
      setVal((prev) => {
        const next = typeof v === "function" ? v(prev) : v;
        try {
          window.localStorage.setItem(key, JSON.stringify(next));
        } catch {}
        return next;
      });
    },
    [key]
  );
  return [val, set];
}
