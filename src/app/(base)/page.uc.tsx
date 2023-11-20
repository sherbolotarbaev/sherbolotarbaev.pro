"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Edu_TAS_Beginner } from "next/font/google";
import Button from "@/components/UI/Button";
import logo from "@/assets/image/photo-sher.jpeg";
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

const font = Edu_TAS_Beginner({ subsets: ["latin"] });

export default function HomeClient() {
  const handleOpenCV = () => {
    window?.open(
      `${process.env.NEXT_PUBLIC_FRONTEND_URL}/Sherbolot Arbaev - Resume.pdf`,
      "_target"
    );
  };

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

        <div className={styles.content}>
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
              crafting cutting-edge web applications with the latest
              technologies. My intrigue extends to integrating artificial
              intelligence (AI) seamlessly into my projects, adding a layer of
              innovation to my work
            </div>

            <div className={styles.text} style={font.style}>
              My journey in <span>software development</span> is a thrilling
              one, as I derive immense satisfaction from the development process
              itself. My ultimate goal is to contribute to the creation of
              <span> future technologies </span>that empower and elevate
              humanity
            </div>

            <div className={styles.text} style={font.style}>
              Presently, I am honored to be a valuable member of the
              exceptionally talented team at <span>WEDEVX</span> Ed-Tech. In
              this role, I harness my skills and extensive experience to
              engineer groundbreaking solutions that empower the realms of
              <span> education </span>and<span> technology</span>
            </div>
          </div>
        </div>

        <Skills />
      </div>
    </>
  );
}
