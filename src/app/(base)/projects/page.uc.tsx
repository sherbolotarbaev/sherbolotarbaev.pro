"use client";

import styles from "@/app/components/styles/page.module.scss";

export default function ProjectsClient() {
  return (
    <>
      <div className="space"></div>

      <div className={styles.page_wrapper}>
        <div className={styles.content} style={{ minHeight: "60vh" }}>
          <span>New projects coming soon... 🤠</span>
        </div>
      </div>
    </>
  );
}
