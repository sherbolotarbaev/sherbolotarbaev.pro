"use client";

import { useMe } from "@/app/lib/hooks/useMe";
import { LoadSvg } from "@/app/lib/assets/svg";
import styles from "@/app/components/styles/account.module.scss";

export default function Account() {
  const { me, isLoading } = useMe();

  if (isLoading) {
    return <LoadSvg className={styles.load} style={{ fill: "#ffffff56" }} />;
  }

  return me ? (
    <>
      <div className={styles.account}>
        <span>Welcome, {me.firstName}!</span>
      </div>
    </>
  ) : null;
}
