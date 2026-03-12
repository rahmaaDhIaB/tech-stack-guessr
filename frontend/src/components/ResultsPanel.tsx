"use client";

import { useState } from "react";   
import { AnalysisResult } from "@/lib/types";
import TechCard from "./TechCard";
import { Lightbulb, FileText, RefreshCw } from "lucide-react";

interface ResultsPanelProps {
  result: AnalysisResult;
  url: string;
  onReset: () => void;
  signals: string[];
}

export default function ResultsPanel({ result, url, onReset, signals }: ResultsPanelProps) {

  const [showSignals, setShowSignals] = useState(false);   

  const grouped = result.technologies.reduce((acc, tech) => {
    if (!acc[tech.category]) acc[tech.category] = [];
    acc[tech.category].push(tech);
    return acc;
  }, {} as Record<string, typeof result.technologies>);

  const hostname = (() => {
    try { return new URL(url).hostname; }
    catch { return url; }
  })();

  const handleCopy = () => {
    const text = result.technologies
      .map(t => `${t.name} (${t.category}) — ${t.confidence}% confidence`)
      .join("\n");
    navigator.clipboard.writeText(text);
    alert("Copied!");
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-10 space-y-8 animate-[fadeUp_0.4s_ease_forwards]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[#555555] font-mono text-xs mb-1">analysis complete</p>
          <h2 className="font-display font-bold text-2xl text-white">{hostname}</h2>
          <p className="text-[#555555] font-mono text-xs mt-1">{result.technologies.length} technologies detected</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleCopy} className="flex items-center gap-2 px-4 py-2 border border-[#1E1E1E] text-[#888888] hover:border-acid hover:text-acid font-mono text-xs rounded-lg transition-colors duration-200">
            copy results
          </button>
          <button onClick={onReset} className="flex items-center gap-2 px-4 py-2 border border-[#1E1E1E] text-[#888888] hover:border-acid hover:text-acid font-mono text-xs rounded-lg transition-colors duration-200">
            <RefreshCw size={12} /> New scan
          </button>
        </div>
      </div>

      <div className="border border-[#1E1E1E] rounded-lg p-5 bg-[#111111]">
        <div className="flex items-center gap-2 mb-3">
          <FileText size={14} className="text-acid" />
          <span className="text-acid font-mono text-xs font-semibold uppercase tracking-widest">Summary</span>
        </div>
        <p className="text-[#CCCCCC] font-mono text-sm leading-relaxed">{result.summary}</p>
      </div>

      <div className="border border-[#F1A03530] rounded-lg p-5 bg-[#F1A03508]">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb size={14} className="text-[#F1A035]" />
          <span className="text-[#F1A035] font-mono text-xs font-semibold uppercase tracking-widest">Interesting Fact</span>
        </div>
        <p className="text-[#CCCCCC] font-mono text-sm leading-relaxed">{result.interesting_fact}</p>
      </div>

      {Object.entries(grouped).map(([category, techs]) => (
        <div key={category}>
          <h3 className="text-[#555555] font-mono text-xs uppercase tracking-widest mb-3 flex items-center gap-3">
            <span>{category}</span>
            <span className="flex-1 h-px bg-[#1E1E1E]" />
            <span>{techs.length}</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {techs.map((tech, i) => (
              <TechCard key={tech.name} tech={tech} index={i} />
            ))}
          </div>
        </div>
      ))}

      <div className="mt-8">
        <button onClick={() => setShowSignals(!showSignals)} className="text-[#3A3A3A] hover:text-acid font-mono text-xs transition-colors">
          {showSignals ? "▼" : "▶"} raw signals ({signals.length})
        </button>
        {showSignals && (
          <div className="mt-3 border border-[#1E1E1E] rounded-lg p-4 bg-[#0D0D0D]">
            {signals.length === 0 ? (
              <p className="text-[#3A3A3A] font-mono text-xs">no signals detected</p>
            ) : (
              signals.map((s, i) => (
                <div key={i} className="font-mono text-xs text-[#555555] py-0.5">
                  <span className="text-acid mr-2">—</span>{s}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}