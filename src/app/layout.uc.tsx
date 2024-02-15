"use client";

import React from "react";
import * as API from "@/../api";

import NavBar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import { Toaster } from "sonner";

interface Props {
  children: React.ReactNode;
}

export default function RootLayoutClient({ children }: Props) {
  React.useEffect(() => {
    const addViews = async () => {
      await API.views.addViews();
    };

    return () => {
      addViews();
    };
  }, []);

  return (
    <>
      <NavBar />

      <main
        style={{
          width: "100%",
          flex: "1 1 auto",
        }}>
        {children}

        <Toaster theme="light" />
      </main>

      <Footer />
    </>
  );
}
