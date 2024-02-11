"use client";

import React from "react";

import { siteConfig } from "@/../config/site";
import { useScrollDirection } from "@/lib/hooks/useScrollDirection";

import NavLinks from "./navlinks";
import Link from "next/link";
import Logo from "./logo";
import websiteLogo from "@/../public/logo.png";
import {
  GitHubSvg,
  InstagramSvg,
  LinkedinSvg,
  TelegramSvg,
} from "@/lib/assets/svg";
import styles from "../styles/navbar.module.scss";

export default function NavBar() {
  const { scrollDirection, active } = useScrollDirection();

  return (
    <>
      <div
        className={`${active ? styles.navbar_active : styles.navbar} ${
          styles[scrollDirection]
        }`}>
        <div className={styles.content}>
          <Logo
            src={websiteLogo}
            alt={`${siteConfig.name} - Website logo`}
            name={siteConfig.name}
          />

          <NavLinks />
        </div>

        <div className={styles.icons}>
          <Link href="/github" target="_blank">
            <GitHubSvg className={styles.icon} />
          </Link>

          <Link href="/instagram" target="_blank">
            <InstagramSvg className={styles.icon} />
          </Link>

          <Link href="/linkedin" target="_blank">
            <LinkedinSvg className={styles.icon} />
          </Link>

          <Link href="/telegram" target="_blank">
            <TelegramSvg className={styles.icon} />
          </Link>
        </div>
      </div>
    </>
  );
}
