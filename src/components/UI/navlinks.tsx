"use client";

import { usePathname } from "next/navigation";

import Link from "next/link";
import styles from "../styles/navbar.module.scss";

type TLink = {
  path: string;
  name: string;
};

const links: TLink[] = [
  {
    name: "Projects",
    path: "/projects",
  },
  {
    name: "Contact",
    path: "/contact",
  },
  {
    name: "Blog",
    path: "/blog",
  },
];

export default function NavLinks() {
  const pathname = usePathname();

  return links.length > 0 ? (
    <div className={styles.links}>
      {links.map((link, idx) => (
        <Link
          key={idx}
          href={link.path}
          className={
            pathname === link.path
              ? `${styles.link} ${styles.active}`
              : styles.link
          }>
          {link.name}
        </Link>
      ))}
    </div>
  ) : null;
}
