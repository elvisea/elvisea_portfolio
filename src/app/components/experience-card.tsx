import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

import { textColor } from "../styles/theme";
import { Experience } from "@/types/experience";
import { formatDateRange } from "@/lib/formate-date-range";
import { Button } from "@/components/ui/button";

import { SkillsList } from "./experience/SkillsList";
import { ExperienceHeader } from "./experience/ExperienceHeader";
import { ExperienceTime } from "./experience/ExperienceTime";
import { ExperienceLocation } from "./experience/ExperienceLocation";

type Props = {
  experience: Experience;
};

export function ExperienceCard({ experience }: Props) {
  const { t } = useTranslation();
  const { startDate, endDate, duration } = formatDateRange(
    experience.startDate,
    experience.endDate,
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Header Section */}
      <div className="flex flex-col gap-6 mb-6">
        <ExperienceHeader
          company={experience.company}
          role={experience.role}
          companyUrl={experience.companyUrl}
          size="sm"
        />

        {/* Time and Location Info */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <ExperienceTime
            startDate={startDate}
            endDate={endDate}
            duration={duration}
          />
          <ExperienceLocation location={experience.location} />
        </div>
      </div>

      {/* Content Section */}
      <div>
        {/* Brief Description */}
        <p className={`${textColor.secondary} mb-6 line-clamp-2`}>
          {experience.subtitle}
        </p>

        {/* Separator */}
        <hr className="my-6 border-gray-200 dark:border-gray-700" />

        {/* Technologies Preview */}
        <div className="mb-6">
          <SkillsList
            label={t("experience.details.technologies")}
            items={experience.technologies}
            maxItems={5}
            showCount={true}
          />
        </div>

        {/* View Details Button */}
        <div className="flex justify-end">
          <Button variant="ghost" className="group" asChild>
            <Link href={`/experiences/${experience.slug}`}>
              {t("experience.details.viewDetails")}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
