"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";

import ReactMarkdown from "react-markdown";
import { useTranslation } from "react-i18next";

import {
  ExternalLink,
  GithubIcon,
  Star,
  GitFork,
  Eye,
  ChevronLeft,
  Calendar,
} from "lucide-react";

import { format } from "date-fns";
import { ptBR, enUS, es } from "date-fns/locale";

import { Button } from "@/components/ui/button";
import { textColor, bgColor, buttonStyles } from "../../styles/theme";

import {
  fetchRepositoryDetails,
  type RepositoryDetails,
} from "@/app/actions/github";

interface ProjectPageProps {
  params: Promise<{
    name: string;
  }>;
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const { t, i18n } = useTranslation();
  const { name } = use(params);

  const [repository, setRepository] = useState<RepositoryDetails | null>(null);
  const [readme, setReadme] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  const dateLocales = {
    pt: ptBR,
    en: enUS,
    es: es,
  };

  useEffect(() => {
    async function loadRepositoryDetails() {
      try {
        const { repository: repoData, readme: readmeData } =
          await fetchRepositoryDetails(name);
        setRepository(repoData);
        setReadme(readmeData);
      } catch (error) {
        console.error("Error loading repository details:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadRepositoryDetails();
  }, [name]);

  if (isLoading) {
    return (
      <div className="min-h-screen py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!repository) {
    return (
      <div className="min-h-screen py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h1 className={`text-2xl ${textColor.primary} mb-4`}>
            {t("projects.notFound")}
          </h1>
          <Link href="/projects">
            <Button variant="outline">{t("projects.backToProjects")}</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        {/* Navigation */}
        <div className="mb-12">
          <Link
            href="/projects"
            className={`inline-flex items-center ${textColor.secondary} hover:${textColor.accent} transition-colors mb-6`}
          >
            <ChevronLeft size={20} className="mr-2" />
            {t("projects.backToProjects")}
          </Link>
        </div>

        {/* Project Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-200">
            {repository.name}
          </h1>
          <p className={`text-lg ${textColor.secondary} mb-6`}>
            {repository.description || t("portfolio.noDescription")}
          </p>

          {/* Project Stats */}
          <div className="flex flex-wrap gap-6 mb-8">
            <div className="flex items-center">
              <Star size={20} className="mr-2 text-yellow-500" />
              <span className={textColor.secondary}>
                {repository.stargazers_count} stars
              </span>
            </div>
            <div className="flex items-center">
              <GitFork size={20} className="mr-2 text-blue-500" />
              <span className={textColor.secondary}>
                {repository.forks_count} forks
              </span>
            </div>
            <div className="flex items-center">
              <Eye size={20} className="mr-2 text-green-500" />
              <span className={textColor.secondary}>
                {repository.watchers_count} watchers
              </span>
            </div>
            <div className="flex items-center">
              <Calendar size={20} className="mr-2 text-purple-500" />
              <span className={textColor.secondary}>
                {format(new Date(repository.created_at), "PP", {
                  locale:
                    dateLocales[i18n.language as keyof typeof dateLocales],
                })}
              </span>
            </div>
          </div>

          {/* Topics */}
          {repository.topics && repository.topics.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {repository.topics.map((topic) => (
                <span
                  key={topic}
                  className={`px-3 py-1 text-sm rounded-full ${bgColor.accentLight} ${textColor.accent} font-medium`}
                >
                  {topic}
                </span>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <a
              href={repository.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className={`${buttonStyles.primary} px-8`}>
                <GithubIcon size={20} className="mr-2" />
                {t("projects.viewOnGithub")}
              </Button>
            </a>
            {repository.homepage && (
              <a
                href={repository.homepage}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" variant="outline" className="px-8">
                  <ExternalLink size={20} className="mr-2" />
                  {t("projects.viewDemo")}
                </Button>
              </a>
            )}
          </div>
        </div>

        {/* README Content */}
        {readme && (
          <div className="prose dark:prose-invert max-w-none">
            <ReactMarkdown>{readme}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
