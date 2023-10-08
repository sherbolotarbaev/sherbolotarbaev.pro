"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { ArrowSvg, GitHubSvg } from "@/assets/svg";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import styles from "@/styles/Header.module.scss";

type LinkType = {
  path: string;
  name: string;
};

export default function Header() {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const handleOpenModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const handleOpenBurgerMenu = () => {
    setIsOpen(!isOpen);
  };

  const burgerMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

  const links: LinkType[] = [
    {
      path: "/contacts",
      name: "Contacts",
    },
    {
      path: "/projects",
      name: "Projects",
    },
  ];

  return (
    <>
      <div className={styles.navbar}>
        <Link href="/" className={styles.logo}>
          Sher
        </Link>

        <div className={styles.links}>
          {links.map((link, i) => (
            <Link
              key={i}
              href={link.path}
              className={
                pathname === link.path
                  ? `${styles.link} ${styles.active}`
                  : styles.link
              }>
              {link.name}
            </Link>
          ))}

          <div className={styles.buttons}>
            <Button load={false} type="button" onClick={handleOpenModal}>
              Resume
            </Button>

            <Button
              load={false}
              type="button"
              style="white"
              redirect={{
                url: "https://github.com/arbaevsherbolot",
                newTab: true,
              }}>
              <GitHubSvg style={{ fill: "#1e1e1d", fontSize: "1.2rem" }} />
              GitHub
            </Button>
          </div>
        </div>

        <div className={styles.burger_menu} ref={burgerMenuRef}>
          <div
            className={
              isOpen ? `${styles.menu_icon} ${styles.active}` : styles.menu_icon
            }>
            <input
              className={
                isOpen
                  ? `${styles.button} ${styles.active}`
                  : `${styles.button}`
              }
              type="button"
              onClick={handleOpenBurgerMenu}
            />
            <div>
              <span></span>
              <span></span>
            </div>
          </div>

          <div
            onClick={(e) => e.stopPropagation()}
            className={
              isOpen ? `${styles.menu} ${styles.active}` : `${styles.menu}`
            }>
            <div className={styles.links}>
              {links.map((link, i) => (
                <Link
                  key={i}
                  href={link.path}
                  onClick={() => setIsOpen(!isOpen)}
                  className={
                    pathname === link.path
                      ? `${styles.link} ${styles.active}`
                      : styles.link
                  }>
                  <ArrowSvg className={styles.icon} />
                  {link.name}
                </Link>
              ))}

              <div className={styles.buttons}>
                <Button load={false} type="button" onClick={handleOpenModal}>
                  Resume
                </Button>

                <Button
                  load={false}
                  type="button"
                  style="white"
                  redirect={{
                    url: "https://github.com/arbaevsherbolot",
                    newTab: true,
                  }}>
                  <GitHubSvg style={{ fill: "#1e1e1d", fontSize: "1.2rem" }} />
                  GitHub
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal open={isOpenModal}>CV in the process of changing...</Modal>
    </>
  );
}
