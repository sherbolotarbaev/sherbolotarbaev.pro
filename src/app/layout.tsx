import type { Metadata } from "next";
import { siteConfig } from "../../config/site";
import { Inter } from "next/font/google";
import RootLayoutClient from "./layout.uc";
import StarsCanvas from "@/components/UI/Star";
import "@/styles/global.scss";

interface Props {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

const font = Inter({ subsets: ["latin"] });

export default async function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={font.className}>
        <RootLayoutClient>{children}</RootLayoutClient>
        <StarsCanvas />
      </body>
    </html>
  );
}
