"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import type { StaticImport } from "next/dist/shared/lib/get-img-props";
import Sher from "@/lib/assets/img/sherbolot.jpeg";
import styles from "@/app/components/styles/images.module.scss";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

type Img = {
  src: StaticImport | string;
  alt: string;
};

const images: Img[] = [
  {
    src: Sher,
    alt: "Sherbolot",
  },
  {
    src: Sher,
    alt: "Sherbolot",
  },
  {
    src: Sher,
    alt: "Sherbolot",
  },
];

export default function Images() {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <Swiper
            className={styles.images}
            pagination={{ type: "bullets", dynamicBullets: true }}
            modules={[Pagination]}>
            {images.map((img, idx) => (
              <SwiperSlide key={idx}>
                <div className={styles.image_wrapper}>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    className={styles.image}
                    loading="lazy"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}
