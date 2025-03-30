import type { Metadata } from "next";
import { getContactMetadata } from "@/lib/metadata";
import { env } from "@/lib/env";

export const metadata: Metadata = getContactMetadata();

// Esquema JSON-LD básico para a página de contato
export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: `Contato | ${env.NEXT_PUBLIC_CREATOR_NAME}`,
  url: `${env.NEXT_PUBLIC_SITE_URL}/contact`,
  mainEntity: {
    "@type": "ContactPoint",
    email: env.NEXT_PUBLIC_CREATOR_EMAIL,
    contactType: "professional",
  },
};
