"use client";

import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { textColor, bgColor, buttonStyles } from "../styles/theme";
import { RepositoryCard } from "@/components/RepositoryCard";
import { useRepositories } from "@/hooks/useRepositories";

const ITEMS_PER_PAGE = 6;

export function Portfolio() {
  const { t } = useTranslation();
  const { repositories, isLoading } = useRepositories({
    perPage: ITEMS_PER_PAGE,
  });

  return (
    <section
      id="portfolio"
      className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div
            className={`inline-block mb-3 px-4 py-1 rounded-full ${bgColor.accentLight} ${textColor.accent} text-sm font-medium`}
          >
            {t("portfolio.badge")}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-200">
            {t("portfolio.title")}
          </h2>
          <p className={`text-lg ${textColor.secondary} max-w-2xl mx-auto`}>
            {t("portfolio.subtitle")}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? // Loading skeletons
              Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 h-64 animate-pulse shadow-lg"
                />
              ))
            : // Repository cards
              repositories.map((repository) => (
                <RepositoryCard key={repository.id} repository={repository} />
              ))}
        </div>

        {/* View All Projects Button */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            className={`${buttonStyles.primary} px-8 group`}
            asChild
          >
            <Link href="/projects">
              {t("portfolio.viewAll")}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
