"use client";

import React from "react";

interface ScrollDirectionHook {
  scrollDirection: string;
  active: boolean;
}

export function useScrollDirection(): ScrollDirectionHook {
  const [scrollDirection, setScrollDirection] = React.useState<string>("");
  const [active, setActive] = React.useState<boolean>(false);

  React.useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY ? "down" : "up";

      if (
        Math.abs(scrollY - lastScrollY) > 5 &&
        direction !== scrollDirection
      ) {
        setScrollDirection(direction);
      }

      lastScrollY = Math.max(scrollY, 0);
    };

    const handleActiveNavbar = () => {
      const scrollY = window.scrollY;
      setActive(scrollY >= 30);
    };

    window.addEventListener("scroll", updateScrollDirection);
    window.addEventListener("scroll", handleActiveNavbar);

    return () => {
      window.removeEventListener("scroll", updateScrollDirection);
      window.removeEventListener("scroll", handleActiveNavbar);
    };
  }, [scrollDirection, active]);

  return { scrollDirection, active };
}
