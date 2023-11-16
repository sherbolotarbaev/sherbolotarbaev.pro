"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { getCookie, setCookie } from "cookies-next";
import {
  errorNotification,
  successNotification,
} from "@/lib/utils/notification";
import Button from "@/components/UI/Button";
import styles from "@/styles/Form.module.scss";

type FormData = {
  name: string;
  email: string;
  message: string;
};

export default function Form() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmitForm: SubmitHandler<FormData> = async (formData) => {
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/messages`,
        { ...formData },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data) {
        const { name, email } = response.data;

        setCookie("name", name);
        setCookie("email", email);

        successNotification("Form submitted successfully");
        router.push("/");
      } else errorNotification("The server is temporarily down");
    } catch (e) {
      //@ts-ignore
      errorNotification("Something went wrong");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const cookieEmail = getCookie("email");
    const cookieName = getCookie("name");

    if (cookieName || cookieEmail) {
      setValue("email", cookieEmail || "");
      setValue("name", cookieName || "");
    }
  }, [setValue]);

  return (
    <>
      <div className={styles.form_wrapper}>
        <form className={styles.form} onSubmit={handleSubmit(handleSubmitForm)}>
          <div className={styles.title}>Contact Me.</div>

          <div className={styles.inputs_container}>
            <div className={styles.input_container}>
              <input
                type="text"
                disabled={loading}
                className={
                  loading ? `${styles.input} ${styles.load}` : styles.input
                }
                placeholder="Name"
                {...register("name", {
                  required: "Name is required",
                  pattern: {
                    value: /^[A-Za-z\s'-]+$/,
                    message: "Invalid Name",
                  },
                })}
              />

              {errors.name && (
                <span className={styles.error}>{errors.name.message}</span>
              )}
            </div>

            <div className={styles.input_container}>
              <input
                type="text"
                disabled={loading}
                className={
                  loading ? `${styles.input} ${styles.load}` : styles.input
                }
                placeholder="Email adress"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid Email",
                  },
                })}
              />

              {errors.email && (
                <span className={styles.error}>{errors.email.message}</span>
              )}
            </div>

            <div className={styles.input_container}>
              <textarea
                disabled={loading}
                placeholder="Message"
                className={
                  loading
                    ? `${styles.input} ${styles.load} ${styles.textarea}`
                    : `${styles.input} ${styles.textarea}`
                }
                {...register("message", {
                  required: "Message is required",
                  minLength: {
                    value: 5,
                    message: "Message must be at least 5 characters long",
                  },
                  maxLength: {
                    value: 500,
                    message: "Message must not exceed 500 characters",
                  },
                })}
              />

              {errors.message && (
                <span className={styles.error}>{errors.message.message}</span>
              )}
            </div>

            <Button type="submit" load={loading}>
              Send
            </Button>
          </div>

          <div className={styles.info}>
            Get in touch or shoot me an email directly on sherbolot@wedevx.co
          </div>
        </form>
      </div>
    </>
  );
}
