import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

const ROUTES = [
  "",
  "/projects/tummie",
  "/projects/lets-note",
  "/projects/moonshot",
  "/projects/aidventure",
  "/experience/bull",
  "/experience/oktan",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    priority: path === "" ? 1 : 0.7,
  }));
}
