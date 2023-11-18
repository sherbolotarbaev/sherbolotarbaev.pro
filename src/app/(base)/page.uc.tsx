"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Edu_TAS_Beginner, Mukta } from "next/font/google";
import logo from "@/assets/image/emoji.jpeg";
import {
  GitHubSvg,
  InstagramSvg,
  LinkedinSvg,
  TelegramSvg,
} from "@/assets/svg";
import styles from "@/styles/Home.module.scss";

type IconType = {
  name: string;
  icon: React.ReactElement;
  url: string;
};

const font = Mukta({ subsets: ["latin-ext"], weight: "400" });
const font2 = Edu_TAS_Beginner({ subsets: ["latin"] });

export default function HomeClient() {
  const Skills = dynamic(() => import("@/components/UI/Skills"), {
    ssr: false,
    loading: () => <p>Loading...</p>,
  });

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
    <>
      <div className={styles.page_wrapper}>
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
                Software Engineer | Full Stack Developer | Middle Back-End
                Developer at WEDEVX
              </p>

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

            <div className={styles.large_title}>Portfolio</div>
          </div>
        </motion.div>

        <div className={styles.content}>
          <Image
            className={styles.logo}
            src={logo}
            alt="Sherbolot Arbaev - Emoji"
          />

          <h2 className={styles.title} style={font2.style}>
            About Me
          </h2>

          <div className={styles.text} style={font.style}>
            Greetings! I'm <span>Sherbolot</span> (Sher), a
            <span> Full Stack Software Engineer </span>deeply passionate about
            crafting cutting-edge web applications with the latest technologies.
            My intrigue extends to integrating artificial intelligence (AI)
            seamlessly into my projects, adding a layer of innovation to my work
          </div>

          <div className={styles.text} style={font.style}>
            My journey in <span>software development</span> is a thrilling one,
            as I derive immense satisfaction from the development process
            itself. My ultimate goal is to contribute to the creation of
            <span> future technologies </span>that empower and elevate humanity
          </div>

          <div className={styles.text} style={font.style}>
            Presently, I am honored to be a valuable member of the exceptionally
            talented team at <span>WEDEVX</span> Ed-Tech. In this role, I
            harness my skills and extensive experience to engineer
            groundbreaking solutions that empower the realms of
            <span> education </span>and<span> technology</span>
          </div>
        </div>

        <Skills />
      </div>
    </>
  );
}
