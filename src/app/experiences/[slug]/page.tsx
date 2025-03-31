"use client";

import { use } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { ArrowLeft } from "lucide-react";

import { textColor } from "@/app/styles/theme";
import { formatDateRange } from "@/lib/formate-date-range";
import { Button } from "@/components/ui/button";
import { Experience } from "@/types/experience";
import { usePageTracking } from "@/hooks/usePageTracking";

import { SkillsList } from "@/app/components/experience/SkillsList";
import { ExperienceHeader } from "@/app/components/experience/ExperienceHeader";
import { ExperienceTime } from "@/app/components/experience/ExperienceTime";
import { ExperienceLocation } from "@/app/components/experience/ExperienceLocation";

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
              <ExperienceHeader
                company={experience.company}
                role={experience.role}
                companyUrl={experience.companyUrl}
                size="lg"
              />

              {/* Time and Location */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <ExperienceTime
                  startDate={startDate}
                  endDate={endDate}
                  duration={duration}
                />
                <ExperienceLocation location={experience.location} />
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
                <SkillsList
                  label={t("experience.details.technologies")}
                  items={experience.technologies}
                />

                {/* Tools */}
                <SkillsList
                  label={t("experience.details.tools")}
                  items={experience.tools}
                />

                {/* Programming Languages */}
                <SkillsList
                  label={t("experience.details.languages")}
                  items={experience.languages}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
