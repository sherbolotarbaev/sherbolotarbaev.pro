"use client";

import LoginForm from "@/app/components/ui/login-form";
import styles from "@/app/components/styles/auth.module.scss";

export default function LoginClient() {
  return (
    <>
      <div className={styles.content}>
        <LoginForm />
      </div>
    </>
  );
}
