"use client";

import React from "react";

import { siteConfig } from "@/../config/site";
import { useScrollDirection } from "@/lib/hooks/useScrollDirection";

import NavLinks from "./navlinks";
import Link from "next/link";
import Logo from "./logo";
import websiteLogo from "@/../public/logo.png";
import {
  DotsSvg,
  GitHubSvg,
  InstagramSvg,
  LinkedinSvg,
  TelegramSvg,
} from "@/lib/assets/svg";
import styles from "../styles/navbar.module.scss";

export default function NavBar() {
  const { scrollDirection, active } = useScrollDirection();

  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const burgerMenuRef = React.useRef<HTMLDivElement>(null);

  const handleOpenBurgerMenu = () => {
    setIsOpen(!isOpen);
  };

  React.useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        isOpen &&
        burgerMenuRef.current &&
        !burgerMenuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  React.useEffect(() => {
    if (scrollDirection === "down") {
      setIsOpen(false);
    }
  }, [scrollDirection]);

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

        <div className={styles.burger_menu} ref={burgerMenuRef}>
          <DotsSvg
            className={isOpen ? `${styles.icon} ${styles.active}` : styles.icon}
            onClick={handleOpenBurgerMenu}
          />

          <div
            onClick={(e) => e.stopPropagation()}
            className={
              isOpen ? `${styles.menu} ${styles.active}` : `${styles.menu}`
            }>
            <div className={styles.label}>Navigation</div>

            <NavLinks />

            <div className={styles.label}>Social media</div>

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
        </div>
      </div>
    </>
  );
}
