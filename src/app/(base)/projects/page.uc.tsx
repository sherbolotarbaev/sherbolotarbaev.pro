"use client";

import Tag from "@/components/UI/Tag";
import Image from "next/image";
import { motion } from "framer-motion";
import { Suspense } from "react";
import type { StaticImageData } from "next/image";
import JarvisGPTProject from "@/assets/image/JARVIS_GPT.png";
import SoftSkillsAIProject from "@/assets/image/SoftSkillsAI.png";
import FamilyGalleryProject from "@/assets/image/FamilyGallery.png";
import ChatGptProject from "@/assets/image/ChatGPT-Telegram-Project.jpg";
import StudentListProject from "@/assets/image/StudentList.png";
import FreeMoviesProject from "@/assets/image/Free Movies.png";
import SkillsListProject from "@/assets/image/SkillsList.png";
import JarvisProject from "@/assets/image/Jarvis.png";
import MaTradeProject from "@/assets/image/MaTrade.png";
import XOGameProject from "@/assets/image/XO-Game.png";
import { GitHubSvg, LinkSvg } from "@/assets/svg";
import styles from "@/styles/Projects.module.scss";

type ProjectType = {
  name: string;
  description: string;
  cover: StaticImageData;
  tags?: string[];
  url_github: string;
  url: string;
};

export default function ProjectsClient() {
  const projects: ProjectType[] = [
    {
      name: "Jarvis GPT",
      description:
        "Jarvis GPT - innovative app enables voice recording and seamless interaction with artificial intelligence",
      cover: JarvisGPTProject,
      tags: [
        "TypeScript",
        "Next.js",
        "React",
        "SCSS",
        "Nest.js",
        "Whisper AI",
        "Open AI",
      ],
      url_github: "https://github.com/arbaevsherbolot/voice-app",
      url: "https://jarvisgpt-v1.vercel.app/",
    },
    {
      name: "Soft Skills AI",
      description:
        "Soft Skill AI – innovative service that allows you to effortlessly upload or record your video content and receive valuable feedback from advanced artificial intelligence",
      cover: SoftSkillsAIProject,
      tags: [
        "TypeScript",
        "Next.js",
        "React",
        "Chakra UI",
        "Nest.js",
        "Supabase",
        "AWS S3",
        "AWS Transcribe",
        "Prisma",
      ],
      url_github: "https://www.wedevx.co/",
      url: "https://www.wedevx.co/",
    },
    {
      name: "Family Gallery",
      description:
        "I created a project exclusively for my family, allowing each family member to upload, save, and view photos. This ensures that we preserve our family history. Additionally, I designed a family tree for future generations, which includes storing photos of our grandparents",
      cover: FamilyGalleryProject,
      tags: [
        "TypeScript",
        "Next.js",
        "React",
        "SCSS",
        "Nest.js",
        "Supabase",
        "Prisma",
      ],
      url_github: "https://github.com/arbaevsherbolot/family-project",
      url: "https://arbaevs.vercel.app",
    },
    {
      name: "ChatGPT - Telegram",
      description:
        "I developed an intelligent bot that assists users by answering questions, providing information, and delivering delightful communication. My project showcased the power of AI in the Telegram community, leaving a lasting impression",
      cover: ChatGptProject,
      tags: [
        "Node.js",
        "Express.js",
        "JavaScript",
        "Telegram Bot API",
        "GPT-3.5",
      ],
      url_github: "https://github.com/arbaevsherbolot/telegram-bot",
      url: "https://github.com/arbaevsherbolot/telegram-bot",
    },
    {
      name: "Free Movies (Kinopoisk, Netflix)",
      description:
        "In this project, I have developed a movie player that allows you to sort movies by genre, rating, and watch them for free.",
      cover: FreeMoviesProject,
      tags: [
        "Node.js",
        "Express.js",
        "JavaScript",
        "React",
        "SCSS",
        "Mongo DB",
      ],
      url_github: "https://github.com/arbaevsherbolot/react-movies",
      url: "https://netflix-sher.vercel.app/",
    },
    {
      name: "Skills List",
      description:
        "This is a skills list with CRUD functionality, allowing you to add, edit, and delete your skills",
      cover: SkillsListProject,
      tags: ["JavaScript", "Node.js", "Express.js", "MySQL", "React", "SCSS"],
      url_github: "https://github.com/arbaevsherbolot/skills-react",
      url: "https://skills-react.netlify.app/",
    },
    {
      name: "Student List",
      description:
        "This project functions as a student directory, where you can locate students and access information about them. You also have the option to sort the data as needed",
      cover: StudentListProject,
      tags: ["JavaScript", "React", "SCSS"],
      url_github: "https://github.com/arbaevsherbolot/StudentsListDEVX",
      url: "https://studentslist-wedevx.netlify.app/",
    },
    {
      name: "Personal Jarvis",
      description:
        "I developed an intelligent bot that assists users by answering questions, providing information, and delivering delightful communication. My project showcased the power of AI in the Telegram community, leaving a lasting impression",
      cover: JarvisProject,
      tags: ["JavaScript", "React", "SCSS"],
      url_github: "https://github.com/arbaevsherbolot/Jarvis",
      url: "https://jarvis-sherbolot.vercel.app/",
    },
    {
      name: "MA - Trade",
      description:
        "I develop the user interface, Web page development, I create UX element interactions, Design and mockups of products for MA - Trade company",
      cover: MaTradeProject,
      tags: ["JavaScript", "HTML", "CSS"],
      url_github: "https://github.com/arbaevsherbolot/M-A-trade-website",
      url: "https://ma-trade.netlify.app/",
    },
    {
      name: "XO - Game",
      description:
        "My first project! Here, I've created a simple tic-tac-toe game",
      cover: XOGameProject,
      tags: ["HTML", "CSS"],
      url_github: "https://github.com/arbaevsherbolot/XO-Game",
      url: "https://devxsherbolot.netlify.app/",
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

  return (
    <div className={styles.page_wrapper}>
      <motion.div
        className={styles.hero}
        variants={heroVariants}
        initial="hidden"
        animate="visible">
        <div className={styles.title}>Projects 🚀</div>

        <div className={styles.large_title}>Projects</div>
      </motion.div>

      <div className={styles.content}>
        <div className={styles.projects}>
          {projects.map((project, idx) => (
            <Suspense fallback={<>Loading...</>} key={idx}>
              <div className={styles.project_container}>
                <div className={styles.icons}>
                  <a
                    className={styles.icon_container}
                    href={project.url_github}
                    target="_blank">
                    <GitHubSvg className={styles.icon} />
                  </a>

                  <a
                    className={styles.icon_container}
                    href={project.url}
                    target="_blank">
                    <LinkSvg className={styles.icon} />
                  </a>
                </div>

                <Image
                  className={styles.cover}
                  src={project.cover}
                  alt={project.name}
                />

                <div className={styles.info}>
                  <div className={styles.text}>
                    <h3 className={styles.title}>{project.name}</h3>

                    <p className={styles.desc}>{project.description}</p>
                  </div>
                  <div className={styles.tags}>
                    {project.tags?.map((tag, idx) => (
                      <Tag key={idx}>{tag}</Tag>
                    ))}
                  </div>
                </div>
              </div>
            </Suspense>
          ))}
        </div>
      </div>
    </div>
  );
}
