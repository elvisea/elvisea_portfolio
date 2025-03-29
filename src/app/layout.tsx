import "./globals.css";

import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import I18nProvider from '@/i18n/I18nProvider'

import { Header } from './components/Header'
import { websiteSchema, personSchema, portfolioSchema } from '@/lib/schema'
import { env } from '@/lib/env'

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
  title: {
    default: `${env.NEXT_PUBLIC_CREATOR_NAME} | ${env.NEXT_PUBLIC_CREATOR_ROLE}`,
    template: `%s | ${env.NEXT_PUBLIC_CREATOR_NAME}`
  },
  description: `${env.NEXT_PUBLIC_CREATOR_ROLE} especializado em TypeScript, React, React Native e Node.js. Criando soluções web e mobile inovadoras com foco em performance e experiência do usuário.`,
  keywords: [
    "desenvolvedor full stack",
    "typescript developer",
    "react developer",
    "react native developer",
    "node.js developer",
    "desenvolvimento web",
    "desenvolvimento mobile",
    "frontend developer",
    "backend developer",
    "next.js developer",
    "elvis amancio",
    "elvisea",
    "desenvolvedor javascript",
    "api rest",
    "desenvolvimento de software"
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: env.NEXT_PUBLIC_SITE_URL,
    siteName: env.NEXT_PUBLIC_CREATOR_NAME,
    title: `${env.NEXT_PUBLIC_CREATOR_NAME} | ${env.NEXT_PUBLIC_CREATOR_ROLE}`,
    description: `${env.NEXT_PUBLIC_CREATOR_ROLE} com experiência em TypeScript, React, React Native e Node.js. Transformando ideias em soluções digitais inovadoras.`,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${env.NEXT_PUBLIC_CREATOR_NAME} - ${env.NEXT_PUBLIC_CREATOR_ROLE}`
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: `${env.NEXT_PUBLIC_CREATOR_NAME} | ${env.NEXT_PUBLIC_CREATOR_ROLE}`,
    description: `${env.NEXT_PUBLIC_CREATOR_ROLE} especializado em TypeScript, React, React Native e Node.js`,
    images: ["/og-image.png"],
    creator: env.NEXT_PUBLIC_TWITTER_HANDLE
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
    canonical: env.NEXT_PUBLIC_SITE_URL,
    languages: {
      'pt-BR': env.NEXT_PUBLIC_SITE_URL,
      'en': `${env.NEXT_PUBLIC_SITE_URL}/en`,
      'es': `${env.NEXT_PUBLIC_SITE_URL}/es`
    }
  },
  authors: [
    {
      name: env.NEXT_PUBLIC_CREATOR_NAME,
      url: env.NEXT_PUBLIC_SITE_URL,
    }
  ],
  generator: "Next.js",
  applicationName: `${env.NEXT_PUBLIC_CREATOR_NAME} Portfolio`,
  referrer: "origin-when-cross-origin",
  creator: env.NEXT_PUBLIC_CREATOR_NAME,
  publisher: env.NEXT_PUBLIC_CREATOR_NAME,
  formatDetection: {
    email: true,
    address: false,
    telephone: false,
  },
  verification: {
    google: "adicione-seu-codigo-de-verificacao",
    yandex: "adicione-seu-codigo-de-verificacao",
    yahoo: "adicione-seu-codigo-de-verificacao",
  },
  category: "technology",
  other: {
    'priority-hints': "1",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([websiteSchema, personSchema, portfolioSchema])
          }}
        />
      </head>
      <body className={inter.className}>
        <I18nProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {children}
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
