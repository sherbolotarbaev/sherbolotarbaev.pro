import type { Metadata } from "next";
import ContactsClient from "./page.uc";

export const metadata: Metadata = {
  title: "Contacts",
};

export default async function Contacts() {
  return <ContactsClient />;
}
