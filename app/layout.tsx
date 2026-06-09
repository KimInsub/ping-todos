import type { Metadata } from "next";
import { JetBrains_Mono, Silkscreen } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const silkscreen = Silkscreen({
  variable: "--font-pixel",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ping-todos",
  description: "AI-powered task management with Claude Code",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${silkscreen.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-mono">
        {children}
      </body>
    </html>
  );
}
