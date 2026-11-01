import { Component, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import HomeExperience from "@/components/home/HomeExperience";
import Desktop from "@/components/desktop/Desktop";
import RecruiterPage from "@/components/recruiter/RecruiterPage";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }
  render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-[#05070C] p-8 text-center text-white" data-testid="error-boundary">
          <div className="max-w-md rounded-2xl border border-white/10 bg-[#0A0F1A] p-8 shadow-2xl">
            <p className="font-mono2 text-xs tracking-[0.2em] text-[#00F0FF]">SYSTEM FAULT</p>
            <h1 className="mt-3 font-display text-2xl font-bold text-white">Something broke on the page.</h1>
            <p className="mt-2 text-xs text-white/50">{this.state.error?.message || "Unexpected runtime issue"}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 rounded-full bg-[#00F0FF] px-5 py-2 font-display text-xs font-bold text-[#05070C]"
            >
              RELOAD PAGE
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomeExperience />} />
          <Route path="/os" element={<Desktop />} />
          <Route path="/desktop" element={<Desktop />} />
          <Route path="/recruiter" element={<RecruiterPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster position="top-center" theme="dark" richColors closeButton />
      </BrowserRouter>
    </ErrorBoundary>
  );
}
