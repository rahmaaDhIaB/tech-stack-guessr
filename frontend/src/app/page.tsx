"use client";

import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import ScanningAnimation from "@/components/ScanningAnimation";
import ResultsPanel from "@/components/ResultsPanel";
import { analyzeUrl } from "@/lib/api";
import { AnalysisResult } from "@/lib/types";
import { Scan } from "lucide-react";

type AppState = "idle" | "loading" | "result" | "error";

export default function Home() {
  const [state, setState] = useState<AppState>("idle");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [currentUrl, setCurrentUrl] = useState("");
  const [error, setError] = useState("");
  const [signals, setSignals] = useState<string[]>([]);  
  const [scanCount, setScanCount] = useState(0);           

  const handleSubmit = async (url: string) => {
    const fullUrl = url.startsWith("http") ? url : `https://${url}`;
    setCurrentUrl(fullUrl);
    setState("loading");
    setError("");
    setResult(null);

    try {
      const data = await analyzeUrl(fullUrl);
      setResult(data.result);
      setSignals(data.signals || []);   
      setScanCount(c => c + 1);         
      setState("result");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setError(message);
      setState("error");
    }
  };

  const handleReset = () => {
    setState("idle");
    setResult(null);
    setCurrentUrl("");
    setError("");
  };

  return (
    <main className="min-h-screen bg-dark">
      <div className="fixed inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(200,241,53,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(200,241,53,0.03) 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
      <div className="fixed inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(200,241,53,0.06) 0%, transparent 70%)" }} />

      <div className="relative z-10 px-4 py-16 md:py-24">
        {(state === "idle" || state === "error") && (
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 border border-[#1E1E1E] rounded-full px-4 py-1.5 mb-8">
              <Scan size={12} className="text-acid" />
              <span className="text-[#888888] font-mono text-xs">  detect any website's stack in seconds
</span>
            </div>
            <h1 className="font-display font-extrabold text-5xl md:text-7xl text-white mb-4 leading-none tracking-tight">
              Tech Stack{" "}
              <span className="text-acid relative">
                Guessr
                <span className="absolute -bottom-1 left-0 right-0 h-1 bg-acid opacity-30 rounded-full" />
              </span>
            </h1>
            <p className="text-[#888888] font-mono text-sm md:text-base max-w-md mx-auto leading-relaxed">
  paste any URL and we'll dig through the headers, scan the HTML, and
  tell you exactly what they built it with.            </p>
            {scanCount > 0 && (
              <p className="text-[#3A3A3A] font-mono text-xs mt-4">
                {scanCount} site{scanCount > 1 ? "s" : ""} scanned this session
              </p>
            )}
          </div>
        )}

        {state !== "loading" && state !== "result" && (
          <SearchBar onSubmit={handleSubmit} loading={false} />
        )}

        {state === "error" && (
          <div className="max-w-2xl mx-auto mt-6 p-4 border border-[#F1356040] bg-[#F1356008] rounded-lg">
            <p className="text-[#F13560] font-mono text-sm">✗ {error}</p>
          </div>
        )}

        {state === "loading" && <ScanningAnimation url={currentUrl} />}

        {state === "result" && result && (
          <ResultsPanel
            result={result}
            url={currentUrl}
            onReset={handleReset}
            signals={signals}    
          />
        )}

        {state === "idle" && (
          <div className="text-center mt-20">
           <p className="text-[#2A2A2A] font-mono text-xs">
            $whoami → Rahma 
          </p>
          </div>
        )}
      </div>
    </main>
  );
}