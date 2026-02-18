"use client";

import { useEffect, useState } from "react";

const SECTION_IDS = ["services", "projects", "contact"] as const;

export function useScrollSpy() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;
      let current: string | null = null;

      for (const id of SECTION_IDS) {
        const element = document.getElementById(id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            current = id;
            break;
          }
          if (scrollPosition < offsetTop) {
            break;
          }
          current = id;
        }
      }

      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return activeSection;
}
