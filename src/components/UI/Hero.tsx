"use client";

import { motion } from "framer-motion";
import Button from "@/components/UI/Button";
import {
  GitHubSvg,
  InstagramSvg,
  LinkedinSvg,
  TelegramSvg,
} from "@/assets/svg";
import styles from "@/styles/Hero.module.scss";

type IconType = {
  name: string;
  icon: React.ReactElement;
  url: string;
};

export default function Hero() {
  const handleOpenCV = () => {
    window?.open(
      `${process.env.NEXT_PUBLIC_FRONTEND_URL}/Sherbolot Arbaev - Resume.pdf`,
      "_target"
    );
  };

  const icons: IconType[] = [
    {
      name: "GitHub",
      icon: <GitHubSvg className={styles.icon} />,
      url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/github`,
    },
    {
      name: "Instagram",
      icon: <InstagramSvg className={styles.icon} />,
      url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/instagram`,
    },
    {
      name: "Linkedin",
      icon: <LinkedinSvg className={styles.icon} />,
      url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/linkedin`,
    },
    {
      name: "Telegram",
      icon: <TelegramSvg className={styles.icon} />,
      url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/telegram`,
    },
  ];

  const heroVariants = {
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

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  const iconVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      className={styles.hero}
      variants={heroVariants}
      initial="hidden"
      animate="visible">
      <div className={styles.hero}>
        <div className={styles.text}>
          <motion.div
            className={styles.title}
            variants={titleVariants}
            initial="hidden"
            animate="visible">
            Hi, I'm <span>Sherbolot</span> 👋🏻 <br /> Let's Create Together
          </motion.div>

          <p className={styles.desc}>
            Software Engineer | Full Stack Developer | Middle Back-End Developer
            at WEDEVX
          </p>

          <div className={styles.buttons_wrapper}>
            <Button
              load={false}
              type="button"
              style="white"
              onClick={handleOpenCV}>
              Download CV
            </Button>

            <Button
              load={false}
              type="button"
              style="item"
              redirect={{ url: "/contacts" }}>
              Contact Me
            </Button>

            <motion.div className={styles.icons}>
              {icons.map((icon, idx) => (
                <motion.a
                  key={idx}
                  href={icon.url}
                  target="_blank"
                  className={styles.icon_container}
                  variants={iconVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: idx * 0.2 }}>
                  {icon.icon}
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>

        <div className={styles.large_title}>Portfolio</div>
      </div>
    </motion.div>
  );
}
