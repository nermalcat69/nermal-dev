import { Logo } from "@/components/site/logo";
import { ThemeSwitch } from "@/components/site/theme-switch";
import { links } from "@/lib/links";

const primary = [
  { label: "Sessions", href: "#sessions" },
  { label: "Editor", href: "#editor" },
  { label: "Agents", href: "#agents" },
  { label: "Git", href: links.git, external: true },
] as const;

const foot = [
  { label: "GitHub", href: links.repo },
  { label: "Discord", href: links.discord },
] as const;

const linkClass =
  "block shrink-0 rounded-full px-2 py-[5px] text-[13px] whitespace-nowrap text-[var(--rail)] outline-none transition-colors duration-150 hover:text-[var(--rail-strong)] focus-visible:ring-2 focus-visible:ring-[var(--rail-strong)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--shell)] sm:px-3.5";

export function Nav() {
  return (
    <>
      <header className="flex h-12 items-center gap-2 bg-[var(--shell)] px-3 text-[var(--rail-strong)] lg:hidden">
        <a href="#top" className="flex items-center gap-2 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-[var(--rail-strong)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--shell)]">
          <Logo className="h-6 w-10 shrink-0" />
          <span className="text-[15px] font-medium tracking-[-0.02em]">nermal</span>
        </a>
      </header>
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[148px] flex-col bg-[var(--shell)] px-1 pt-3 pb-4 xl:w-[168px] lg:flex">
        <a href="#top" className="flex items-center gap-2 px-2 py-1.5 text-[var(--rail-strong)] sm:px-3">
          <Logo className="h-6 w-10 shrink-0" />
          <span className="text-[15px] font-medium tracking-[-0.02em]">nermal</span>
        </a>
        <nav aria-label="Primary" className="mt-3 flex flex-1 flex-col gap-1">
          {primary.map((item) => (
            <a
              key={item.label}
              href={item.href}
              {...("external" in item ? { target: "_blank", rel: "noreferrer" } : {})}
              className={linkClass}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="mt-auto flex flex-col">
          {foot.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className={linkClass}
            >
              {item.label}
            </a>
          ))}
        </div>
        <ThemeSwitch />
      </aside>
    </>
  );
}
