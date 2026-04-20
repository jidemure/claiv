import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Claiv — Your Company's Private AI Brain",
  description:
    "Stop searching. Start knowing. Claiv gives your team instant, cited answers from internal documents — powered by secure, permission-aware AI.",
  keywords: [
    "AI knowledge base",
    "enterprise AI",
    "internal knowledge management",
    "RAG",
    "document search",
    "AI copilot",
    "SOC2 compliant AI",
  ],
  openGraph: {
    title: "Claiv — Your Company's Private AI Brain",
    description:
      "Instant answers from your internal docs. Secure, permission-aware, and blazing fast.",
    type: "website",
    url: "https://claiv.ai",
    siteName: "Claiv",
  },
  twitter: {
    card: "summary_large_image",
    title: "Claiv — Your Company's Private AI Brain",
    description:
      "Stop searching. Start knowing. Claiv gives your team instant answers from internal documents.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground`}>
        {children}
      </body>
    </html>
  );
}
