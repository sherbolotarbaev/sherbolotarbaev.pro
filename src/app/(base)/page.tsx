import type { Metadata } from "next";
import HomeClient from "./page.uc";
import { getCookieValue } from "@/lib/utils/cookies";

export const metadata: Metadata = {
  title: "Sherbolot Arbaev",
};

export default async function Home() {
  const os = await getCookieValue("os");

  console.log({ os });

  return <HomeClient />;
}
