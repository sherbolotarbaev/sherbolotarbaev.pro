import type { Metadata } from "next";
import HomeClient from "./page.uc";

export const metadata: Metadata = {
  title: "Sherbolot Arbaev",
};

export default async function Home() {
  return <HomeClient />;
}
