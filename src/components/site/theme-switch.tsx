"use client";

import { useSyncExternalStore } from "react";

function subscribe(onStoreChange: () => void) {
  window.addEventListener("Nermal-theme", onStoreChange);
  return () => window.removeEventListener("Nermal-theme", onStoreChange);
}

function snapshot() {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function ThemeSwitch() {
  const theme = useSyncExternalStore(subscribe, snapshot, () => "dark");

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("Nermal-theme", next);
    window.dispatchEvent(new Event("Nermal-theme"));
  }

  const label = theme === "dark" ? "Light" : "Dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      suppressHydrationWarning
      className="block w-full rounded-full px-3.5 py-[5px] text-left text-[13px] text-[var(--rail)] outline-none transition-colors duration-150 hover:text-[var(--rail-strong)] focus-visible:ring-2 focus-visible:ring-[var(--rail-strong)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--shell)]"
    >
      {label}
    </button>
  );
}
