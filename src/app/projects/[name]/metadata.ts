import type { Metadata } from "next";
import { env } from "@/lib/env";

// Função para gerar metadata dinâmico baseado no nome do projeto
export async function generateMetadata({
  params,
}: {
  params: { name: string };
}): Promise<Metadata> {
  const projectName = params.name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: `${projectName} | ${env.NEXT_PUBLIC_CREATOR_NAME}`,
    description: `Detalhes do projeto ${projectName} desenvolvido por ${env.NEXT_PUBLIC_CREATOR_NAME}. Tecnologias utilizadas, funcionalidades e documentação completa.`,
    openGraph: {
      title: `${projectName} | ${env.NEXT_PUBLIC_CREATOR_NAME}`,
      description: `Detalhes do projeto ${projectName} desenvolvido por ${env.NEXT_PUBLIC_CREATOR_NAME}. Tecnologias utilizadas, funcionalidades e documentação completa.`,
      url: `${env.NEXT_PUBLIC_SITE_URL}/projects/${params.name}`,
      type: "article",
    },
  };
}

// Função para gerar o schema JSON-LD dinâmico
export function generateJsonLd(projectName: string, projectUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: projectName,
    author: {
      "@type": "Person",
      name: env.NEXT_PUBLIC_CREATOR_NAME,
      jobTitle: env.NEXT_PUBLIC_CREATOR_ROLE,
      url: env.NEXT_PUBLIC_SITE_URL,
    },
    codeRepository: projectUrl,
    programmingLanguage: ["TypeScript", "JavaScript"],
    url: `${env.NEXT_PUBLIC_SITE_URL}/projects/${projectName}`,
  };
}
