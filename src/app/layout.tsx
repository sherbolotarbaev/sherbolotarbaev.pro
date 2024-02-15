import { siteConfig } from "@/../config/site";
import { UserProvider } from "@/lib/providers/UserProvider";

import * as API from "@/../api";

import type { Metadata } from "next";
import { Lexend } from "next/font/google";

import RootLayoutClient from "./layout.uc";
import "@/components/styles/global.scss";

interface Props {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  category: "development",
  keywords: [
    "software development",
    "Sherbolot",
    "Sherbolot Arbaev",
    "Sherbolot Arbaev portfolio",
    "software developer",
    "portfolio",
    "software engineer",
    "full stack",
    "full stack developer",
    "wedevx",
    "backend developer",
    "backend",
    "frontend developer",
    "frontend",
  ],
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    images: "",
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const font = Lexend({ subsets: ["latin"] });

const addView = async () => {
  let view = false;

  if (!view) {
    await API.views.addViews();
    view = true;
  }
};

export default async function RootLayout({ children }: Props) {
  addView();

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>

      <body className={font.className}>
        <UserProvider>
          <RootLayoutClient>{children}</RootLayoutClient>
        </UserProvider>
      </body>
    </html>
  );
}
