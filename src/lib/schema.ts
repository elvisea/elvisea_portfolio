import { env } from './env'

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: `${env.NEXT_PUBLIC_CREATOR_NAME} - ${env.NEXT_PUBLIC_CREATOR_ROLE}`,
  url: env.NEXT_PUBLIC_SITE_URL,
  description: `Portfólio profissional de ${env.NEXT_PUBLIC_CREATOR_NAME}, desenvolvedor Full Stack especializado em TypeScript, React, React Native e Node.js`,
  inLanguage: ["pt-BR", "en", "es"],
  author: {
    "@type": "Person",
    name: env.NEXT_PUBLIC_CREATOR_NAME,
    url: env.NEXT_PUBLIC_SITE_URL,
    sameAs: [
      env.NEXT_PUBLIC_GITHUB_URL,
      env.NEXT_PUBLIC_LINKEDIN_URL
    ]
  }
}

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: env.NEXT_PUBLIC_CREATOR_NAME,
  url: env.NEXT_PUBLIC_SITE_URL,
  image: `${env.NEXT_PUBLIC_SITE_URL}/profile.jpg`,
  description: `Desenvolvedor Full Stack com experiência em TypeScript, React, React Native e Node.js`,
  jobTitle: env.NEXT_PUBLIC_CREATOR_ROLE,
  sameAs: [
    env.NEXT_PUBLIC_GITHUB_URL,
    env.NEXT_PUBLIC_LINKEDIN_URL
  ],
  knowsAbout: [
    "TypeScript",
    "React",
    "React Native",
    "Node.js",
    "Next.js",
    "Desenvolvimento Web",
    "Desenvolvimento Mobile",
    "API REST",
    "Frontend Development",
    "Backend Development"
  ],
  worksFor: {
    "@type": "Organization",
    name: "Freelancer"
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: env.NEXT_PUBLIC_CREATOR_EMAIL,
    contactType: "professional"
  }
}

export const portfolioSchema = {
  "@context": "https://schema.org",
  "@type": "Collection",
  name: "Portfólio de Projetos",
  description: `Coleção de projetos de desenvolvimento de software por ${env.NEXT_PUBLIC_CREATOR_NAME}`,
  url: `${env.NEXT_PUBLIC_SITE_URL}/#portfolio`,
  author: {
    "@type": "Person",
    name: env.NEXT_PUBLIC_CREATOR_NAME,
    url: env.NEXT_PUBLIC_SITE_URL
  }
} 