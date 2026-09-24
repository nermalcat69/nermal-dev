import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "nermal",
  description:
    "A terminal workbench with a built-in editor: persistent sessions, remote work, and agent support.",
};

const themeScript = `(function(){try{var t=localStorage.getItem("nermal-theme");document.documentElement.classList.toggle("dark",t?t==="dark":true);}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} dark h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full bg-[var(--shell)]">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {children}
      </body>
    </html>
  );
}
