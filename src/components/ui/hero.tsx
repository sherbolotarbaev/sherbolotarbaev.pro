"use client";

import Image from "next/image";
import { Prompt } from "next/font/google";
import { motion } from "framer-motion";
import Button from "./button";
import logo from "@/../public/emoji.png";
import text from "@/lib/data/hero.json";
import { ArrowSvg, LinkExternalSvg } from "@/lib/assets/svg";
import styles from "../styles/hero.module.scss";

const heroAnimation = {
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

const titleAnimation = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

const font = Prompt({ subsets: ["latin"], weight: "600" });
const font2 = Prompt({ subsets: ["latin"], weight: "300" });

export default function Hero() {
  return (
    <motion.div
      className={styles.hero}
      variants={heroAnimation}
      initial="hidden"
      animate="visible">
      <div className={styles.content}>
        <div className={styles.text}>
          <motion.div
            className={styles.title}
            variants={titleAnimation}
            initial="hidden"
            style={font.style}
            animate="visible">
            <span>{text.title}</span> 👋
          </motion.div>

          <p className={styles.desc} style={font2.style}>
            {text.description}
          </p>
        </div>

        <div className={styles.logo}>
          <Image
            className={styles.img}
            src={logo}
            alt="Sherbolot Arbaev"
            width={150}
            height={150}
          />
        </div>
      </div>

      <div className={styles.buttons}>
        <Button
          redirect="/contact"
          style="dark"
          adaptive
          animation
          icon={{
            svg: (
              <ArrowSvg
                style={{
                  fontSize: "1.25rem",
                  fill: "#fff",
                  transform: "rotate(-90deg)",
                }}
              />
            ),
            position: "right",
          }}>
          Get In Touch
        </Button>

        <Button
          open="/Sherbolot-Arbaev-CV.pdf"
          adaptive
          animation
          icon={{
            svg: <LinkExternalSvg />,
            position: "right",
          }}>
          Download CV
        </Button>
      </div>
    </motion.div>
  );
}
