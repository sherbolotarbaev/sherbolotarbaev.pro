"use client";

import React from "react";

import { useRouter } from "next/navigation";
import { LoadSvg } from "@/app/lib/assets/svg";

import styles from "@/app/components/styles/button.module.scss";

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
  redirect?: string | URL;
  open?: string | URL;
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
  disabled = false,
  width,
  type = "button",
  load = false,
  onClick,
  redirect,
  open,
  adaptive = false,
  animation,
}: Props) {
  const router = useRouter();

  const redirectToPage = (path: string | URL) => {
    if (typeof path === "string") {
      router.push(path);
    } else {
      window.open(path.toString(), "_self");
    }
  };

  const openTab = (path: string | URL) => {
    window.open(path.toString(), "_blank");
  };

  const renderButtonContent = () => {
    if (load) {
      return typeof load === "string" ? (
        <>
          <LoadSvg className={styles.load} style={{ fill: "#fff2" }} />
          {load}
        </>
      ) : (
        <LoadSvg className={styles.load} style={{ fill: "#fff" }} />
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

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (redirect) {
      redirectToPage(redirect);
    } else if (open) {
      openTab(open);
    }
  };

  const buttonClassName = [
    styles.button,
    style && styles[style],
    disabled && styles.disabled,
    adaptive && styles.adaptive,
    animation && styles.animated,
    load && styles.button_load,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      disabled={(typeof load === "boolean" && load === true) || disabled}
      style={width ? { maxWidth: width } : undefined}
      onClick={handleClick}
      className={buttonClassName}>
      {renderButtonContent()}
    </button>
  );
}
