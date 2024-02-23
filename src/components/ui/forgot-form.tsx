"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

import * as API from "@/../_api";
import { SubmitHandler, useForm } from "react-hook-form";
import { getCookie } from "cookies-next";
import {
  errorNotification,
  successNotification,
} from "@/lib/utils/notification";

import Link from "next/link";
import Button from "./button";
import text from "@/lib/data/form.json";
import { CloseSvg, ErrorSvg } from "../../lib/assets/svg";
import styles from "../styles/form.module.scss";

type FormData = {
  email: string;
};

export default function ForgotForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = decodeURIComponent(searchParams.get("next") ?? "/");

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>();

  const email = watch("email");

  const handleClearInput = (name: keyof FormData) => {
    setValue(name, "");
  };

  const handleSubmitForm: SubmitHandler<FormData> = async (formData) => {
    setIsLoading(true);

    try {
      const message = await API.auth.forgotPassword(formData);

      successNotification(message);
      router.push(next === "/" ? "/login" : `/login?next=${next}`);
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
        setValue("email", cookieEmail);
      }
    };

    getCookieEmail();
  }, [setValue]);

  return (
    <>
      <div className={styles.form_wrapper}>
        <form className={styles.form} onSubmit={handleSubmit(handleSubmitForm)}>
          <h2 className={styles.title}>{text.forgotPasswordForm.text.title}</h2>

          <span
            className={styles.info}
            dangerouslySetInnerHTML={{
              __html: text.forgotPasswordForm.text.info,
            }}
          />

          <div className={styles.inputs_container}>
            <div className={styles.input_container}>
              {/* <span className={styles.label}>Email address</span> */}

              <div className={styles.input_wrapper}>
                <input
                  type="text"
                  disabled={isLoading}
                  className={
                    isLoading ? `${styles.input} ${styles.load}` : styles.input
                  }
                  placeholder="Email address"
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

              {errors.email && (
                <span className={styles.error}>{errors.email.message}</span>
              )}
            </div>

            <Button type="submit" load={isLoading} disabled={!isValid}>
              {text.forgotPasswordForm.button}
            </Button>

            <Link
              className={styles.link}
              href={next === "/" ? "/login" : `/login?next=${next}`}>
              {text.forgotPasswordForm.link}
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
