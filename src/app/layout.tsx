import "./globals.css";

import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import I18nProvider from "@/i18n/I18nProvider";

import { env } from "@/lib/env";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
}

const nextPublicSiteUrl = env.NEXT_PUBLIC_SITE_URL;
const creatorName = env.NEXT_PUBLIC_CREATOR_NAME;

export const metadata: Metadata = {
  metadataBase: new URL(nextPublicSiteUrl),
  title: {
    default: `${creatorName} - Desenvolvedor Full Stack`,
    template: `%s | ${creatorName}`
  },
  description: "Desenvolvedor Full Stack especializado em React, Node.js, TypeScript e desenvolvimento mobile com React Native. Transformando ideias em soluções digitais com foco em qualidade e experiência do usuário.",
  keywords: [
   
    "react",
    "node.js",
    "typescript",
    "react native",   
    "javascript",
    "frontend",
    "backend",
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
  ],
  openGraph: {
    type: "profile",
    locale: "pt_BR",
    url: nextPublicSiteUrl,
    siteName: creatorName,
    title: `${creatorName} - Desenvolvedor Full Stack`,
    description: "Desenvolvedor Full Stack especializado em TypeScript, React, React Native e Node.js. Criando soluções web e mobile de alta qualidade.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${creatorName} - Desenvolvedor Full Stack`
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: `${creatorName} - Desenvolvedor Full Stack`,
    description: 'Desenvolvimento web e mobile com React, Node.js e React Native',
    creator: '@elvisea',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: nextPublicSiteUrl,
    languages: {
      'pt-BR': nextPublicSiteUrl,
      'en-US': nextPublicSiteUrl,
      'es-ES': nextPublicSiteUrl,
    }
  },
  authors: [
    {
      name: creatorName,
      url: nextPublicSiteUrl,
    }
  ],
  generator: "Next.js",
  applicationName: creatorName,
  referrer: "origin-when-cross-origin",
  creator: creatorName,
  publisher: creatorName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  verification: {
    google: "a305d1a55df1ae60",
  },
  other: {
    'priority-hints': "1",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
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
      </body>
    </html>
  );
}
