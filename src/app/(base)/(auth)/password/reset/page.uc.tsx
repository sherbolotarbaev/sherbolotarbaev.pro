"use client";

import ResetForm from "@/app/components/ui/reset-form";
import styles from "@/app/components/styles/auth.module.scss";

export default function ResetClient() {
  return (
    <>
      <div className={styles.content}>
        <ResetForm />
      </div>
    </>
  );
}
