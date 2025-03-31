"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

import { textColor } from "@/app/styles/theme";

import { Button } from "@/components/ui/button";
import { ExperienceCard } from "@/app/components/experience-card";

import { Experience } from "@/types/experience";
import { usePageTracking } from "@/hooks/usePageTracking";

export default function ExperiencesPage() {
  const { t } = useTranslation();

  usePageTracking({
    pageTitle: "Experiences",
    pagePath: "/experiences",
  });

  const experiences = t("experience.items", {
    returnObjects: true,
  }) as Experience[];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button variant="ghost" className="mb-8 group" asChild>
            <Link href="/#experience">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              {t("experience.page.backToHome")}
            </Link>
          </Button>

          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-200">
              {t("experience.page.title")}
            </h1>
            <p className={`text-lg ${textColor.secondary} max-w-2xl mx-auto`}>
              {t("experience.page.subtitle")}
            </p>
          </div>

          {/* Experiences List */}
          <div className="space-y-6">
            {experiences.map((experience) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
