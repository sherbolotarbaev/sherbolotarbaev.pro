"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Fira_Code } from "next/font/google";
import { useViews } from "@/app/lib/hooks/useViews";

import Logo from "@/app/components/ui/logo";
import Button from "@/app/components/ui/button";

import aiLogo from "@/../public/ai.jpeg";
import { LoadSvg } from "@/app/lib/assets/svg";
import styles from "@/app/components/styles/page.module.scss";

const font = Fira_Code({ subsets: ["latin"] });

const Hero = dynamic(() => import("@/app/components/ui/hero"), {
  ssr: false,
  loading: () => <div className={styles.load} />,
});

const Skills = dynamic(() => import("@/app/components/ui/skills"), {
  ssr: false,
  loading: () => <div className={styles.load} />,
});

const About = dynamic(() => import("@/app/components/ui/about"), {
  ssr: false,
  loading: () => <div className={styles.load} />,
});

const Experience = dynamic(() => import("@/app/components/ui/experience"), {
  ssr: false,
  loading: () => <div className={styles.load} />,
});

const Conversation = dynamic(() => import("@/app/components/ui/conversation"), {
  ssr: false,
  loading: () => <div className={styles.load} />,
});

const Response = dynamic(() => import("@/app/components/ui/response"), {
  ssr: false,
  loading: () => <div className={styles.load} />,
});

export default function HomeClient() {
  const { views, isLoading } = useViews();

  const [show, setShow] = React.useState<boolean>(false);

  return (
    <>
      <div className="space"></div>

      <div className={styles.page_wrapper}>
        <div className={styles.content} style={{ minHeight: "60vh" }}>
          <span className={styles.span} style={font.style}>
            {isLoading ? (
              <LoadSvg
                className={styles.loading}
                style={{ fontSize: "0.875rem", fill: "#00ff8c" }}
              />
            ) : (
              views
            )}
          </span>

          <Hero />
        </div>

        <div className={styles.content} style={{ minHeight: "20vh" }}>
          <Skills />
        </div>

        <div className={styles.content} style={{ minHeight: "40vh" }}>
          <About />
        </div>

        <div className={styles.content} style={{ minHeight: "60vh" }}>
          <Experience />
        </div>

        <div className={styles.content} style={{ minHeight: "auto" }}>
          {!show ? (
            <Button width={160} style="dark" onClick={() => setShow(!show)}>
              <Logo alt="ChatGPT" src={aiLogo} width={30} height={30} />
              Try ChatGPT
            </Button>
          ) : (
            <>
              <Response />

              <Conversation />
            </>
          )}
        </div>
      </div>
    </>
  );
}
