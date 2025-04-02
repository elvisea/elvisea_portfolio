import { MetadataRoute } from "next";
import { env } from "@/lib/env";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = env.NEXT_PUBLIC_SITE_URL || "https://elvisea.dev";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/experiences", "/projects", "/contact"],
        disallow: [
          "/api/",
          "/_next/",
          "/static/",
          "/*.json$",
          "/*.js$",
          "/*.css$",
          "/favicon.ico",
          "/robots.txt",
          "/sitemap.xml",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        crawlDelay: 2,
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        crawlDelay: 2,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
