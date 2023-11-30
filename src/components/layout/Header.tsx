"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import * as API from "@/../api";
import { ArrowSvg, GitHubSvg, UserSvg } from "@/assets/svg";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import Dropdown from "../UI/Dropdown";
import Image from "next/image";
import logo from "@/assets/image/logo.png";
import cv from "@/assets/image/Sherbolot Arbaev - Resume.png";
import styles from "@/styles/Header.module.scss";

type LinkType = {
  path: string;
  name: string;
};

type ListItem = {
  name: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
};

export default function Header() {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const [followers, setFollowers] = useState<number>(0);

  const handleOpenModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const getFollowers = async () => {
    const data = await API.github.getMe();
    setFollowers(data.followers);
  };

  const handleOpenCV = () => {
    window?.open(
      `${process.env.NEXT_PUBLIC_FRONTEND_URL}/Sherbolot Arbaev - Resume.pdf`,
      "_target"
    );
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

  useEffect(() => {
    getFollowers();
  }, []);

  const links: LinkType[] = [
    {
      path: "/#about",
      name: "About",
    },
    {
      path: "/#skills",
      name: "Skills",
    },
    {
      path: "/contacts",
      name: "Contacts",
    },
    {
      path: "/projects",
      name: "Projects",
    },
  ];

  const menuList: ListItem[] = [
    {
      name: "Quick View",
      onClick: handleOpenModal,
    },
    {
      name: "Download",
      onClick: handleOpenCV,
    },
  ];

  return (
    <>
      <div className={styles.navbar}>
        <Link href="/" className={styles.logo}>
          <Image
            src={logo}
            alt="Sherbolot Arbaev - Logo"
            width={35}
            height={35}
          />

          <span>Sherbolot Arbaev</span>
        </Link>

        <div className={styles.links}>
          {links.map((link, idx) => (
            <Link
              key={idx}
              href={link.path}
              className={
                pathname === link.path
                  ? `${styles.link} ${styles.active}`
                  : styles.link
              }>
              {link.name}
            </Link>
          ))}

          <Dropdown menuList={menuList} title="Resume" />

          <div className={styles.buttons}>
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

            <span>
              <UserSvg
                style={{ fill: "rgb(191 199 210 / 0.8)", fontSize: "1.1rem" }}
              />

              {followers}
            </span>
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
                <Button
                  load={false}
                  type="button"
                  style="item"
                  onClick={handleOpenModal}>
                  Quick View CV
                </Button>

                <Button
                  load={false}
                  style="item"
                  type="button"
                  onClick={handleOpenCV}>
                  Download CV
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

      <Modal open={isOpenModal} title="Sherbolot Arbaev - Resume">
        <Image
          src={cv}
          alt="Sherbolot Arbaev - Resume"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          width={700}
          height={850}
        />
      </Modal>
    </>
  );
}
