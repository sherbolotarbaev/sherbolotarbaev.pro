"use client";

import dynamic from "next/dynamic";
import styles from "@/components/styles/page.module.scss";

const Hero = dynamic(() => import("@/components/ui/hero"), {
  ssr: false,
  loading: () => <div className={styles.load} />,
});

const Skills = dynamic(() => import("@/components/ui/skills"), {
  ssr: false,
  loading: () => <div className={styles.load} />,
});

const About = dynamic(() => import("@/components/ui/about"), {
  ssr: false,
  loading: () => <div className={styles.load} />,
});

const Experience = dynamic(() => import("@/components/ui/experience"), {
  ssr: false,
  loading: () => <div className={styles.load} />,
});

const Video = dynamic(() => import("@/components/ui/video"), {
  ssr: false,
  loading: () => <div className={styles.load} />,
});

export default function HomeClient() {
  return (
    <>
      <div className="space"></div>

      <div className={styles.page_wrapper}>
        <div className={styles.content} style={{ minHeight: "60vh" }}>
          <Hero />
        </div>

        <div className={styles.content} style={{ minHeight: "20vh" }}>
          <Skills />
        </div>

        <div className={styles.content} style={{ minHeight: "40vh" }}>
          <About />
        </div>

        <div className={styles.content} style={{ minHeight: "60vh" }}>
          <Experience />

          <Video url="https://www.youtube.com/embed/TBP1CwQX4sg" />
        </div>
      </div>
    </>
  );
}
