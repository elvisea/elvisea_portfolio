import type { Metadata } from "next";
import { env } from "@/lib/env";

export const metadata: Metadata = {
  title: `Contato | ${env.NEXT_PUBLIC_CREATOR_NAME}`,
  description: `Entre em contato com ${env.NEXT_PUBLIC_CREATOR_NAME}. Estou disponível para projetos, colaborações e oportunidades profissionais.`,
  openGraph: {
    title: `Contato | ${env.NEXT_PUBLIC_CREATOR_NAME}`,
    description: `Entre em contato com ${env.NEXT_PUBLIC_CREATOR_NAME}. Estou disponível para projetos, colaborações e oportunidades profissionais.`,
    url: `${env.NEXT_PUBLIC_SITE_URL}/contact`,
    type: "website",
  },
};

// Schema JSON-LD para a página de contato
export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: `Contato | ${env.NEXT_PUBLIC_CREATOR_NAME}`,
  description: `Entre em contato com ${env.NEXT_PUBLIC_CREATOR_NAME}. Estou disponível para projetos, colaborações e oportunidades profissionais.`,
  url: `${env.NEXT_PUBLIC_SITE_URL}/contact`,
  mainEntity: {
    "@type": "Person",
    name: env.NEXT_PUBLIC_CREATOR_NAME,
    jobTitle: env.NEXT_PUBLIC_CREATOR_ROLE,
    url: env.NEXT_PUBLIC_SITE_URL,
    sameAs: [env.NEXT_PUBLIC_GITHUB_URL, env.NEXT_PUBLIC_LINKEDIN_URL],
    contactPoint: {
      "@type": "ContactPoint",
      email: env.NEXT_PUBLIC_EMAIL_CONTACT,
      contactType: "professional",
    },
  },
};
