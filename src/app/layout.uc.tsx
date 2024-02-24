"use client";

import NavBar from "@/app/components/ui/navbar";
import Footer from "@/app/components/ui/footer";
import { Toaster } from "sonner";

interface Props {
  children: React.ReactNode;
}

export default function RootLayoutClient({ children }: Props) {
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
