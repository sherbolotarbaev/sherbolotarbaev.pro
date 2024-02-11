"use client";

import React from "react";
import { Prompt } from "next/font/google";
import dynamic from "next/dynamic";
import { CoffeeSvg } from "@/lib/assets/svg";
import styles from "@/components/styles/blog.module.scss";

interface Props {
  posts: MediumApiResponse[];
}

const font = Prompt({ subsets: ["latin"], weight: "600" });

const Post = dynamic(() => import("@/components/ui/post"), {
  ssr: false,
  loading: () => (
    <div className={`${styles.post} ${styles.load}`}>
      <div className={styles.content}>
        <div className={styles.image_wrapper}></div>

        <div className={styles.text}>
          <div className={styles.categories}>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <h2 className={styles.title}>
            <span></span>
          </h2>

          <p className={styles.desc}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </p>
        </div>
      </div>
    </div>
  ),
});

export default function BlogClient({ posts }: Props) {
  return (
    <>
      <div className="space"></div>

      <div className={styles.page_wrapper}>
        <div className={styles.posts}>
          <h2 className={styles.main_title} style={font.style}>
            <CoffeeSvg
              style={{ fontSize: "1.25rem", fill: "rgb(81, 89, 246)" }}
            />
            Personal Blog
          </h2>
          <div className={styles.posts_wrapper}>
            {posts.map((post, idx) => (
              <Post post={post} key={idx} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
