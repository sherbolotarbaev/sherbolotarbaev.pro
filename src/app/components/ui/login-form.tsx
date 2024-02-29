"use client";

import React from "react";
import { useSearchParams } from "next/navigation";

import { SubmitHandler, useForm } from "react-hook-form";
import { useLogIn } from "@/app/lib/hooks/useLogIn";
import { getCookie } from "cookies-next";

import Link from "next/link";
import Button from "./button";
import OTPLoginForm from "./otp-login-form";

import text from "@/app/lib/data/form.json";
import { CloseSvg, ErrorSvg } from "@/app/lib/assets/svg";
import styles from "@/app/components/styles/form.module.scss";

type FormData = {
  emailOrUsername: string;
  password: string;
};

export default function LoginForm() {
  const searchParams = useSearchParams();
  const next = decodeURIComponent(searchParams.get("next") ?? "/");

  const { logIn, isLoading } = useLogIn(next);

  const [otpLogin, setOtpLogin] = React.useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>();

  const emailOrUsername = watch("emailOrUsername");
  const password = watch("password");

  const handleClearInput = (name: keyof FormData) => {
    setValue(name, "");
  };

  const handleOtpLogin = () => {
    setOtpLogin(!otpLogin);
  };

  const handleSubmitForm: SubmitHandler<FormData> = async (formData) =>
    logIn(formData);

  React.useEffect(() => {
    const getCookieEmail = async () => {
      const cookieEmail = getCookie("email");

      if (cookieEmail) {
        setValue("emailOrUsername", cookieEmail);
      }
    };

    getCookieEmail();
  }, [setValue]);

  return !otpLogin ? (
    <>
      <div
        className={styles.form_wrapper}
        onSubmit={handleSubmit(handleSubmitForm)}>
        <form className={styles.form}>
          <h2 className={styles.title}>Welcome Back!</h2>

          <div className={styles.inputs_container}>
            <div className={styles.input_container}>
              {errors.emailOrUsername ? (
                <span className={styles.error}>
                  {errors.emailOrUsername.message}
                </span>
              ) : (
                <span className={styles.label}>Username or email address</span>
              )}

              <div className={styles.input_wrapper}>
                <input
                  type="text"
                  disabled={isLoading}
                  className={
                    isLoading ? `${styles.input} ${styles.load}` : styles.input
                  }
                  placeholder="Enter your username or email address..."
                  {...register("emailOrUsername", {
                    required: "This field is required",
                    pattern: {
                      value:
                        /^(?:[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}|[a-zA-Z0-9_-]+)$/,
                      message: "Invalid username or email address",
                    },
                  })}
                />

                <CloseSvg
                  className={styles.clear}
                  onClick={() => handleClearInput("emailOrUsername")}
                  style={
                    !isLoading && emailOrUsername && emailOrUsername.length > 0
                      ? { fontSize: "1.1rem", fill: "#fff" }
                      : { display: "none" }
                  }
                />

                {errors.emailOrUsername && (
                  <ErrorSvg className={styles.error_icon} />
                )}
              </div>
            </div>

            <div className={styles.input_container}>
              {errors.password ? (
                <span className={styles.error}>{errors.password.message}</span>
              ) : (
                <span className={styles.label}>Password</span>
              )}

              <div className={styles.input_wrapper}>
                <input
                  type="password"
                  disabled={isLoading}
                  autoComplete="off"
                  className={
                    isLoading
                      ? `${styles.input} ${styles.load} ${styles.password}`
                      : `${styles.input} ${styles.password}`
                  }
                  placeholder="Enter your password..."
                  {...register("password", {
                    required: "This field is required",
                    minLength: {
                      value: 8,
                      message: "Password must contain at least 8 characters",
                    },
                    maxLength: {
                      value: 16,
                      message:
                        "Password cannot contain more than 16 characters",
                    },
                  })}
                />

                <CloseSvg
                  className={styles.clear}
                  onClick={() => handleClearInput("password")}
                  style={
                    !isLoading && password && password.length > 0
                      ? { fontSize: "1.1rem", fill: "#fff" }
                      : { display: "none" }
                  }
                />

                {errors.password && <ErrorSvg className={styles.error_icon} />}
              </div>
            </div>

            <Button load={isLoading} type="submit" disabled={!isValid}>
              {text.loginForm.button}
            </Button>

            <Link
              className={styles.link}
              href={
                next === "/"
                  ? "/password/forgot"
                  : `/password/forgot?next=${next}`
              }>
              {text.loginForm.link}
            </Link>

            <div className={styles.devider}>
              <hr />
              <span>or</span>
              <hr />
            </div>

            <Button style="dark" onClick={handleOtpLogin} disabled={isLoading}>
              Use temporary code
            </Button>
          </div>
        </form>
      </div>
    </>
  ) : (
    <OTPLoginForm />
  );
}
