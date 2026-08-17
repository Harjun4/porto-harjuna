import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portofolio - Harjuna Adi Putra Wicaksana",
  description: "Portofolio Harjuna Adi Putra Wicaksana - Business Intelligence Analyst, Fullstack Web Engineer, dan AI Workflow Automation Developer.",
  icons: {
    icon: "/image/HRJN Logo.jpg",
    shortcut: "/image/HRJN Logo.jpg",
    apple: "/image/HRJN Logo.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="dark scroll-smooth">
      <body className="bg-[#0b0f19] text-white antialiased">{children}</body>
    </html>
  );
}
