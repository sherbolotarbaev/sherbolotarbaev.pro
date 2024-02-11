import type { Metadata } from "next";
import ContactClient from "./page.uc";

export const metadata: Metadata = {
  title: "Contact",
};

export default async function Contact() {
  return <ContactClient />;
}
