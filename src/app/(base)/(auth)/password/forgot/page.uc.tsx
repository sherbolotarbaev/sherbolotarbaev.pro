"use client";

import ForgotForm from "@/components/ui/forgot-form";
import styles from "@/components/styles/auth.module.scss";

export default function ForgotClient() {
  return (
    <>
      <div className={styles.content}>
        <ForgotForm />
      </div>
    </>
  );
}
