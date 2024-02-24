"use client";

import React from "react";
import styles from "@/app/components/styles/auth.module.scss";

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  React.useEffect(() => {
    document.body.classList.add("disabled");

    return () => {
      document.body.classList.remove("disabled");
    };
  }, []);

  return (
    <>
      <div className={styles.page_wrapper}>{children}</div>
    </>
  );
}
