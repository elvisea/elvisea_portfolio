import "./globals.css";

import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import I18nProvider from "@/i18n/I18nProvider";
import { ThemeProvider } from "next-themes";
import { FirebaseProvider } from "./providers/firebase-provider";
import { env } from "@/lib/env";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
  title: {
    default: env.NEXT_PUBLIC_CREATOR_NAME,
    template: `%s | ${env.NEXT_PUBLIC_CREATOR_NAME}`,
  },
  description: `Portfólio profissional de ${env.NEXT_PUBLIC_CREATOR_NAME}. ${env.NEXT_PUBLIC_CREATOR_ROLE} com experiência em desenvolvimento web, mobile e desktop.`,
  keywords: [
    // Nome e identificação profissional
    env.NEXT_PUBLIC_CREATOR_NAME,
    "Elvis Amancio",
    "elvisea",
    env.NEXT_PUBLIC_CREATOR_ROLE,

    // Títulos profissionais em PT-BR
    "Desenvolvedor Full Stack",
    "Desenvolvedor Frontend",
    "Desenvolvedor Backend",
    "Desenvolvedor Web",
    "Desenvolvedor Mobile",
    "Engenheiro de Software",
    "Programador",

    // Professional titles in EN
    "Full Stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "Web Developer",
    "Mobile Developer",
    "Software Engineer",

    // Principais tecnologias
    "React",
    "React.js",
    "React Native",
    "Next.js",
    "Node.js",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "PostgreSQL",
    "MongoDB",
    "Firebase",
    "AWS",

    // Áreas de atuação PT-BR
    "Desenvolvimento Web",
    "Desenvolvimento Mobile",
    "Desenvolvimento Full Stack",
    "Desenvolvimento Frontend",
    "Desenvolvimento Backend",
    "Aplicativos Mobile",
    "Aplicações Web",
    "Sistemas Web",

    // Areas of expertise EN
    "Web Development",
    "Mobile Development",
    "Full Stack Development",
    "Frontend Development",
    "Backend Development",
    "Mobile Apps",
    "Web Applications",

    // Habilidades específicas
    "API REST",
    "RESTful API",
    "Clean Code",
    "Clean Architecture",
    "UI/UX",
    "Responsive Design",
    "Mobile First",
    "PWA",
    "DevOps",
    "Git",

    // Soft Skills
    "Problem Solving",
    "Team Work",
    "Agile",
    "Scrum",

    // Termos para Recrutamento
    "Contratar Desenvolvedor",
    "Vaga Desenvolvedor",
    "Desenvolvedor Disponível",
    "Desenvolvedor para Contratar",
    "Programador para Contratar",
    "Contratar Programador",
    "Desenvolvedor Freelancer",
    "Programador Freelancer",
    "Desenvolvedor Remote",
    "Desenvolvedor Remoto",
    "Remote Developer",
    "Hire Developer",
    "Developer for Hire",
    "Freelance Developer",

    // Termos para Empresas/Projetos
    "Criar Site",
    "Criar Aplicativo",
    "Criar Sistema",
    "Criar App",
    "Criar Loja Virtual",
    "Criar E-commerce",
    "Criar Marketplace",
    "Desenvolver Site",
    "Desenvolver Aplicativo",
    "Desenvolver Sistema",
    "Desenvolver App",
    "Desenvolver E-commerce",
    "Desenvolver Marketplace",
    "Desenvolvimento de Sites",
    "Desenvolvimento de Aplicativos",
    "Desenvolvimento de Sistemas",
    "Desenvolvimento de E-commerce",
    "Orçamento Site",
    "Orçamento Aplicativo",
    "Orçamento Sistema",
    "Quanto Custa um Site",
    "Quanto Custa um Aplicativo",
    "Quanto Custa um Sistema",
    "Preço Site",
    "Preço Aplicativo",
    "Preço Sistema",
    "Website Development",
    "App Development",
    "System Development",
    "E-commerce Development",
    "Custom Software Development",
    "Software Development Company",
    "IT Solutions",
    "Digital Solutions",
    "Tech Solutions",

    // Localização - Capitais
    "Desenvolvedor São Paulo",
    "Desenvolvedor Rio de Janeiro",
    "Desenvolvedor Belo Horizonte",
    "Desenvolvedor Brasília",
    "Desenvolvedor Salvador",
    "Desenvolvedor Fortaleza",
    "Desenvolvedor Recife",
    "Desenvolvedor Curitiba",
    "Desenvolvedor Porto Alegre",
    "Desenvolvedor Manaus",
    "Desenvolvedor Belém",
    "Desenvolvedor Goiânia",
    "Desenvolvedor Florianópolis",
    "Desenvolvedor Vitória",
    "Desenvolvedor Cuiabá",
    "Desenvolvedor Campo Grande",
    "Desenvolvedor Teresina",
    "Desenvolvedor João Pessoa",
    "Desenvolvedor São Luís",
    "Desenvolvedor Maceió",
    "Desenvolvedor Natal",
    "Desenvolvedor Aracaju",
    "Desenvolvedor Porto Velho",
    "Desenvolvedor Rio Branco",
    "Desenvolvedor Macapá",
    "Desenvolvedor Boa Vista",
    "Desenvolvedor Palmas",

    // Estados
    "Desenvolvedor SP",
    "Desenvolvedor RJ",
    "Desenvolvedor MG",
    "Desenvolvedor ES",
    "Desenvolvedor BA",
    "Desenvolvedor PE",
    "Desenvolvedor CE",
    "Desenvolvedor PR",
    "Desenvolvedor RS",
    "Desenvolvedor AM",
    "Desenvolvedor PA",
    "Desenvolvedor GO",
    "Desenvolvedor SC",
    "Desenvolvedor MT",
    "Desenvolvedor MS",
    "Desenvolvedor PI",
    "Desenvolvedor PB",
    "Desenvolvedor MA",
    "Desenvolvedor AL",
    "Desenvolvedor RN",
    "Desenvolvedor SE",
    "Desenvolvedor RO",
    "Desenvolvedor AC",
    "Desenvolvedor AP",
    "Desenvolvedor RR",
    "Desenvolvedor TO",
  ],
  authors: [
    { name: env.NEXT_PUBLIC_CREATOR_NAME, url: env.NEXT_PUBLIC_SITE_URL },
  ],
  creator: env.NEXT_PUBLIC_CREATOR_NAME,
  publisher: env.NEXT_PUBLIC_CREATOR_NAME,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: env.NEXT_PUBLIC_SITE_URL,
    title: env.NEXT_PUBLIC_CREATOR_NAME,
    description: `Portfólio profissional de ${env.NEXT_PUBLIC_CREATOR_NAME}. ${env.NEXT_PUBLIC_CREATOR_ROLE} com experiência em desenvolvimento web, mobile e desktop.`,
    siteName: env.NEXT_PUBLIC_CREATOR_NAME,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${env.NEXT_PUBLIC_CREATOR_NAME} - ${env.NEXT_PUBLIC_CREATOR_ROLE}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: env.NEXT_PUBLIC_CREATOR_NAME,
    description: `Portfólio profissional de ${env.NEXT_PUBLIC_CREATOR_NAME}. ${env.NEXT_PUBLIC_CREATOR_ROLE} com experiência em desenvolvimento web, mobile e desktop.`,
    creator: "@elvisea",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: env.NEXT_PUBLIC_SITE_URL,
    languages: {
      "pt-BR": env.NEXT_PUBLIC_SITE_URL,
      "en-US": env.NEXT_PUBLIC_SITE_URL,
      "es-ES": env.NEXT_PUBLIC_SITE_URL,
    },
  },
  applicationName: env.NEXT_PUBLIC_CREATOR_NAME,
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  verification: {
    google: "a305d1a55df1ae60",
  },
  generator: "Next.js",
  other: {
    "priority-hints": "1",
  },
};

// Schema JSON-LD para a página inicial
export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: env.NEXT_PUBLIC_CREATOR_NAME,
  jobTitle: env.NEXT_PUBLIC_CREATOR_ROLE,
  url: env.NEXT_PUBLIC_SITE_URL,
  sameAs: [env.NEXT_PUBLIC_GITHUB_URL, env.NEXT_PUBLIC_LINKEDIN_URL],
  description: `Portfólio profissional de ${env.NEXT_PUBLIC_CREATOR_NAME}. ${env.NEXT_PUBLIC_CREATOR_ROLE} com experiência em desenvolvimento web, mobile e desktop.`,
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": env.NEXT_PUBLIC_SITE_URL,
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <FirebaseProvider>
          <I18nProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </I18nProvider>
        </FirebaseProvider>
      </body>
    </html>
  );
}
