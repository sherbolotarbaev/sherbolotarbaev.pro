"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import { SubmitHandler, useForm } from "react-hook-form";
import * as API from "@/app/lib/_api";
import {
  errorNotification,
  successNotification,
} from "@/app/lib/utils/notification";

import Button from "./button";

import text from "@/app/lib/data/form.json";
import { CloseSvg, ErrorSvg } from "@/app/lib/assets/svg";
import styles from "@/app/components/styles/form.module.scss";

type FormData = {
  password: string;
  confirmPassword: string;
};

export default function ResetForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>();

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const handleClearInput = (name: keyof FormData) => {
    setValue(name, "");
  };

  const handleSubmitForm: SubmitHandler<FormData> = async (formData) => {
    setIsLoading(true);

    const { password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setIsLoading(false);
      return errorNotification(`Passwords don't match`);
    }

    try {
      const message = await API.auth.resetPassword({ token, password });

      successNotification(message);
      router.push("/login");
    } catch (e: any) {
      errorNotification(e.msg || "Something went wrong");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (!token && token.length === 0) {
      router.push("/password/forgot");
    }
  }, [token, router]);

  return (
    <>
      <div className={styles.form_wrapper}>
        <form className={styles.form} onSubmit={handleSubmit(handleSubmitForm)}>
          <h2 className={styles.title}>{text.resetPasswordForm.text.title}</h2>

          <div className={styles.inputs_container}>
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
                  className={
                    isLoading ? `${styles.input} ${styles.load}` : styles.input
                  }
                  placeholder="Enter your new password..."
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

            <div className={styles.input_container}>
              {errors.confirmPassword ? (
                <span className={styles.error}>
                  {errors.confirmPassword.message}
                </span>
              ) : (
                <span className={styles.label}>Confirm Password</span>
              )}

              <div className={styles.input_wrapper}>
                <input
                  type="password"
                  disabled={isLoading}
                  className={
                    isLoading ? `${styles.input} ${styles.load}` : styles.input
                  }
                  placeholder="Confirm your new password..."
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
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
                  onClick={() => handleClearInput("confirmPassword")}
                  style={
                    !isLoading && confirmPassword && confirmPassword.length > 0
                      ? { fontSize: "1.1rem", fill: "#fff" }
                      : { display: "none" }
                  }
                />

                {errors.confirmPassword && (
                  <ErrorSvg className={styles.error_icon} />
                )}
              </div>
            </div>

            <Button type="submit" load={isLoading} disabled={!isValid}>
              {text.resetPasswordForm.button}
            </Button>

            <Link className={styles.link} href="/password/forgot">
              {text.resetPasswordForm.link}
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
