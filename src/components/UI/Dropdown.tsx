"use client";

import Link from "next/link";
import { ArrowSvg } from "@/assets/svg";
import styles from "@/styles/Dropdown.module.scss";

type ListItem = {
  name: string;
  path: string;
};

interface Props {
  menuList: ListItem[];
  title: string;
}

export default function Dropdown({ menuList, title }: Props) {
  return (
    <>
      <div className={styles.dropdown_wrapper}>
        <h2 className={styles.title}>
          {title} <ArrowSvg className={styles.icon} />
        </h2>

        <div className={styles.dropdown}>
          <div className={styles.menu}>
            <div className={styles.list}>
              {menuList.map((item, idx) => (
                <Link key={idx} className={styles.item} href={item.path}>
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
