import type { Metadata } from "next";
import { env } from "@/lib/env";

export const metadata: Metadata = {
  title: `Projetos | ${env.NEXT_PUBLIC_CREATOR_NAME}`,
  description: `Portfólio de projetos desenvolvidos por ${env.NEXT_PUBLIC_CREATOR_NAME}. Explore uma coleção de aplicações web e mobile construídas com React, Node.js, TypeScript e outras tecnologias modernas.`,
  openGraph: {
    title: `Projetos | ${env.NEXT_PUBLIC_CREATOR_NAME}`,
    description: `Portfólio de projetos desenvolvidos por ${env.NEXT_PUBLIC_CREATOR_NAME}. Explore uma coleção de aplicações web e mobile construídas com React, Node.js, TypeScript e outras tecnologias modernas.`,
    url: `${env.NEXT_PUBLIC_SITE_URL}/projects`,
    type: "website",
  },
};

// Schema JSON-LD para a página de projetos
export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: `Projetos | ${env.NEXT_PUBLIC_CREATOR_NAME}`,
  description: `Portfólio de projetos desenvolvidos por ${env.NEXT_PUBLIC_CREATOR_NAME}`,
  url: `${env.NEXT_PUBLIC_SITE_URL}/projects`,
  author: {
    "@type": "Person",
    name: env.NEXT_PUBLIC_CREATOR_NAME,
    jobTitle: env.NEXT_PUBLIC_CREATOR_ROLE,
    url: env.NEXT_PUBLIC_SITE_URL,
  },
};
