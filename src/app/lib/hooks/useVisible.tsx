"use client";

import React from "react";

interface Props {
  ref: React.MutableRefObject<HTMLDivElement | null>;
}

interface VisibleHook {
  show: boolean;
}

export function useVisible({ ref }: Props): VisibleHook {
  const [show, setShow] = React.useState<boolean>(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const section = ref.current;

      if (section) {
        const sectionRect = section.getBoundingClientRect();
        const topVisible = sectionRect.top >= 0;
        const bottomVisible = sectionRect.bottom <= window.innerHeight;
        const isVisible = topVisible && bottomVisible;

        if (isVisible) {
          setShow(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [ref]);

  return { show };
}
