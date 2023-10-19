"use client";

import Image from "next/image";
import Skills from "@/components/UI/Skills";
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
  const icons: IconType[] = [
    {
      name: "GitHub",
      icon: <GitHubSvg className={styles.icon} />,
      url: "https://github.com/arbaevsherbolot",
    },
    {
      name: "Instagram",
      icon: <InstagramSvg className={styles.icon} />,
      url: "https://www.instagram.com/sherbolotarbaev/",
    },
    {
      name: "Linkedin",
      icon: <LinkedinSvg className={styles.icon} />,
      url: "https://www.linkedin.com/in/sherbolotarbaev/",
    },
    {
      name: "Telegram",
      icon: <TelegramSvg className={styles.icon} />,
      url: "https://telegram.me/sherbolotarbaev",
    },
  ];

  return (
    <>
      <div className={styles.page_wrapper}>
        <div className={styles.hero}>
          <div className={styles.text}>
            <div className={styles.title}>
              Hi, my name is <br /> <span>Sherbolot Arbaev</span> 👋🏻
            </div>

            <p className={styles.desc}>
              Software Engineer | Full Stack Developer
            </p>

            <div className={styles.icons}>
              {icons.map((icon, idx) => (
                <a
                  key={idx}
                  href={icon.url}
                  target="_blank"
                  className={styles.icon_container}>
                  {icon.icon}
                </a>
              ))}
            </div>
          </div>

          <div className={styles.large_title}>Portfolio</div>
        </div>

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
