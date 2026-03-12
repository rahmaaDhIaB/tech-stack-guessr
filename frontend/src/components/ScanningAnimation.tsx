"use client";

import { useEffect, useState } from "react";

const STEPS = [
  "Connecting to target...",
  "Reading HTTP headers...",
  "Parsing HTML structure...",
  "Fingerprinting scripts & styles...",
  "Detecting framework signatures...",
  "Consulting AI brain...",
  "Calculating confidence scores...",
  "Building report...",
];

export default function ScanningAnimation({ url }: { url: string }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [dots, setDots] = useState("");

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev < STEPS.length - 1 ? prev + 1 : prev));
    }, 600);

    const dotInterval = setInterval(() => {
      setDots((d) => (d.length >= 3 ? "" : d + "."));
    }, 400);

    return () => {
      clearInterval(stepInterval);
      clearInterval(dotInterval);
    };
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto mt-12">
      {/* Terminal window */}
      <div className="border border-[#1E1E1E] rounded-lg overflow-hidden">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-[#111111] border-b border-[#1E1E1E]">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
          <span className="ml-3 text-[#3A3A3A] text-xs font-mono">
            tech-stack-guessr — scan
          </span>
        </div>

        {/* Terminal body */}
        <div className="p-6 bg-[#0D0D0D] min-h-[200px]">
          <div className="text-[#3A3A3A] text-xs font-mono mb-4">
            $ guessr scan {url}
          </div>

          <div className="space-y-2">
            {STEPS.slice(0, currentStep + 1).map((step, i) => (
              <div key={i} className="flex items-center gap-3 font-mono text-sm">
                {i < currentStep ? (
                  <>
                    <span className="text-acid">✓</span>
                    <span className="text-[#555555]">{step}</span>
                  </>
                ) : (
                  <>
                    {/* Spinning indicator */}
                    <span className="text-acid animate-spin inline-block">◌</span>
                    <span className="text-white">
                      {step}
                      <span className="text-acid">{dots}</span>
                    </span>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-4 h-px bg-[#1E1E1E] rounded-full overflow-hidden">
        <div
          className="h-full bg-acid transition-all duration-500 ease-out"
          style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
        />
      </div>
    </div>
  );
}
