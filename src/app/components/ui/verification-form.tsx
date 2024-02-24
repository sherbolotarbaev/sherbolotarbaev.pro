"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { getCookie } from "cookies-next";
import * as API from "@/../_api";
import {
  errorNotification,
  successNotification,
} from "@/app/lib/utils/notification";

import Button from "./button";
import text from "@/app/lib/data/form.json";
import { CloseSvg, ErrorSvg } from "@/app/lib/assets/svg";
import styles from "@/app/components/styles/form.module.scss";

type FormData = {
  code: string;
};

export default function VerificationForm() {
  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [email, setEmail] = React.useState<string>("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>();

  const code = watch("code");

  const handleClearInput = (name: keyof FormData) => {
    setValue(name, "");
  };

  const handleLogout = async () => {
    try {
      await API.auth.logOut();
      router.push("/login");
    } catch (e: any) {
      errorNotification(e.msg || "Something went wrong");
      console.error(e);
    }
  };

  const handleSubmitForm: SubmitHandler<FormData> = async (formData) => {
    setIsLoading(true);

    try {
      const data = await API.auth.emailVerification(formData);

      if (data.success) {
        successNotification("Successfully verified");
        router.push("/");
      }
    } catch (e: any) {
      errorNotification(e.msg || "Something went wrong");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    const getCookieEmail = async () => {
      const cookieEmail = getCookie("email");

      if (cookieEmail) {
        setEmail(cookieEmail);
      }
    };

    getCookieEmail();
  }, [setValue]);

  return (
    <>
      <div className={styles.form_wrapper}>
        <form className={styles.form} onSubmit={handleSubmit(handleSubmitForm)}>
          <h2 className={styles.title}>{text.verificationForm.text.title}</h2>

          <span
            className={styles.info}
            dangerouslySetInnerHTML={{
              __html: `${email} <br /> ${text.verificationForm.text.info}`,
            }}
          />

          <div className={styles.inputs_container}>
            <div className={styles.input_container}>
              <span className={styles.label}>Code</span>

              <div className={styles.input_wrapper}>
                <input
                  type="text"
                  disabled={isLoading}
                  className={
                    isLoading ? `${styles.input} ${styles.load}` : styles.input
                  }
                  placeholder="Paste a code"
                  {...register("code", {
                    required: "Code required",
                    pattern: {
                      value: /^\d{6}$/,
                      message: "Enter a valid six-digit code",
                    },
                    minLength: {
                      value: 6,
                      message: "Code must be exactly six digits",
                    },
                    maxLength: {
                      value: 6,
                      message: "Code must be exactly six digits",
                    },
                  })}
                />

                <CloseSvg
                  className={styles.clear}
                  onClick={() => handleClearInput("code")}
                  style={
                    !isLoading && code && code.length > 0
                      ? { fontSize: "1.1rem", fill: "#fff" }
                      : { display: "none" }
                  }
                />

                {errors.code && !isValid && (
                  <ErrorSvg className={styles.error_icon} />
                )}
              </div>

              {errors.code && (
                <span className={styles.error}>{errors.code.message}</span>
              )}
            </div>

            <Button type="submit" load={isLoading} disabled={!isValid}>
              {text.verificationForm.button}
            </Button>

            <span className={styles.link} onClick={handleLogout}>
              {text.verificationForm.link}
            </span>
          </div>
        </form>
      </div>
    </>
  );
}
