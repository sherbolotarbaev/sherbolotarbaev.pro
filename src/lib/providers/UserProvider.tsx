"use client";

import React from "react";
import * as API from "@/../api";

interface Props {
  children: React.ReactNode;
}

export const UserContext = React.createContext<{
  me: User | null;
  isLoading: boolean;
}>({
  me: null,
  isLoading: false,
});

export const UserProvider = ({ children }: Props) => {
  const [userState, setUserState] = React.useState<{
    me: User | null;
    isLoading: boolean;
  }>({
    me: null,
    isLoading: true,
  });

  // React.useEffect(() => {
  //   const initializeUser = async () => {
  //     try {
  //       const data: User = await API.auth.getMe();
  //       setUserState({
  //         me: data,
  //         isLoading: false,
  //       });
  //     } catch (e: any) {
  //       setUserState({
  //         me: null,
  //         isLoading: false,
  //       });
  //     }
  //   };

  //   initializeUser();
  // }, []);

  const value = React.useMemo(() => userState, [userState]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
