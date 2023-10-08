"use client";

import Form from "./_components/Form";
import styles from "@/styles/Contacts.module.scss";

export default function ContactsClient() {
  return (
    <>
      <div className={styles.page_wrapper}>
        <div className={styles.large_title}>Contacts</div>

        <Form />
      </div>
    </>
  );
}
