"use client";

import { type ReactNode, useEffect } from "react";

export function Renderer({ children }: { children: ReactNode }) {
  useEffect(() => {
    const setTheme = (theme: string | null) => {
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    // set initial theme on mount
    setTheme(localStorage.getItem("theme"));

    // listen for theme changes from parent
    function onStorage(e: StorageEvent) {
      if (e.key === "theme") {
        setTheme(e.newValue);
      }
    }

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return children;
}
