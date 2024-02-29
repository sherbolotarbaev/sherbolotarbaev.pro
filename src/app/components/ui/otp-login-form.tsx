"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import * as API from "@/app/lib/_api";

import { getCookie, setCookie } from "cookies-next";
import { errorNotification } from "@/app/lib/utils/notification";

import Button from "./button";

import text from "@/app/lib/data/form.json";
import { CloseSvg, ErrorSvg } from "@/app/lib/assets/svg";
import styles from "../styles/form.module.scss";

type FormData = {
  email: string;
  otp: string;
};

export default function OTPLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/";

  const [isSent, setIsSent] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [hasExpired, setHasExpired] = React.useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>();

  const email = watch("email");
  const otp = watch("otp");

  const handleClearInput = (name: keyof FormData) => {
    if (name === "email") {
      setValue(name, "");
      setIsSent(false);
    } else setValue(name, "");
  };

  const handleSubmitForm: SubmitHandler<FormData> = async (formData) => {
    setIsLoading(true);

    try {
      const { success } = await API.otp.sendEmailOtp(formData);
      if (success) setIsSent(true);
    } catch (e: any) {
      if (e.msg === "Verification OTP has expired") setHasExpired(true);
      errorNotification(e.msg || "Something went wrong");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    const checkEmailOtp = async () => {
      setIsLoading(true);

      try {
        const token = await API.otp.checkEmailOtp({
          email,
          otp,
        });

        setCookie("token", token);
        router.push(`/redirect?to=${next}`);
        setIsSent(true);
      } catch (e: any) {
        if (e.msg === "Verification OTP has expired") setHasExpired(true);
        errorNotification(e.msg || "Something went wrong");
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    if (isValid && otp && otp.length === 6 && !errors.otp) {
      checkEmailOtp();
    }
  }, [isValid, otp, errors.otp, setCookie]);

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
          <h2 className={styles.title}>{text.OTPLoginForm.text.title}</h2>

          <div className={styles.inputs_container}>
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
                    onChange: () => {
                      if (isSent) setIsSent(false);
                    },
                    required: "This field is required",
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

                {errors.email && <ErrorSvg className={styles.error_icon} />}
              </div>
            </div>

            {isSent && !hasExpired && !isLoading && (
              <span className={styles.info}>
                We just sent you a temporary login code. Please check your
                inbox.
              </span>
            )}

            {isSent && (
              <div className={styles.input_container}>
                {errors.otp ? (
                  <span className={styles.error}>{errors.otp.message}</span>
                ) : (
                  <span className={styles.label}>Verification OTP</span>
                )}

                <div className={styles.input_wrapper}>
                  <input
                    type="text"
                    disabled={isLoading}
                    className={
                      isLoading
                        ? `${styles.input} ${styles.load}`
                        : styles.input
                    }
                    placeholder="Paste a verification OTP"
                    {...register("otp", {
                      required: "This field is required",
                      pattern: {
                        value: /^\d{6}$/,
                        message: "Enter a valid six-digit OTP",
                      },
                      minLength: {
                        value: 6,
                        message: "OTP must be exactly six digits",
                      },
                      maxLength: {
                        value: 6,
                        message: "OTP must be exactly six digits",
                      },
                    })}
                  />

                  <CloseSvg
                    className={styles.clear}
                    onClick={() => handleClearInput("otp")}
                    style={
                      !isLoading && otp && otp.length > 0
                        ? { fontSize: "1.1rem", fill: "#fff" }
                        : { display: "none" }
                    }
                  />

                  {errors.otp && <ErrorSvg className={styles.error_icon} />}
                </div>
              </div>
            )}

            {hasExpired && (
              <span
                className={styles.link}
                onClick={() => handleClearInput("email")}>
                Send again?
              </span>
            )}

            {!isSent && (
              <Button type="submit" load={isLoading}>
                {text.OTPLoginForm.button}
              </Button>
            )}

            {/* <div className={styles.devider}>
              <hr />
              <span>or</span>
              <hr />
            </div> */}

            <span
              className={styles.link}
              onClick={() => window.location.reload()}>
              Log in with a password
            </span>
          </div>
        </form>
      </div>
    </>
  );
}
