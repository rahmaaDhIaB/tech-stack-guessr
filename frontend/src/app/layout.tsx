import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tech Stack Guessr — Detect Any Website's Stack",
  description:
    "Enter any URL and instantly detect the technologies, frameworks, and tools powering that website.",
  openGraph: {
    title: "Tech Stack Guessr",
    description: "Detect any website's tech stack instantly.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
