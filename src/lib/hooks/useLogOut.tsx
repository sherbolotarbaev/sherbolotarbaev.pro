"use client";

import * as API from "@/../api";
import { useRouter } from "next/navigation";
import { errorNotification } from "@/lib/utils/notification";

interface LogOutHook {
  logOut: () => void;
}

export function useLogOut(): LogOutHook {
  const router = useRouter();

  const logOut = async () => {
    try {
      await API.auth.logOut();
      router.push("/login");
    } catch (e: any) {
      errorNotification(e.msg || "Something went wrong");
      console.error(e);
    }
  };

  return {
    logOut,
  };
}
