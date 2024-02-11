"use client";

import ContactForm from "@/components/ui/contact-form";
import StarsCanvas from "@/components/ui/star";
import styles from "@/components/styles/contact.module.scss";

export default function ContactClient() {
  return (
    <>
      <div className={styles.page_wrapper}>
        <div className={styles.content}>
          <ContactForm />

          {/* <StarsCanvas /> */}
        </div>
      </div>
    </>
  );
}
