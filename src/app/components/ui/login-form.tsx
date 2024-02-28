"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { siteConfig } from "@/../config/site";

import { SubmitHandler, useForm } from "react-hook-form";
import { useLogIn } from "@/app/lib/hooks/useLogIn";
import { getCookie } from "cookies-next";

import Link from "next/link";
import Button from "./button";
import Logo from "./logo";
import text from "@/app/lib/data/form.json";
import websiteLogo from "@/../public/logo.png";
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

  return (
    <>
      <div
        className={styles.form_wrapper}
        onSubmit={handleSubmit(handleSubmitForm)}>
        <form className={styles.form}>
          <Logo
            src={websiteLogo}
            alt={`${siteConfig.name} - Website logo`}
            name={siteConfig.name}
            width={40}
            height={40}
          />

          <div className={styles.inputs_container}>
            <div className={styles.input_container}>
              <span className={styles.label}>Username or email address</span>

              <div className={styles.input_wrapper}>
                <input
                  type="text"
                  disabled={isLoading}
                  className={
                    isLoading ? `${styles.input} ${styles.load}` : styles.input
                  }
                  placeholder="Enter your username or email address..."
                  {...register("emailOrUsername", {
                    required: "This field is required.",
                    pattern: {
                      value:
                        /^(?:[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}|[a-zA-Z0-9_-]+)$/,
                      message: "Invalid email address or username.",
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

                {errors.emailOrUsername && !isValid && (
                  <ErrorSvg className={styles.error_icon} />
                )}
              </div>

              {errors.emailOrUsername && (
                <span className={styles.error}>
                  {errors.emailOrUsername.message}
                </span>
              )}
            </div>

            <div className={styles.input_container}>
              <span className={styles.label}>Password</span>

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
                    required: "This field is required.",
                    minLength: {
                      value: 8,
                      message: "Password must contain at least 8 characters.",
                    },
                    maxLength: {
                      value: 16,
                      message:
                        "Password cannot contain more than 16 characters.",
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

                {errors.password && !isValid && (
                  <ErrorSvg className={styles.error_icon} />
                )}
              </div>

              {errors.password && (
                <span className={styles.error}>{errors.password.message}</span>
              )}
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
          </div>
        </form>
      </div>
    </>
  );
}

// "use client";

// import React from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { SubmitHandler, useForm } from "react-hook-form";
// import * as API from "@/app/lib/_api";

// import { getCookie, setCookie } from "cookies-next";

// import Button from "./button";
// import { CloseSvg, ErrorSvg } from "@/app/lib/assets/svg";
// import styles from "../styles/form.module.scss";

// type FormData = {
//   email: string;
//   otp: string;
// };

// export default function ContactForm() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const next = searchParams.get("next") ?? "/";

//   const [isSent, setIsSent] = React.useState<boolean>(false);
//   const [isLoading, setIsLoading] = React.useState<boolean>(false);
//   const [hasExpired, setHasExpired] = React.useState<boolean>(false);

//   const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     watch,
//     formState: { errors, isValid },
//   } = useForm<FormData>();

//   const email = watch("email");
//   const otp = watch("otp");

//   const handleClearInput = (name: keyof FormData) => {
//     setValue(name, "");
//   };

//   const handleSubmitForm: SubmitHandler<FormData> = async (formData) => {
//     setIsLoading(true);
//     setErrorMessage(null);

//     try {
//       const { success } = await API.otp.sendEmailOtp(formData);
//       if (success) setIsSent(true);
//     } catch (e: any) {
//       if (e.msg === "Verification OTP has expired") setHasExpired(true);
//       setErrorMessage(e.msg || "Something went wrong");
//       console.error(e);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   React.useEffect(() => {
//     const checkEmailOtp = async () => {
//       setIsLoading(true);
//       setErrorMessage(null);

//       try {
//         const token = await API.otp.checkEmailOtp({
//           email,
//           otp,
//         });

//         setCookie("token", token);
//         router.push(`/redirect?to=${next}`);
//         setIsSent(true);
//       } catch (e: any) {
//         if (e.msg === "Verification OTP has expired") setHasExpired(true);
//         setErrorMessage(e.msg || "Something went wrong");
//         console.error(e);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (isValid && otp && otp.length === 6 && !errors.otp) {
//       checkEmailOtp();
//     }
//   }, [isValid, otp, errors.otp, setCookie]);

//   React.useEffect(() => {
//     const getCookieEmail = async () => {
//       const cookieEmail = getCookie("email");

//       if (cookieEmail) {
//         setValue("email", cookieEmail);
//       }
//     };

//     getCookieEmail();
//   }, [setValue]);

//   return (
//     <>
//       <div className={styles.form_wrapper}>
//         <form className={styles.form} onSubmit={handleSubmit(handleSubmitForm)}>
//           <h2 className={styles.title}>Log in</h2>

//           {errorMessage && (
//             <span className={styles.error_message}>{errorMessage}</span>
//           )}

//           <div className={styles.inputs_container}>
//             <div className={styles.input_container}>
//               {errors.email ? (
//                 <span className={styles.error}>{errors.email.message}</span>
//               ) : (
//                 <span className={styles.label}>Email address</span>
//               )}

//               <div className={styles.input_wrapper}>
//                 <input
//                   type="text"
//                   disabled={isLoading}
//                   className={
//                     isLoading ? `${styles.input} ${styles.load}` : styles.input
//                   }
//                   placeholder="Enter your email address..."
//                   {...register("email", {
//                     onChange: () => {
//                       if (isSent) handleClearInput("email");
//                     },
//                     required: "Email address required",
//                     pattern: {
//                       value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                       message: "Invalid Email",
//                     },
//                   })}
//                 />

//                 <CloseSvg
//                   className={styles.clear}
//                   onClick={() => handleClearInput("email")}
//                   style={
//                     !isLoading && email && email.length > 0
//                       ? { fontSize: "1.1rem", fill: "#fff" }
//                       : { display: "none" }
//                   }
//                 />

//                 {errors.email && !isValid && (
//                   <ErrorSvg className={styles.error_icon} />
//                 )}
//               </div>
//             </div>

//             {isSent && !hasExpired && !isLoading && (
//               <span className={styles.info}>
//                 We just sent you a temporary login code. Please check your
//                 inbox.
//               </span>
//             )}

//             {isSent && (
//               <div className={styles.input_container}>
//                 {errors.otp ? (
//                   <span className={styles.error}>{errors.otp.message}</span>
//                 ) : (
//                   <span className={styles.label}>Verification OTP</span>
//                 )}

//                 <div className={styles.input_wrapper}>
//                   <input
//                     type="text"
//                     disabled={isLoading}
//                     className={
//                       isLoading
//                         ? `${styles.input} ${styles.load}`
//                         : styles.input
//                     }
//                     placeholder="Paste a verification OTP"
//                     {...register("otp", {
//                       required: "OTP required",
//                       pattern: {
//                         value: /^\d{6}$/,
//                         message: "Enter a valid six-digit OTP",
//                       },
//                       minLength: {
//                         value: 6,
//                         message: "OTP must be exactly six digits",
//                       },
//                       maxLength: {
//                         value: 6,
//                         message: "OTP must be exactly six digits",
//                       },
//                     })}
//                   />

//                   <CloseSvg
//                     className={styles.clear}
//                     onClick={() => handleClearInput("otp")}
//                     style={
//                       !isLoading && otp && otp.length > 0
//                         ? { fontSize: "1.1rem", fill: "#fff" }
//                         : { display: "none" }
//                     }
//                   />

//                   {errors.otp && !isValid && (
//                     <ErrorSvg className={styles.error_icon} />
//                   )}
//                 </div>
//               </div>
//             )}

//             {hasExpired && (
//               <span
//                 className={styles.link}
//                 onClick={() => handleClearInput("email")}>
//                 Send again?
//               </span>
//             )}

//             {!isSent && (
//               <Button type="submit" load={isLoading}>
//                 Continue
//               </Button>
//             )}
//           </div>
//         </form>
//       </div>
//     </>
//   );
// }
