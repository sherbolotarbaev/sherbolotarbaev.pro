"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import * as API from "@/../api";
import {
  errorNotification,
  successNotification,
} from "@/lib/utils/notification";
import { setCookie } from "cookies-next";

type FormData = {
  emailOrUsername: string;
  password: string;
};

interface LogInHook {
  logIn: (formData: FormData) => void;
  isLoading: boolean;
}

export function useLogIn(): LogInHook {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/";

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const logIn = async (formData: FormData) => {
    setIsLoading(true);

    try {
      const { message, token } = await API.auth.logIn(formData);

      setCookie("token", token);
      successNotification(message);

      router.push(`/redirect?to=${next}`);
    } catch (e: any) {
      errorNotification(e.msg || "Something went wrong");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    logIn,
    isLoading,
  };
}
