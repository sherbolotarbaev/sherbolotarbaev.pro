"use client";

import Button from "./Button";
import Tag from "./Tag";
import styles from "@/styles/Skills.module.scss";

type SkillType = {
  name: string;
};

export default function Skills() {
  const skills: SkillType[] = [
    {
      name: "JavaScript",
    },
    {
      name: "TypeScript",
    },
    {
      name: "Node.js",
    },
    {
      name: "Nest.js",
    },
    {
      name: "Express",
    },
    {
      name: "Fastify",
    },
    {
      name: "SQL",
    },
    {
      name: "NoSQL",
    },
    {
      name: "MySQL",
    },
    {
      name: "PostgreSQL",
    },
    {
      name: "MongoDB",
    },
    {
      name: "Supabase",
    },
    {
      name: "Prisma ORM",
    },
    {
      name: "TypeORM",
    },
    {
      name: "Git",
    },
    {
      name: "Docker",
    },
    {
      name: "React",
    },
    {
      name: "Next.js",
    },
    {
      name: "Redux",
    },
    {
      name: "HTML",
    },
    {
      name: "CSS",
    },
    {
      name: "Sass",
    },
    {
      name: "Tailwind CSS",
    },
    {
      name: "Material UI",
    },
    {
      name: "Chakra UI",
    },
    {
      name: "AWS",
    },
    {
      name: "Vercel",
    },
    {
      name: "Netlify",
    },
    {
      name: "Heroku",
    },
  ];

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>My Skills:</div>

        <div className={styles.skills}>
          {skills.map((skill, idx) => (
            <Tag key={idx}>{skill.name}</Tag>
          ))}
        </div>

        <div className={styles.button_wrapper}>
          <Button
            load={false}
            type="button"
            style="white"
            redirect={{ url: "/contacts" }}>
            Contact Me
          </Button>
        </div>
      </div>
    </>
  );
}
