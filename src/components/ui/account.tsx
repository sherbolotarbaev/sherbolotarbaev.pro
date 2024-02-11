"use client";

import { useMe } from "@/lib/hooks/useMe";
import { LoadSvg } from "@/lib/assets/svg";
import styles from "../styles/account.module.scss";

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
