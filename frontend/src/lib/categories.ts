import { TechCategory } from "./types";

export const categoryConfig: Record<
  TechCategory,
  { color: string; bg: string; border: string }
> = {
  Frontend:        { color: "#C8F135", bg: "#C8F13510", border: "#C8F13540" },
  Backend:         { color: "#F1A035", bg: "#F1A03510", border: "#F1A03540" },
  CMS:             { color: "#35C8F1", bg: "#35C8F110", border: "#35C8F140" },
  Database:        { color: "#F13560", bg: "#F1356010", border: "#F1356040" },
  DevOps:          { color: "#A035F1", bg: "#A035F110", border: "#A035F140" },
  CDN:             { color: "#35F1A0", bg: "#35F1A010", border: "#35F1A040" },
  Analytics:       { color: "#F18835", bg: "#F1883510", border: "#F1883540" },
  "CSS Framework": { color: "#35A0F1", bg: "#35A0F110", border: "#35A0F140" },
  "JS Library":    { color: "#F1D435", bg: "#F1D43510", border: "#F1D43540" },
  Hosting:         { color: "#D435F1", bg: "#D435F110", border: "#D435F140" },
};

export function getConfidenceLabel(confidence: number): string {
  if (confidence >= 90) return "Certain";
  if (confidence >= 70) return "Likely";
  if (confidence >= 50) return "Possible";
  return "Uncertain";
}
