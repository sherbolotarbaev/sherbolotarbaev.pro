"use client";

import React from "react";
import dynamic from "next/dynamic";

const Player = dynamic(() => import("react-player/youtube"), { ssr: false });

interface Props {
  url: string;
}

export default function Video({ url }: Props) {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        maxWidth: "865px",
        maxHeight: "485px",
        margin: "0 0.55rem",
      }}>
      <Player
        url={url}
        controls={true}
        width="100%"
        height="100%"
        style={{ overflow: "hidden" }}
        config={{
          playerVars: { showinfo: 1 },
        }}
      />
    </div>
  );
}
