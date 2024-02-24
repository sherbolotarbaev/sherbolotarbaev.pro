import type { Metadata } from "next";

import Link from "next/link";
import styles from "@/app/components/styles/not-found.module.scss";

export const metadata: Metadata = {
  title: "404",
};

const data = {
  title: "Looking for something? 🔍",
  desc: " We couldn't find the page that you're looking for!",
};

export default function NotFound() {
  return (
    <>
      <div className={styles.page_wrapper}>
        <div className={styles.text}>
          <h2 className={styles.title}>{data.title}</h2>

          <p className={styles.desc}>{data.desc}</p>

          <Link href="/" className={styles.link}>
            Head Back
          </Link>
        </div>
      </div>
    </>
  );
}
