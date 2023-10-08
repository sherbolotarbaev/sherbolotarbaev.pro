"use client";

import styles from "@/styles/Box.module.scss";

interface Props {
  children: React.ReactNode;
  maxWidth: string;
}

export default function Box({ children, maxWidth }: Props) {
  return (
    <section className={styles.section} style={{ maxWidth }}>
      {children}
    </section>
  );
}
