import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nermal",
  description:
    "A fast, native code editor and VS Code alternative, with a built-in terminal, git, remote work over SSH, and agent support.",
};

// The docs render dark only, so this script must not strip `dark` there or the
// page would flash light before Fumadocs' provider hydrates. On every other
// route the site's own `Nermal-theme` preference still applies.
const themeScript = `(function(){try{if(location.pathname.indexOf("/docs")===0)return;var t=localStorage.getItem("Nermal-theme");document.documentElement.classList.toggle("dark",t?t==="dark":true);}catch(e){}})();`;

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
