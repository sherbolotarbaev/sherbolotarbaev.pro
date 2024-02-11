import { MetadataRoute } from "next";
import { siteConfig } from "../../config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/projects", "/contact", "/blog"].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes];
}
