import type { Metadata } from "next";
import { getMetadata } from "@/lib/metadata";
import { env } from "@/lib/env";

export const metadata: Metadata = getMetadata();

// Esquema básico JSON-LD para a página principal
export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: `${env.NEXT_PUBLIC_CREATOR_NAME} - ${env.NEXT_PUBLIC_CREATOR_ROLE}`,
  url: env.NEXT_PUBLIC_SITE_URL,
  description: `${env.NEXT_PUBLIC_CREATOR_ROLE} especializado em TypeScript, React, React Native e Node.js.`,
  author: {
    "@type": "Person",
    name: env.NEXT_PUBLIC_CREATOR_NAME,
    jobTitle: env.NEXT_PUBLIC_CREATOR_ROLE,
    url: env.NEXT_PUBLIC_SITE_URL,
  },
};
