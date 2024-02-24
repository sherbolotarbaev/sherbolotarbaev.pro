"use client";

import React from "react";
import { Prompt } from "next/font/google";
import { useVisible } from "@/app/lib/hooks/useVisible";
import { motion } from "framer-motion";
import text from "@/app/lib/data/about.json";
import styles from "@/app/components/styles/about.module.scss";

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

export default function About() {
  const aboutRef = React.useRef<HTMLDivElement | null>(null);

  const { show } = useVisible({ ref: aboutRef });

  return (
    <>
      <motion.div
        className={styles.about}
        ref={aboutRef}
        initial="hidden"
        animate={show ? "visible" : "hidden"}
        variants={textAnimation}>
        <div className={styles.text}>
          <h2 className={styles.title} style={font.style}>
            <span>{text.title}</span>
          </h2>

          {text.descriptions.map((desc, idx) => (
            <motion.p
              key={idx}
              className={styles.desc}
              style={font2.style}
              variants={textAnimation}
              dangerouslySetInnerHTML={{ __html: desc }}
            />
          ))}
        </div>
      </motion.div>
    </>
  );
}
