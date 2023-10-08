import type { Metadata } from "next";
import { Inter } from "next/font/google";
import RootLayoutClient from "./layout.uc";
import "@/styles/global.scss";

interface Props {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Sherbolot Arbaev",
  description: "Sherbolot Arbaev - Software Engineer | Full Stack Developer",
};

const font = Inter({ subsets: ["latin"] });

export default async function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={font.className}>
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
