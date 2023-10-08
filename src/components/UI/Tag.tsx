"use client";

import styles from "@/styles/Tag.module.scss";

interface Props {
  children: React.ReactNode;
}

export default function Tag({ children }: Props) {
  return (
    <>
      <div className={styles.tag}>{children}</div>
    </>
  );
}
