import type { Metadata } from "next";
import { env } from "@/lib/env";

export const metadata: Metadata = {
  title: `Experiência Profissional | ${env.NEXT_PUBLIC_CREATOR_NAME}`,
  description: `Trajetória profissional de ${env.NEXT_PUBLIC_CREATOR_NAME}. Experiências como ${env.NEXT_PUBLIC_CREATOR_ROLE}, projetos desenvolvidos e tecnologias utilizadas ao longo da carreira.`,
  openGraph: {
    title: `Experiência Profissional | ${env.NEXT_PUBLIC_CREATOR_NAME}`,
    description: `Trajetória profissional de ${env.NEXT_PUBLIC_CREATOR_NAME}. Experiências como ${env.NEXT_PUBLIC_CREATOR_ROLE}, projetos desenvolvidos e tecnologias utilizadas ao longo da carreira.`,
    url: `${env.NEXT_PUBLIC_SITE_URL}/experiences`,
    type: "website",
  },
};

// Schema JSON-LD para a página de experiências
export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: `Experiência Profissional | ${env.NEXT_PUBLIC_CREATOR_NAME}`,
  description: `Trajetória profissional de ${env.NEXT_PUBLIC_CREATOR_NAME}`,
  url: `${env.NEXT_PUBLIC_SITE_URL}/experiences`,
  mainEntity: {
    "@type": "Person",
    name: env.NEXT_PUBLIC_CREATOR_NAME,
    jobTitle: env.NEXT_PUBLIC_CREATOR_ROLE,
    url: env.NEXT_PUBLIC_SITE_URL,
    sameAs: [env.NEXT_PUBLIC_GITHUB_URL, env.NEXT_PUBLIC_LINKEDIN_URL],
  },
};
