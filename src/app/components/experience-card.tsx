import {
  Calendar,
  MapPin,
  ArrowRight,
  ExternalLink,
  Building2,
} from "lucide-react";

import Link from "next/link";
import { useTranslation } from "react-i18next";

import { bgColor, textColor } from "../styles/theme";
import { Experience } from "@/types/experience";
import { formatDateRange } from "@/lib/formate-date-range";
import { Button } from "@/components/ui/button";

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
        {/* Company and Role */}
        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
          {/* Company Icon */}
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <Building2 className="h-6 w-6 text-white" />
            </div>
          </div>

          {/* Company Info */}
          <div className="flex-1">
            <h3
              className={`text-xl font-bold ${textColor.primary} hover:text-blue-600 dark:hover:text-blue-400`}
            >
              <a
                href={experience.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                {experience.company}
                <ExternalLink className="h-4 w-4" />
              </a>
            </h3>
            <p className={`text-lg ${textColor.accent} mt-2`}>
              {experience.role}
            </p>
          </div>
        </div>

        {/* Time and Location Info */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-gray-400 flex-shrink-0" />
            <span className={`${textColor.secondary}`}>
              {startDate} - {endDate} · {duration}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-gray-400 flex-shrink-0" />
            <span className={textColor.secondary}>{experience.location}</span>
          </div>
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
        <div className="flex flex-wrap gap-2 mb-6">
          {experience.technologies.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className={`px-3 py-1 rounded-full ${bgColor.accentLight} ${textColor.accent} text-sm font-medium`}
            >
              {tech}
            </span>
          ))}
          {experience.technologies.length > 5 && (
            <span
              className={`px-3 py-1 rounded-full ${bgColor.accentLight} ${textColor.accent} text-sm font-medium`}
            >
              +{experience.technologies.length - 5}
            </span>
          )}
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
