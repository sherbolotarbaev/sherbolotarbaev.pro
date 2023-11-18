"use client";

import { useRouter } from "next/navigation";
import { LoadSvg } from "@/assets/svg";
import styles from "@/styles/Button.module.scss";

type Redirect = {
  url: string;
  newTab?: boolean;
};

interface Props {
  children: React.ReactNode;
  style?: keyof TStyles;
  disabled?: boolean;
  type: keyof TTypes;
  load: boolean;
  onClick?: () => void;
  redirect?: Redirect;
}

type TStyles = {
  white: string;
  item: string;
};

type TTypes = {
  button: string;
  submit: string;
};

export default function Button({
  children,
  style,
  disabled,
  type,
  load,
  onClick,
  redirect,
}: Props) {
  const router = useRouter();

  const redirectToPage = (redirect: Redirect) => {
    if (redirect.newTab) {
      window.open(redirect.url, "_blank");
    } else router.push(redirect.url);
  };

  return (
    <>
      {!load ? (
        <button
          type={type}
          disabled={disabled}
          onClick={
            onClick ? onClick : () => redirect && redirectToPage(redirect)
          }
          className={
            style
              ? disabled
                ? `${styles.button} ${styles[style]} ${styles.disabled}`
                : `${styles.button} ${styles[style]}`
              : disabled
              ? `${styles.button} ${styles.disabled}`
              : styles.button
          }>
          {children}
        </button>
      ) : (
        <button
          type="submit"
          disabled={true}
          className={
            style
              ? `${styles.button_load} ${styles[style]}`
              : styles.button_load
          }>
          {<LoadSvg className={styles.load} />}
        </button>
      )}
    </>
  );
}
