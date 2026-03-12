"use client";

import { useState, FormEvent } from "react";
import { Search, Loader2 } from "lucide-react";

interface SearchBarProps {
  onSubmit: (url: string) => void;
  loading: boolean;
}

export default function SearchBar({ onSubmit, loading }: SearchBarProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!value.trim() || loading) return;
    onSubmit(value.trim());
  };

  const examples = ["github.com", "vercel.com", "laravel.com", "nextjs.org"];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative group">
        {/* Glow effect */}
        <div className="absolute -inset-0.5 bg-acid opacity-0 group-focus-within:opacity-20 rounded-lg blur transition-opacity duration-300" />

        <div className="relative flex items-center border border-[#1E1E1E] group-focus-within:border-acid bg-[#111111] rounded-lg transition-colors duration-300">
          {/* Prefix */}
          <span className="pl-4 text-[#C8F135] font-mono text-sm select-none">
            https://
          </span>

          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="github.com"
            disabled={loading}
            className="flex-1 bg-transparent py-4 px-2 text-white font-mono text-sm outline-none placeholder-[#3A3A3A] disabled:opacity-50"
            autoFocus
          />

          <button
            type="submit"
            disabled={loading || !value.trim()}
            className="m-1.5 px-5 py-2.5 bg-acid text-black font-mono font-semibold text-sm rounded-md 
                       hover:bg-white transition-colors duration-200 
                       disabled:opacity-30 disabled:cursor-not-allowed
                       flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                <span>Scanning</span>
              </>
            ) : (
              <>
                <Search size={14} />
                <span>Detect</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Example URLs */}
      <div className="mt-3 flex items-center gap-2 flex-wrap">
        <span className="text-[#3A3A3A] text-xs font-mono">try:</span>
        {examples.map((ex) => (
          <button
            key={ex}
            onClick={() => { setValue(ex); onSubmit(ex); }}
            disabled={loading}
            className="text-xs font-mono text-[#555555] hover:text-acid transition-colors duration-200 disabled:pointer-events-none"
          >
            {ex}
          </button>
        ))}
      </div>
    </div>
  );
}
