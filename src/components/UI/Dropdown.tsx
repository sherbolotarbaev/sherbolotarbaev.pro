"use client";

import { ArrowSvg } from "@/assets/svg";
import styles from "@/styles/Dropdown.module.scss";

type ListItem = {
  name: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
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
                <div
                  key={idx}
                  className={styles.item}
                  onClick={(event) => item.onClick && item.onClick(event)}>
                  {item.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
