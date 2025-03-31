"use client";

import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { ExperienceCard } from "./experience-card";

import { Button } from "@/components/ui/button";
import { Experience } from "@/types/experience";
import { textColor, bgColor, buttonStyles } from "../styles/theme";

export function Experiencies() {
  const { t } = useTranslation();

  const experiences = t("experience.items", {
    returnObjects: true,
  }) as Experience[];

  return (
    <section
      id="experience"
      className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div
            className={`inline-block mb-3 px-4 py-1 rounded-full ${bgColor.accentLight} ${textColor.accent} text-sm font-medium`}
          >
            {t("experience.badge")}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-200">
            {t("experience.title")}
          </h2>
          <p className={`text-lg ${textColor.secondary} max-w-2xl mx-auto`}>
            {t("experience.subtitle")}
          </p>
        </div>

        {/* Experiences Grid */}
        <div className="max-w-4xl mx-auto space-y-6">
          {experiences.slice(0, 3).map((experience) => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </div>

        {/* View All Button */}
        <div className="max-w-4xl mx-auto text-center mt-12">
          <Button
            size="lg"
            className={`${buttonStyles.primary} px-8 group`}
            asChild
          >
            <Link href="/experiences">
              {t("experience.viewAll")}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
