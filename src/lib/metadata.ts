import type { Metadata } from "next";
import { env } from "@/lib/env";

// Palavras-chave básicas para SEO
const baseKeywords = [
  "desenvolvedor full stack",
  "typescript developer",
  "react developer",
  "react native developer",
  "node.js developer",
  "desenvolvimento web",
  "desenvolvimento mobile",
  "elvis amancio",
  "elvisea",
  "desenvolvimento de software",
];

// Função simples para gerar metadados básicos
export function getMetadata(pageName?: string): Metadata {
  const baseUrl = env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const title = pageName
    ? `${pageName} | ${env.NEXT_PUBLIC_CREATOR_NAME}`
    : `${env.NEXT_PUBLIC_CREATOR_NAME} | ${env.NEXT_PUBLIC_CREATOR_ROLE}`;

  const description = pageName?.toLowerCase().includes("contato")
    ? `Entre em contato com ${env.NEXT_PUBLIC_CREATOR_NAME}, ${env.NEXT_PUBLIC_CREATOR_ROLE} especializado em desenvolvimento web e mobile.`
    : `${env.NEXT_PUBLIC_CREATOR_ROLE} especializado em TypeScript, React, React Native e Node.js. Desenvolvimento de soluções web e mobile.`;

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    keywords: baseKeywords,
    openGraph: {
      type: "website",
      locale: "pt_BR",
      url: baseUrl,
      siteName: env.NEXT_PUBLIC_CREATOR_NAME,
      title,
      description,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: pageName?.toLowerCase().includes("contato")
        ? `${baseUrl}/contact`
        : baseUrl,
    },
  };
}

// Função específica para a página de contato
export function getContactMetadata(): Metadata {
  return getMetadata("Contato");
}
