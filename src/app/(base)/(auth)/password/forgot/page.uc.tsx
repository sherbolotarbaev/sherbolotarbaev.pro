"use client";

import ForgotForm from "@/app/components/ui/forgot-form";
import styles from "@/app/components/styles/auth.module.scss";

export default function ForgotClient() {
  return (
    <>
      <div className={styles.content}>
        <ForgotForm />
      </div>
    </>
  );
}
