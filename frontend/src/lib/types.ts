export interface Technology {
  name: string;
  category: TechCategory;
  confidence: number;
  reason: string;
}

export type TechCategory =
  | "Frontend"
  | "Backend"
  | "CMS"
  | "Database"
  | "DevOps"
  | "CDN"
  | "Analytics"
  | "CSS Framework"
  | "JS Library"
  | "Hosting";

export interface AnalysisResult {
  technologies: Technology[];
  summary: string;
  interesting_fact: string;
}

export interface ApiResponse {
  success: boolean;
  url: string;
  result: AnalysisResult;
  signals: string[];
  message?: string;
}
