"use client";

import Tag from "./Tag";
import {
  AwsSvg,
  ChakrauiSvg,
  CssSvg,
  DockerSvg,
  FastifySvg,
  FramerMotionSvg,
  GitSvg,
  HerokuSvg,
  HtmlSvg,
  JavascriptSvg,
  MaterialuiSvg,
  MongodbSvg,
  MysqlSvg,
  NestjsSvg,
  NetlifySvg,
  NextjsSvg,
  NodejsSvg,
  PostgresqlSvg,
  PrismaSvg,
  ReactSvg,
  ReduxSvg,
  SassSvg,
  SupabaseSvg,
  TailwindSvg,
  ThreeJSSvg,
  TypescriptSvg,
  VercelSvg,
} from "@/assets/svg";
import styles from "@/styles/Skills.module.scss";

type SkillType = {
  name: string;
  icon: React.ReactElement;
};

export default function Skills() {
  const skills: SkillType[] = [
    {
      name: "JavaScript",
      icon: <JavascriptSvg className={styles.icon} />,
    },
    {
      name: "TypeScript",
      icon: <TypescriptSvg className={styles.icon} />,
    },
    {
      name: "Node.js",
      icon: (
        <NodejsSvg className={styles.icon} style={{ background: "white" }} />
      ),
    },
    {
      name: "Nest.js",
      icon: <NestjsSvg className={styles.icon} />,
    },
    {
      name: "Express",
      icon: <JavascriptSvg className={styles.icon} />,
    },
    {
      name: "Fastify",
      icon: (
        <FastifySvg className={styles.icon} style={{ background: "white" }} />
      ),
    },
    {
      name: "MySQL",
      icon: (
        <MysqlSvg className={styles.icon} style={{ background: "white" }} />
      ),
    },
    {
      name: "PostgreSQL",
      icon: <PostgresqlSvg className={styles.icon} />,
    },
    {
      name: "MongoDB",
      icon: <MongodbSvg className={styles.icon} />,
    },
    {
      name: "Supabase",
      icon: <SupabaseSvg className={styles.icon} />,
    },
    {
      name: "Prisma ORM",
      icon: <PrismaSvg className={styles.icon} />,
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
      name: "React",
      icon: <ReactSvg className={styles.icon} />,
    },
    {
      name: "Next.js",
      icon: (
        <NextjsSvg className={styles.icon} style={{ background: "white" }} />
      ),
    },
    {
      name: "Redux",
      icon: <ReduxSvg className={styles.icon} />,
    },
    {
      name: "HTML",
      icon: <HtmlSvg className={styles.icon} />,
    },
    {
      name: "CSS",
      icon: <CssSvg className={styles.icon} />,
    },
    {
      name: "Sass",
      icon: <SassSvg className={styles.icon} />,
    },
    {
      name: "Tailwind CSS",
      icon: <TailwindSvg className={styles.icon} />,
    },
    {
      name: "Material UI",
      icon: <MaterialuiSvg className={styles.icon} />,
    },
    {
      name: "Chakra UI",
      icon: (
        <ChakrauiSvg className={styles.icon} style={{ background: "white" }} />
      ),
    },
    {
      name: "AWS",
      icon: <AwsSvg className={styles.icon} style={{ background: "white" }} />,
    },
    {
      name: "Vercel",
      icon: (
        <VercelSvg className={styles.icon} style={{ background: "white" }} />
      ),
    },
    {
      name: "Netlify",
      icon: <NetlifySvg className={styles.icon} />,
    },
    {
      name: "Heroku",
      icon: <HerokuSvg className={styles.icon} />,
    },
    {
      name: "Framer Motion",
      icon: <FramerMotionSvg />,
    },
    {
      name: "Three.js",
      icon: <ThreeJSSvg />,
    },
  ];

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>Tech Skills:</div>

        <div className={styles.skills}>
          {skills.map((skill, idx) => (
            <Tag key={idx}>
              {skill.icon} {skill.name}
            </Tag>
          ))}
        </div>
      </div>
    </>
  );
}
