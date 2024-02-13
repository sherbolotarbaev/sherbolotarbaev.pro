"use client";

import React from "react";
import dynamic from "next/dynamic";
import styles from "../styles/video.module.scss";

const Player = dynamic(() => import("react-player/youtube"), { ssr: false });

interface Props {
  url: string;
}

export default function Video({ url }: Props) {
  return (
    <div className={styles.video_wrapper}>
      <div className={styles.video}>
        <Player
          url={url}
          controls={true}
          width="100%"
          height="100%"
          style={{
            aspectRatio: 16 / 9,
          }}
        />
      </div>
    </div>
  );
}
