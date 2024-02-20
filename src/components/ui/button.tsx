"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { LoadSvg } from "../../lib/assets/svg";
import styles from "../styles/button.module.scss";

interface Props {
  children: React.ReactNode;
  style?: keyof Styles;
  icon?: {
    svg: React.ReactElement;
    position: keyof Position;
  };
  disabled?: boolean;
  width?: number;
  type?: keyof Types;
  load?: boolean | string;
  onClick?: () => void;
  redirect?: string;
  open?: string;
  adaptive?: boolean;
  animation?: boolean;
}

type Position = {
  right: string;
  left: string;
};

type Styles = {
  dark: string;
};

type Types = {
  button: string;
  submit: string;
};

export default function Button({
  children,
  style,
  icon,
  disabled,
  width,
  type = "button",
  load = false,
  onClick,
  redirect,
  open,
  adaptive,
  animation,
}: Props) {
  const router = useRouter();

  const redirectToPage = (path: string) => {
    router.push(path);
  };

  const openTab = (path: string) => {
    window.open(path, "_blank");
  };

  const renderButtonContent = () => {
    if (load === true) {
      return <LoadSvg className={styles.load} style={{ fill: "#1e1e1e69" }} />;
    }

    if (typeof load === "string") {
      return (
        <>
          <LoadSvg className={styles.load} style={{ fill: "#1e1e1e69" }} />
          {load}
        </>
      );
    }

    return (
      <>
        {icon &&
          icon.position === "left" &&
          React.cloneElement(icon.svg, {
            className: styles.icon,
          })}
        {children}
        {icon &&
          icon.position === "right" &&
          React.cloneElement(icon.svg, {
            className: styles.icon,
          })}
      </>
    );
  };

  const buttonClassName = [
    style && styles[style],
    disabled && styles.disabled,
    adaptive && styles.adaptive,
    animation && styles.animated,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      disabled={load === true ? true : disabled}
      style={width ? { maxWidth: width } : undefined}
      onClick={
        onClick
          ? onClick
          : () =>
              redirect
                ? redirectToPage(redirect)
                : open
                ? openTab(open)
                : undefined
      }
      className={
        load
          ? `${styles.button_load} ${buttonClassName}`
          : `${styles.button} ${buttonClassName}`
      }>
      {renderButtonContent()}
    </button>
  );
}
