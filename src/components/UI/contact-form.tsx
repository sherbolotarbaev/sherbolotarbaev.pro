"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "./button";
import { CloseSvg, ErrorSvg } from "@/lib/assets/svg";
import styles from "../styles/form.module.scss";

type FormData = {
  fullName: string;
  email: string;
  message: string;
};

export default function ContactForm() {
  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>();

  const fullName = watch("fullName");
  const email = watch("email");
  const message = watch("message");

  const handleClearInput = (name: keyof FormData) => {
    setValue(name, "");
  };

  const handleContact: SubmitHandler<FormData> = async (formData) => {
    console.log(formData);
  };

  React.useEffect(() => {
    const getCookieEmail = async () => {
      const cookieEmail = getCookie("email");

      if (cookieEmail) {
        setValue("email", cookieEmail);
      }
    };

    getCookieEmail();
  }, [setValue]);

  return (
    <>
      <div className={styles.form_wrapper}>
        <form className={styles.form} onSubmit={handleSubmit(handleContact)}>
          <h2 className={styles.title}>Contact Me</h2>

          <div className={styles.inputs_container}>
            <div className={styles.input_container}>
              {errors.fullName ? (
                <span className={styles.error}>{errors.fullName.message}</span>
              ) : (
                <span className={styles.label}>Full name</span>
              )}

              <div className={styles.input_wrapper}>
                <input
                  type="text"
                  disabled={isLoading}
                  className={
                    isLoading ? `${styles.input} ${styles.load}` : styles.input
                  }
                  placeholder="Enter your full name..."
                  {...register("fullName", {
                    required: "Full name required",
                    minLength: {
                      value: 5,
                      message: "Full name must be at least 5 characters long",
                    },
                    maxLength: {
                      value: 128,
                      message: "Full name must not exceed 128 characters",
                    },
                    pattern: {
                      value: /^[a-zA-Zа-яА-Я]+ [a-zA-Zа-яА-Я]+$/,
                      message: "Invalid full name",
                    },
                  })}
                />

                <CloseSvg
                  className={styles.clear}
                  onClick={() => handleClearInput("fullName")}
                  style={
                    !isLoading && fullName && fullName.length > 0
                      ? { fontSize: "1.1rem", fill: "#fff" }
                      : { display: "none" }
                  }
                />

                {errors.fullName && !isValid && (
                  <ErrorSvg className={styles.error_icon} />
                )}
              </div>
            </div>

            <div className={styles.input_container}>
              {errors.email ? (
                <span className={styles.error}>{errors.email.message}</span>
              ) : (
                <span className={styles.label}>Email address</span>
              )}

              <div className={styles.input_wrapper}>
                <input
                  type="text"
                  disabled={isLoading}
                  className={
                    isLoading ? `${styles.input} ${styles.load}` : styles.input
                  }
                  placeholder="Enter your email address..."
                  {...register("email", {
                    required: "Email address required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid Email",
                    },
                  })}
                />

                <CloseSvg
                  className={styles.clear}
                  onClick={() => handleClearInput("email")}
                  style={
                    !isLoading && email && email.length > 0
                      ? { fontSize: "1.1rem", fill: "#fff" }
                      : { display: "none" }
                  }
                />

                {errors.email && !isValid && (
                  <ErrorSvg className={styles.error_icon} />
                )}
              </div>
            </div>

            <div className={styles.input_container}>
              {errors.message ? (
                <span className={styles.error}>{errors.message.message}</span>
              ) : (
                <span className={styles.label}>Message</span>
              )}

              <div className={styles.input_wrapper}>
                <textarea
                  disabled={isLoading}
                  className={
                    isLoading ? `${styles.input} ${styles.load}` : styles.input
                  }
                  placeholder="Message to Sher..."
                  style={{
                    maxWidth: "100%",
                    minWidth: "100%",
                    maxHeight: "300px",
                    minHeight: "100px",
                  }}
                  {...register("message", {
                    required: "Message required",
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

                <CloseSvg
                  className={styles.clear}
                  onClick={() => handleClearInput("message")}
                  style={
                    !isLoading && message && message.length > 0
                      ? { fontSize: "1.1rem", fill: "#fff" }
                      : { display: "none" }
                  }
                />

                {errors.message && !isValid && (
                  <ErrorSvg className={styles.error_icon} />
                )}
              </div>
            </div>

            <Button type="submit" load={isLoading}>
              Submit
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
