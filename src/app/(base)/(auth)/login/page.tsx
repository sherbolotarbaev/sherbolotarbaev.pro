import type { Metadata } from "next";
import LoginClient from "./page.uc";

export const metadata: Metadata = {
  title: "Log In",
};

export default async function Login() {
  return <LoginClient />;
}
