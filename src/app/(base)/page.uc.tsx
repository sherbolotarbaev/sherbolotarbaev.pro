"use client";

import dynamic from "next/dynamic";
import Hero from "@/components/UI/Hero";
import styles from "@/styles/Home.module.scss";

const About = dynamic(() => import("@/components/UI/About"), {
  ssr: false,
  loading: () => <span className={styles.span}>Loading...</span>,
});

const Skills = dynamic(() => import("@/components/UI/Skills"), {
  ssr: false,
  loading: () => <span className={styles.span}>Loading...</span>,
});

export default function HomeClient() {
  return (
    <>
      <div className={styles.page_wrapper}>
        <Hero />

        <About />

        <Skills />
      </div>
    </>
  );
}
