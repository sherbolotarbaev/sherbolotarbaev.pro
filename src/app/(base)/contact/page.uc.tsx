"use client";

import ContactForm from "@/app/components/ui/contact-form";
import StarsCanvas from "@/app/components/ui/star";
import styles from "@/app/components/styles/contact.module.scss";

export default function ContactClient() {
  return (
    <>
      <div className="space"></div>

      <div className={styles.page_wrapper}>
        <div className={styles.banner} />

        <div className={styles.content}>
          <ContactForm />
        </div>
      </div>

      <StarsCanvas />
    </>
  );
}
