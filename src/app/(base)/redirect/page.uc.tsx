"use client";

import React from "react";
import { LoadSvg } from "@/app/lib/assets/svg";
import styles from "@/app/components/styles/redirect.module.scss";

export default function RedirectClient() {
  React.useEffect(() => {
    window?.location?.assign(
      decodeURIComponent(window?.location?.href?.split("to=")?.[1] || "/")
    );
  }, []);

  return (
    <>
      <div className={styles.page_wrapper}>
        <div className={styles.box}>
          <LoadSvg className={styles.load} />

          <h2 className={styles.title}>Redirecting...</h2>
        </div>
      </div>
    </>
  );
}
