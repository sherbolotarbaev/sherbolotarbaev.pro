"use client";

import { Toaster } from "sonner";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface Props {
  children: React.ReactNode;
}

export default function RootLayoutClient({ children }: Props) {
  return (
    <>
      <Header />

      <main
        style={{
          width: "100%",
          minHeight: "100vh",
          flex: "1 1 auto",
        }}>
        {children}
        <Toaster richColors />
      </main>

      <Footer />
    </>
  );
}
