"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { ChevronSvg } from "@/app/lib/assets/svg";
import styles from "@/app/components/styles/navbar.module.scss";

interface Props {
  icons?: boolean;
}

type TLink = {
  path: string;
  name: string;
  icon: React.ReactElement;
};

const links: TLink[] = [
  {
    name: "Projects",
    path: "/projects",
    icon: <ChevronSvg />,
  },
  {
    name: "Contact",
    path: "/contact",
    icon: <ChevronSvg />,
  },
  {
    name: "Blog",
    path: "/blog",
    icon: <ChevronSvg />,
  },
];

export default function NavLinks({ icons }: Props) {
  const pathname = usePathname();

  const [hovered, setHovered] = React.useState<number>(-1);

  const handleHover = (idx: number) => setHovered(idx);
  const handleHoverLeave = () => setHovered(-1);

  return links.length > 0 ? (
    <div className={styles.links}>
      {links.map((link, idx) => (
        <Link
          key={idx}
          href={link.path}
          onMouseEnter={() => handleHover(idx)}
          onMouseLeave={() => handleHoverLeave()}
          className={
            pathname === link.path
              ? `${styles.link} ${styles.active}`
              : styles.link
          }>
          {icons &&
            React.cloneElement(link.icon, {
              style: {
                fontSize: "1.15rem",
                fill:
                  pathname === link.path || hovered === idx
                    ? "#3b88e9"
                    : "#fff",
              },
            })}

          {link.name}
        </Link>
      ))}
    </div>
  ) : null;
}
