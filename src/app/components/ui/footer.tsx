"use client";

import styles from "@/app/components/styles/footer.module.scss";

export default function Footer() {
  return (
    <>
      <div className={styles.footer}>
        <span className={styles.text}>
          Built and designed by Sherbolot Arbaev. <br /> All rights reserved. ©
        </span>
      </div>
    </>
  );
}
