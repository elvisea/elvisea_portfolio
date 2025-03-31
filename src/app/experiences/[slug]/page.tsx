"use client";

import { use } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

import {
  ArrowLeft,
  Calendar,
  MapPin,
  ExternalLink,
  Building2,
} from "lucide-react";

import { textColor, bgColor } from "@/app/styles/theme";
import { formatDateRange } from "@/lib/formate-date-range";
import { Button } from "@/components/ui/button";
import { Experience } from "@/types/experience";
import { usePageTracking } from "@/hooks/usePageTracking";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default function ExperienceDetails({ params }: Props) {
  const { slug } = use(params);
  const { t } = useTranslation();

  usePageTracking({
    pageTitle: "Experiences",
    pagePath: `/experiences/${slug}`,
  });

  const experiences = t("experience.items", {
    returnObjects: true,
  }) as Experience[];

  const experience = experiences.find((exp) => exp.slug === slug);

  if (!experience) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className={`text-2xl font-bold ${textColor.primary} mb-4`}>
              {t("experience.details.notFound")}
            </h1>
            <Button asChild>
              <Link href="/experiences">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t("experience.details.backToExperiences")}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const { startDate, endDate, duration } = formatDateRange(
    experience.startDate,
    experience.endDate,
  );

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button variant="ghost" className="mb-8 group" asChild>
            <Link href="/#experience">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              {t("experience.details.backToExperiences")}
            </Link>
          </Button>

          {/* Experience Details */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
            {/* Header */}
            <div className="flex flex-col gap-6 mb-8">
              {/* Company and Role */}
              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                {/* Company Icon */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <Building2 className="h-8 w-8 text-white" />
                  </div>
                </div>

                {/* Company Info */}
                <div className="flex-1">
                  <h1
                    className={`text-2xl sm:text-3xl font-bold ${textColor.primary} hover:text-blue-600 dark:hover:text-blue-400`}
                  >
                    <a
                      href={experience.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      {experience.company}
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  </h1>
                  <p className={`text-lg sm:text-xl ${textColor.accent} mt-2`}>
                    {experience.role}
                  </p>
                </div>
              </div>

              {/* Time and Location */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  <span className={`${textColor.secondary}`}>
                    {startDate} - {endDate} · {duration}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  <span className={textColor.secondary}>
                    {experience.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-8">
              {/* Job Title and Description */}
              <div>
                <h2
                  className={`text-xl font-semibold ${textColor.primary} mb-4`}
                >
                  {experience.jobTitle}
                </h2>
                <p className={`${textColor.secondary} mb-4`}>
                  {experience.subtitle}
                </p>
                <p className={`${textColor.secondary}`}>
                  {experience.description}
                </p>
              </div>

              {/* Responsibilities */}
              <div>
                <h3
                  className={`text-lg font-semibold ${textColor.primary} mb-4`}
                >
                  {t("experience.details.keyResponsibilities")}
                </h3>
                <ul className="list-disc list-inside space-y-3">
                  {experience.responsibilities.map((responsibility, index) => (
                    <li key={index} className={`${textColor.secondary} pl-2`}>
                      {responsibility}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Skills Section */}
              <div className="space-y-6">
                {/* Technologies */}
                <div>
                  <h3
                    className={`text-lg font-semibold ${textColor.primary} mb-3`}
                  >
                    {t("experience.details.technologies")}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech) => (
                      <span
                        key={tech}
                        className={`px-3 py-1 rounded-full ${bgColor.accentLight} ${textColor.accent} text-sm font-medium`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tools */}
                <div>
                  <h3
                    className={`text-lg font-semibold ${textColor.primary} mb-3`}
                  >
                    {t("experience.details.tools")}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {experience.tools.map((tool) => (
                      <span
                        key={tool}
                        className={`px-3 py-1 rounded-full ${bgColor.accentLight} ${textColor.accent} text-sm font-medium`}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Programming Languages */}
                <div>
                  <h3
                    className={`text-lg font-semibold ${textColor.primary} mb-3`}
                  >
                    {t("experience.details.languages")}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {experience.languages.map((language) => (
                      <span
                        key={language}
                        className={`px-3 py-1 rounded-full ${bgColor.accentLight} ${textColor.accent} text-sm font-medium`}
                      >
                        {language}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
