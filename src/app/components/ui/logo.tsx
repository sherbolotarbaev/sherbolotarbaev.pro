"use client";

import Link from "next/link";
import Image from "next/image";
import type { StaticImport } from "next/dist/shared/lib/get-img-props";
import styles from "@/app/components/styles/logo.module.scss";

interface Props {
  src: string | StaticImport;
  alt: string;
  name?: string;
  color?: string;
  width?: number;
  height?: number;
  outline?: boolean;
}

export default function Logo({
  src,
  alt,
  name,
  color,
  width,
  height,
  outline,
}: Props) {
  return (
    <>
      <Link className={styles.logo_wrapper} href="/">
        <div
          className={
            outline
              ? `${styles.logo_container} ${styles.outline}`
              : styles.logo_container
          }
          style={{
            width: width || "40px",
            height: height || "40px",
          }}>
          <Image
            src={src}
            alt={alt}
            className={styles.logo}
            width={width}
            height={height}
          />
        </div>

        {name && (
          <span className={styles.name} style={color ? { color } : undefined}>
            {name}
          </span>
        )}
      </Link>
    </>
  );
}
