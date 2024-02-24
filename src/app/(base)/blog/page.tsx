import * as API from "@/app/lib/_api";

import type { Metadata } from "next";
import BlogClient from "./page.uc";

export const metadata: Metadata = {
  title: "Blog",
};

const getPosts = async () => API.blog.getPosts();

export default async function Blog() {
  const posts = await getPosts();

  return <BlogClient posts={posts} />;
}
