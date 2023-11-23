"use client";

import Image from "next/image";
import { Edu_TAS_Beginner } from "next/font/google";
import logo from "@/assets/image/photo-sher.jpeg";
import styles from "@/styles/About.module.scss";

const font = Edu_TAS_Beginner({ subsets: ["latin"] });

export default function About() {
  return (
    <div className={styles.about} id="about">
      <Image
        className={styles.logo}
        src={logo}
        alt="Sherbolot Arbaev - Emoji"
      />

      <div className={styles.text_wrapper}>
        <h2 className={styles.title}>Here's my story.</h2>

        <div className={styles.text} style={font.style}>
          Greetings! I'm <span>Sherbolot</span> (Sher), a
          <span> Full Stack Software Engineer </span>deeply passionate about
          crafting cutting-edge web applications with the latest technologies.
          My intrigue extends to integrating artificial intelligence (AI)
          seamlessly into my projects, adding a layer of innovation to my work
        </div>

        <div className={styles.text} style={font.style}>
          My journey in <span>software development</span> is a thrilling one, as
          I derive immense satisfaction from the development process itself. My
          ultimate goal is to contribute to the creation of
          <span> future technologies </span>that empower and elevate humanity
        </div>

        <div className={styles.text} style={font.style}>
          Presently, I am honored to be a valuable member of the exceptionally
          talented team at <span>WEDEVX</span> Ed-Tech. In this role, I harness
          my skills and extensive experience to engineer groundbreaking
          solutions that empower the realms of
          <span> education </span>and<span> technology</span>
        </div>
      </div>
    </div>
  );
}
