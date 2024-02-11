"use client";

import React from "react";

import Link from "next/link";
import { motion } from "framer-motion";
import { useVisible } from "@/lib/hooks/useVisible";

import text from "@/lib/data/experience.json";

import { Prompt } from "next/font/google";
import { LinkSvg, ManchoSvg, WedevxSvg } from "@/lib/assets/svg";
import styles from "../styles/experience.module.scss";

type Job = {
  name: string;
  date: string;
  role: string;
  description: string;
  logo: React.ReactElement;
  url: string;
};

const jobs: Job[] = [
  {
    name: "Mancho Devs",
    date: "2021 - 2023",
    role: "Frontend Developer",
    description:
      "I led the development of a <span>React-based</span> web app from scratch, utilizing <span>Next.js</span>, <span>Redux</span>, <span>SCSS</span>, and <span>TypeScript</span>. My optimizations significantly improved website <span>speed</span> and <span>performance</span> through code enhancements and caching techniques",
    logo: (
      <ManchoSvg
        className={styles.icon}
        style={{
          width: "100%",
          height: "100%",
          maxWidth: "50px",
          maxHeight: "50px",
        }}
      />
    ),
    url: "https://www.mancho.dev/",
  },
  {
    name: "WEDEVX",
    date: "Jun 2023 - Present",
    role: "Software Development Engineer",
    description:
      "Presently, I am honored to be a valuable <span>member</span> of the <span>exceptionally talented</span> team at <span>WEDEVX Ed-Tech</span>. In this role, I harness my skills and extensive experience to engineer groundbreaking solutions that empower the realms of <span> education </span>and<span> technology</span>",
    logo: <WedevxSvg className={styles.icon} />,
    url: "https://www.wedevx.co/",
  },
];

const jobsAnimation = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

const textAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const font = Prompt({ subsets: ["latin"], weight: "600" });
const font2 = Prompt({ subsets: ["latin"], weight: "300" });

export default function Experience() {
  const jobsRef = React.useRef<HTMLDivElement | null>(null);

  const { show } = useVisible({ ref: jobsRef });

  return (
    <>
      <motion.div
        initial="hidden"
        animate={show ? "visible" : "hidden"}
        className={styles.experience}
        variants={textAnimation}
        ref={jobsRef}>
        <div className={styles.text}>
          <h2 className={styles.title} style={font.style}>
            {text.title}
          </h2>
        </div>

        <div className={styles.jobs}>
          {jobs.map((job, idx) => (
            <motion.div
              key={idx}
              className={styles.job}
              variants={jobsAnimation}
              initial="hidden"
              animate={show ? "visible" : "hidden"}
              style={font2.style}
              transition={{ delay: idx * 0.5 }}>
              <div className={styles.head}>
                <div className={styles.container}>
                  {job.logo} <span className={styles.role}>{job.role}</span>
                </div>

                <span className={styles.date}>{job.date}</span>
              </div>

              <div className={styles.text}>
                <p
                  className={styles.desc}
                  dangerouslySetInnerHTML={{ __html: job.description }}
                />
              </div>

              <Link href={job.url} target="_blank" className={styles.link}>
                <LinkSvg className={styles.icon} /> See more about {job.name}
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  );
}
