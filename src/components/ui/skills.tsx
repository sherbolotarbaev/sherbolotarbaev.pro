"use client";

import React from "react";
import { Fira_Code, Prompt } from "next/font/google";
import { useVisible } from "@/lib/hooks/useVisible";
import { motion } from "framer-motion";
import text from "@/lib/data/skills.json";
import {
  AwsSvg,
  ChakraUISvg,
  CodeSvg,
  DockerSvg,
  ExpressSvg,
  FastifySvg,
  FramerMotionSvg,
  GitSvg,
  JavaScriptSvg,
  MaterialUISvg,
  MongoDBSvg,
  MySQLSvg,
  NestJsSvg,
  NextJsSvg,
  NodeJsSvg,
  PostgreSQLSvg,
  PrismaSvg,
  ReactSvg,
  ReduxSvg,
  SassSvg,
  SupabaseSvg,
  TailwindSvg,
  ThreeJsSvg,
  TypeScriptSvg,
} from "../../lib/assets/svg";
import styles from "../styles/skills.module.scss";

type Skill = {
  name: string;
  icon: React.ReactElement;
};

const skills: Skill[] = [
  {
    name: "JavaScript",
    icon: <JavaScriptSvg className={styles.icon} />,
  },
  {
    name: "TypeScript",
    icon: <TypeScriptSvg className={styles.icon} />,
  },
  {
    name: "Node.js",
    icon: <NodeJsSvg className={styles.icon} />,
  },
  {
    name: "Express.js",
    icon: <ExpressSvg className={styles.icon} />,
  },
  {
    name: "Fastify.js",
    icon: <FastifySvg className={styles.icon} />,
  },
  {
    name: "Nest.js",
    icon: <NestJsSvg className={styles.icon} />,
  },
  {
    name: "Next.js",
    icon: <NextJsSvg className={styles.icon} />,
  },
  {
    name: "React",
    icon: <ReactSvg className={styles.icon} />,
  },
  {
    name: "Redux",
    icon: <ReduxSvg className={styles.icon} />,
  },
  {
    name: "Three.js",
    icon: <ThreeJsSvg className={styles.icon} />,
  },
  {
    name: "Sass",
    icon: <SassSvg className={styles.icon} />,
  },
  {
    name: "Tailwind",
    icon: <TailwindSvg className={styles.icon} />,
  },
  {
    name: "Chakra UI",
    icon: <ChakraUISvg className={styles.icon} />,
  },
  {
    name: "Material UI",
    icon: <MaterialUISvg className={styles.icon} />,
  },
  {
    name: "Framer Motion",
    icon: <FramerMotionSvg className={styles.icon} />,
  },
  {
    name: "Prisma",
    icon: <PrismaSvg className={styles.icon} />,
  },
  {
    name: "PostgreSQL",
    icon: <PostgreSQLSvg className={styles.icon} />,
  },
  {
    name: "MySQL",
    icon: <MySQLSvg className={styles.icon} />,
  },
  {
    name: "Mongo DB",
    icon: <MongoDBSvg className={styles.icon} />,
  },
  {
    name: "Git",
    icon: <GitSvg className={styles.icon} />,
  },
  {
    name: "Docker",
    icon: <DockerSvg className={styles.icon} />,
  },
  {
    name: "AWS",
    icon: <AwsSvg className={styles.icon} />,
  },
  {
    name: "Supabase",
    icon: <SupabaseSvg className={styles.icon} />,
  },
];

const iconsAnimation = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

const skillsAnimation = {
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
const font2 = Fira_Code({ subsets: ["latin"] });

export default function Skills() {
  const skillsRef = React.useRef<HTMLDivElement | null>(null);

  const { show } = useVisible({ ref: skillsRef });

  return (
    <>
      <motion.div
        className={styles.skills}
        ref={skillsRef}
        animate={show ? "visible" : "hidden"}
        variants={skillsAnimation}>
        <h2 className={styles.title} style={font.style}>
          <CodeSvg /> {text.title}
        </h2>

        <div className={styles.icons}>
          {skills.map((skill, idx) => (
            <motion.div
              key={idx}
              className={styles.icon_wrapper}
              variants={iconsAnimation}
              initial="hidden"
              animate={show ? "visible" : "hidden"}
              transition={{ delay: idx * 0.1 }}>
              {skill.icon}

              <span className={styles.name} style={font2.style}>
                {skill.name}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  );
}
