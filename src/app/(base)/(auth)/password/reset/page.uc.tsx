"use client";

import ResetForm from "@/components/ui/reset-form";
import styles from "@/components/styles/auth.module.scss";

export default function ResetClient() {
  return (
    <>
      <div className={styles.content}>
        <ResetForm />
      </div>
    </>
  );
}
