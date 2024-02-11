"use client";

import React from "react";
import Link from "next/link";
import { Prompt } from "next/font/google";
import Image from "next/image";
import styles from "@/components/styles/blog.module.scss";

interface Props {
  post: MediumApiResponse;
}

const font = Prompt({ subsets: ["latin"], weight: "600" });
const font2 = Prompt({ subsets: ["latin"], weight: "300" });

export default function Post({ post }: Props) {
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);
  const [description, setDescription] = React.useState<string | null>(null);

  React.useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(post.description, "text/html");

    const imgElement = doc.querySelector("img");
    const pElement = doc.querySelector("p");

    if (imgElement) {
      setImageUrl(imgElement.src);
    }

    if (pElement) {
      setDescription(pElement.textContent);
    }
  }, [post.description]);

  return (
    <Link className={styles.post} href={post.link} target="_blank">
      <div className={styles.content}>
        {imageUrl && (
          <div className={styles.image_wrapper}>
            <Image
              className={styles.image}
              src={imageUrl}
              alt={`${post.title}`}
              width={750}
              height={350}
            />
          </div>
        )}

        <div className={styles.text}>
          <div className={styles.categories} style={font2.style}>
            {post.categories.length > 0 &&
              post.categories.map((category, idx) => (
                <span key={idx} className={styles.category}>
                  {category}
                </span>
              ))}
          </div>

          <h2 className={styles.title} style={font.style}>
            {post.title}
          </h2>

          {description && (
            <p className={styles.desc} style={font2.style}>
              {description}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}

/* <Link  href={`https://twitter.com/intent/tweet?text=${post.title} by ${post.author} ${post.link}`}>TWEET LINK</Link>; */
