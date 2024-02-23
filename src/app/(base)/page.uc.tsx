"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Fira_Code } from "next/font/google";
import { useViews } from "@/lib/hooks/useViews";

import Logo from "@/components/ui/logo";
import Button from "@/components/ui/button";

import aiLogo from "@/../public/ai.jpeg";
import { LoadSvg } from "@/lib/assets/svg";
import styles from "@/components/styles/page.module.scss";

const font = Fira_Code({ subsets: ["latin"] });

const Hero = dynamic(() => import("@/components/ui/hero"), {
  ssr: false,
  loading: () => <div className={styles.load} />,
});

const Skills = dynamic(() => import("@/components/ui/skills"), {
  ssr: false,
  loading: () => <div className={styles.load} />,
});

const About = dynamic(() => import("@/components/ui/about"), {
  ssr: false,
  loading: () => <div className={styles.load} />,
});

const Experience = dynamic(() => import("@/components/ui/experience"), {
  ssr: false,
  loading: () => <div className={styles.load} />,
});

const Conversation = dynamic(() => import("@/components/ui/conversation"), {
  ssr: false,
  loading: () => <div className={styles.load} />,
});

const Response = dynamic(() => import("@/components/ui/response"), {
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
