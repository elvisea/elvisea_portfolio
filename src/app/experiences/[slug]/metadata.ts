import type { Metadata } from "next";
import { env } from "@/lib/env";

// Função para formatar o título da experiência (primeira letra maiúscula)
const formatExperienceTitle = (slug: string) => {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// Função para gerar os metadados da página
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const experienceTitle = formatExperienceTitle(params.slug);

  return {
    title: `${experienceTitle} | ${env.NEXT_PUBLIC_CREATOR_NAME}`,
    description: `Detalhes sobre minha experiência como ${experienceTitle}. Conheça os projetos, tecnologias e conquistas durante minha atuação nesta posição.`,
    openGraph: {
      title: `${experienceTitle} | ${env.NEXT_PUBLIC_CREATOR_NAME}`,
      description: `Detalhes sobre minha experiência como ${experienceTitle}. Conheça os projetos, tecnologias e conquistas durante minha atuação nesta posição.`,
      url: `${env.NEXT_PUBLIC_SITE_URL}/experiences/${params.slug}`,
      type: "article",
    },
  };
}

// Função para gerar o schema JSON-LD
export function generateJsonLd(slug: string) {
  const experienceTitle = formatExperienceTitle(slug);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${experienceTitle} | ${env.NEXT_PUBLIC_CREATOR_NAME}`,
    description: `Detalhes sobre minha experiência como ${experienceTitle}. Conheça os projetos, tecnologias e conquistas durante minha atuação nesta posição.`,
    url: `${env.NEXT_PUBLIC_SITE_URL}/experiences/${slug}`,
    author: {
      "@type": "Person",
      name: env.NEXT_PUBLIC_CREATOR_NAME,
      jobTitle: env.NEXT_PUBLIC_CREATOR_ROLE,
      url: env.NEXT_PUBLIC_SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: env.NEXT_PUBLIC_CREATOR_NAME,
      jobTitle: env.NEXT_PUBLIC_CREATOR_ROLE,
      url: env.NEXT_PUBLIC_SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${env.NEXT_PUBLIC_SITE_URL}/experiences/${slug}`,
    },
  };
}
