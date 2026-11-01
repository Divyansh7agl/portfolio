import { useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import Lenis from "lenis";
import Preloader from "./Preloader";
import Cursor from "./Cursor";
import Nav from "./Nav";
import Hero from "./Hero";
import Marquee from "./Marquee";
import AboutSection from "./AboutSection";
import ProjectsSection from "./ProjectsSection";
import SignalsSection from "./SignalsSection";
import LabSection from "./LabSection";
import TerminalSection from "./TerminalSection";
import AchievementsSection from "./AchievementsSection";
import ContactSection from "./ContactSection";
import Footer from "./Footer";
import { useReducedMotion } from "../../lib/hooks";

const MARQUEE_ITEMS = ["FULL-STACK DEVELOPMENT", "AI INTEGRATION", "CLOUD — AWS & AZURE", "PROBLEM SOLVING", "PRODUCT MINDSET"];

export default function HomeExperience() {
  const reduced = useReducedMotion();
  const [loaded, setLoaded] = useState(reduced);
  const lenisRef = useRef(null);

  useEffect(() => {
    document.title = "DIVYANSH.OS — Divyansh Agarwal · Full Stack Developer";
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (reduced) return;
    try {
      const lenis = new Lenis({ lerp: 0.1 });
      lenisRef.current = lenis;
      window.__lenis = lenis;
      let raf;
      const loop = (t) => {
        lenis.raf(t);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
      return () => {
        cancelAnimationFrame(raf);
        lenis.destroy();
        lenisRef.current = null;
        window.__lenis = null;
      };
    } catch (e) {
      console.warn("Lenis init failed:", e);
    }
  }, [reduced]);

  const scrollTo = (target) => {
    if (typeof target === "number") {
      if (lenisRef.current) lenisRef.current.scrollTo(target);
      else window.scrollTo({ top: target });
      return;
    }
    if (lenisRef.current) lenisRef.current.scrollTo(target, { offset: -56 });
    else document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  };

  const ready = reduced || loaded;

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#05070C] font-body text-white" data-testid="home-experience">
        {!reduced && (
          <AnimatePresence>{!loaded && <Preloader key="preloader" onDone={() => setLoaded(true)} />}</AnimatePresence>
        )}
        {!reduced && <Cursor />}
        <div className="noise pointer-events-none fixed inset-0 z-[60]" aria-hidden />

        <Nav scrollTo={scrollTo} />
        <main className="relative">
          <Hero ready={ready} scrollTo={scrollTo} />
          <Marquee items={MARQUEE_ITEMS} />
          <AboutSection />
          <ProjectsSection />
          <SignalsSection />
          <LabSection />
          <TerminalSection />
          <AchievementsSection />
          <ContactSection />
          <Footer />
        </main>
      </div>
    </MotionConfig>
  );
}
