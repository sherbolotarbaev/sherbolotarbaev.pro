"use client";

import Link from "next/link";
import {
  DotsSvg,
  GitHubSvg,
  InstagramSvg,
  LinkedinSvg,
  TelegramSvg,
  TwitterSvg,
} from "@/lib/assets/svg";
import styles from "../styles/navbar.module.scss";

type SocialMedia = {
  path: string;
  icon: React.ReactElement;
};

const scoialMedias: SocialMedia[] = [
  {
    path: "/github",
    icon: <GitHubSvg className={styles.icon} />,
  },
  {
    path: "/instagram",
    icon: <InstagramSvg className={styles.icon} />,
  },
  {
    path: "/linkedin",
    icon: <LinkedinSvg className={styles.icon} />,
  },
  {
    path: "/telegram",
    icon: <TelegramSvg className={styles.icon} />,
  },
  {
    path: "/twitter",
    icon: <TwitterSvg className={styles.icon} />,
  },
];

export default function SocialMedia() {
  return (
    <div className={styles.icons}>
      {scoialMedias.map((socialMedia, idx) => (
        <Link key={idx} href={socialMedia.path} target="_blank">
          {socialMedia.icon}
        </Link>
      ))}
    </div>
  );
}
