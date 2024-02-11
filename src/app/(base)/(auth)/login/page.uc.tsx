"use client";

import LoginForm from "@/components/ui/login-form";
import styles from "@/components/styles/auth.module.scss";

export default function LoginClient() {
  return (
    <>
      <div className={styles.content}>
        <LoginForm />
      </div>
    </>
  );
}
