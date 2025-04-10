"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";

import { env } from "@/lib/env";
import { useClickTracking } from "@/hooks/useClickTracking";
import { useSocialTracking } from "@/hooks/useSocialTracking";

import { textColor, bgColor, buttonStyles } from "../styles/theme";

const githubUrl = env.NEXT_PUBLIC_GITHUB_URL;
const linkedinUrl = env.NEXT_PUBLIC_LINKEDIN_URL;

export function Hero() {
  const { t } = useTranslation();

  // Hooks de rastreamento para redes sociais
  const handleGithubClick = useSocialTracking({
    network: "github",
    url: githubUrl || "",
  });

  const handleLinkedinClick = useSocialTracking({
    network: "linkedin",
    url: linkedinUrl || "",
  });

  // Rastreamento para o botão "Ver Projetos"
  const handlePortfolioClick = useClickTracking({
    type: "button",
    data: {
      label: t("hero.cta"),
      category: "navigation",
      section: "hero",
      component: "portfolio_button",
      action: "view_portfolio",
      elementId: "hero-portfolio-button",
      elementState: "active",
      elementPosition: "hero_primary",
      url: "/#portfolio",
      analyticsGroupId: "portfolio_view",
    },
  });

  // Rastreamento para o botão "Entrar em Contato"
  const handleContactClick = useClickTracking({
    type: "button",
    data: {
      label: t("hero.contact"),
      category: "navigation",
      section: "hero",
      component: "contact_button",
      action: "view_contact",
      elementId: "hero-contact-button",
      elementState: "active",
      elementPosition: "hero_secondary",
      url: "/#contact",
      analyticsGroupId: "contact_view",
    },
  });

  return (
    <section
      aria-label="Introdução"
      role="banner"
      className="hero-section relative h-screen flex items-center bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-white/[0.05] bg-[size:60px_60px]" />

      <div className="container mx-auto px-4 relative z-10 pt-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <div
              className={`inline-block mb-3 px-4 py-1 rounded-full ${bgColor.accentLight} ${textColor.accent} text-sm font-medium`}
            >
              {t("hero.badge")}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-200 py-2">
              {t("hero.title")}
            </h1>
            <p
              className={`text-xl md:text-2xl mb-10 text-center ${textColor.secondary} max-w-3xl mx-auto`}
            >
              {t("hero.subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/#portfolio">
                <Button
                  size="lg"
                  className={`${buttonStyles.primary} px-8 group`}
                  onClick={handlePortfolioClick}
                >
                  {t("hero.cta")}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/#contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 px-8"
                  onClick={handleContactClick}
                >
                  {t("hero.contact")}
                </Button>
              </Link>
            </div>

            <div className="mt-10 flex items-center justify-center space-x-6">
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleGithubClick}
                className={`${textColor.secondary} hover:${textColor.accent} transition-colors`}
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLinkedinClick}
                className={`${textColor.secondary} hover:${textColor.accent} transition-colors`}
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
