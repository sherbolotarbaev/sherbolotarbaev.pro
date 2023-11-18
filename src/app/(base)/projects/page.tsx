import type { Metadata } from "next";
import ProjectsClient from "./page.uc";

export const metadata: Metadata = {
  title: "Projects",
};

export default async function Projects() {
  return <ProjectsClient />;
}
