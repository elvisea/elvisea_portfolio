import Link from "next/link";
import { useTranslation } from "react-i18next";
import { ExternalLink, GithubIcon, Star } from "lucide-react";

import { textColor, bgColor } from "@/app/styles/theme";
import { useSocialTracking } from "@/hooks/useSocialTracking";

type Repository = {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  language: string;
  topics: string[];
};

interface RepositoryCardProps {
  repository: Repository;
}

export function RepositoryCard({ repository }: RepositoryCardProps) {
  const { t } = useTranslation();

  // Hook deve ser chamado no nível superior do componente
  const handleSocialClick = useSocialTracking({
    network: "github",
    url: repository.html_url,
  });

  const handleClickGithub = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
    handleSocialClick(); // Chama o handler retornado pelo hook
  };

  return (
    <div className="group relative h-full bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-700">
      <div className="flex justify-between items-start mb-4">
        <Link
          href={`/projects/${repository.name}`}
          className={`text-xl font-semibold ${textColor.primary} truncate hover:text-blue-500 transition-colors`}
        >
          {repository.name}
        </Link>
        <div className="flex items-center space-x-2">
          <span className="flex items-center text-yellow-500">
            <Star size={16} className="mr-1" />
            {repository.stargazers_count}
          </span>
        </div>
      </div>

      <Link
        href={`/projects/${repository.name}`}
        className={`block ${textColor.secondary} text-sm mb-6 line-clamp-2 h-10 hover:text-blue-500 transition-colors`}
      >
        {repository.description || t("portfolio.noDescription")}
      </Link>

      {repository.topics && repository.topics.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {repository.topics.slice(0, 3).map((topic) => (
            <span
              key={topic}
              className={`px-3 py-1 text-xs rounded-full ${bgColor.accentLight} ${textColor.accent} font-medium`}
            >
              {topic}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
        <span className={`text-sm font-medium ${textColor.secondary}`}>
          {repository.language}
        </span>

        {/* External links */}
        <div className="flex items-center space-x-4">
          <a
            href={repository.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${textColor.secondary} hover:text-blue-500 transition-colors`}
            title={t("projects.viewOnGithub")}
            onClick={handleClickGithub}
          >
            <GithubIcon size={20} />
          </a>
          {repository.homepage && (
            <a
              href={repository.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className={`${textColor.secondary} hover:text-blue-500 transition-colors`}
              title={t("projects.viewDemo")}
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={20} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
