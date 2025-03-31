import { Building2, ExternalLink } from "lucide-react";
import { textColor } from "@/app/styles/theme";

type Props = {
  company: string;
  role: string;
  companyUrl: string;
  size?: "sm" | "lg";
};

export function ExperienceHeader({
  company,
  role,
  companyUrl,
  size = "sm",
}: Props) {
  const iconSize = size === "sm" ? "w-12 h-12" : "w-16 h-16";
  const buildingSize = size === "sm" ? "h-6 w-6" : "h-8 w-8";
  const titleSize = size === "sm" ? "text-xl" : "text-2xl sm:text-3xl";
  const roleSize = size === "sm" ? "text-lg" : "text-lg sm:text-xl";

  return (
    <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
      {/* Company Icon */}
      <div className="flex-shrink-0">
        <div
          className={`${iconSize} rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center`}
        >
          <Building2 className={`${buildingSize} text-white`} />
        </div>
      </div>

      {/* Company Info */}
      <div className="flex-1">
        <h3
          className={`${titleSize} font-bold ${textColor.primary} hover:text-blue-600 dark:hover:text-blue-400`}
        >
          <a
            href={companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            {company}
            <ExternalLink className="h-4 w-4" />
          </a>
        </h3>
        <p className={`${roleSize} ${textColor.accent} mt-2`}>{role}</p>
      </div>
    </div>
  );
}
