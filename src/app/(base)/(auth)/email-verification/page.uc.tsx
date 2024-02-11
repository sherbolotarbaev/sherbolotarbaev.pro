"use client";

import React from "react";
import VerificationForm from "@/components/ui/verification-form";
import styles from "@/components/styles/auth.module.scss";

export default function EmailVerificationClient() {
  React.useEffect(() => {
    document.body.classList.add("disabled");

    return () => {
      document.body.classList.remove("disabled");
    };
  }, []);

  return (
    <>
      <div className={styles.content}>
        <VerificationForm />
      </div>
    </>
  );
}
