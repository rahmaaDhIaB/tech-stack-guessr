"use client";

import { useEffect, useState } from "react";
import { Technology } from "@/lib/types";
import { categoryConfig, getConfidenceLabel } from "@/lib/categories";

interface TechCardProps {
  tech: Technology;
  index: number;
}

export default function TechCard({ tech, index }: TechCardProps) {
  const [barWidth, setBarWidth] = useState(0);
  const config = categoryConfig[tech.category] || categoryConfig["Frontend"];

  useEffect(() => {
    // Animate bar on mount with staggered delay
    const timer = setTimeout(() => {
      setBarWidth(tech.confidence);
    }, index * 100 + 200);
    return () => clearTimeout(timer);
  }, [tech.confidence, index]);

  return (
    <div
      className="border rounded-lg p-4 transition-all duration-300 hover:translate-y-[-2px]"
      style={{
        borderColor: config.border,
        backgroundColor: config.bg,
        animationDelay: `${index * 80}ms`,
      }}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div>
          <h3 className="font-display font-bold text-white text-base leading-tight">
            {tech.name}
          </h3>
          <span
            className="text-xs font-mono mt-0.5 inline-block"
            style={{ color: config.color }}
          >
            {tech.category}
          </span>
        </div>

        {/* Confidence badge */}
        <div
          className="shrink-0 text-xs font-mono font-semibold px-2 py-1 rounded"
          style={{ color: config.color, backgroundColor: config.bg, border: `1px solid ${config.border}` }}
        >
          {getConfidenceLabel(tech.confidence)}
        </div>
      </div>

      {/* Reason */}
      <p className="text-[#888888] text-xs font-mono leading-relaxed mb-3">
        {tech.reason}
      </p>

      {/* Confidence bar */}
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <span className="text-[#555555] text-xs font-mono">confidence</span>
          <span className="text-xs font-mono" style={{ color: config.color }}>
            {tech.confidence}%
          </span>
        </div>
        <div className="h-1 bg-[#1E1E1E] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full confidence-bar"
            style={{
              width: `${barWidth}%`,
              backgroundColor: config.color,
            }}
          />
        </div>
      </div>
    </div>
  );
}
