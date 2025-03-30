"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

import { env } from "@/lib/env";
import { textColor, bgColor } from "@/app/styles/theme";

interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
}

interface Project {
  name: string;
  description: string;
}

export function LinkedInProfile() {
  const { t } = useTranslation();
  const githubUsername =
    env.NEXT_PUBLIC_GITHUB_URL?.split("/").pop() || "elvisea";
  const githubImage = `https://github.com/${githubUsername}.png`;

  const skills = t("linkedin.sections.technical.skills", {
    returnObjects: true,
  }) as string[];
  const experiences = t("linkedin.sections.experience.items", {
    returnObjects: true,
  }) as Experience[];
  const projects = t("linkedin.sections.projects.items", {
    returnObjects: true,
  }) as Project[];

  return (
    <section
      id="profile"
      className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className={`inline-block mb-3 px-4 py-1 rounded-full ${bgColor.accentLight} ${textColor.accent} text-sm font-medium`}
          >
            {t("linkedin.badge")}
          </div>

          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Image
                src={githubImage}
                alt={env.NEXT_PUBLIC_CREATOR_NAME || "Profile"}
                width={80}
                height={80}
                className="rounded-full ring-4 ring-blue-100 dark:ring-blue-900"
                priority
              />
              <div className="absolute -bottom-2 -right-2 h-6 w-6 bg-green-500 rounded-full ring-4 ring-white dark:ring-gray-800" />
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-200">
            {env.NEXT_PUBLIC_CREATOR_NAME}
          </h2>
          <p className={`text-lg ${textColor.secondary} max-w-2xl mx-auto`}>
            {t("linkedin.sections.introduction.content")}
          </p>
        </div>

        {/* Technical Focus */}
        <div className="mb-12">
          <h3
            className={`text-2xl font-semibold mb-6 ${textColor.primary} text-center`}
          >
            {t("linkedin.sections.technical.title")}
          </h3>
          <div className={`${textColor.secondary} text-center mb-6`}>
            {t("linkedin.sections.technical.content")}
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className={`px-4 py-2 rounded-full ${bgColor.accentLight} ${textColor.accent} text-sm font-medium`}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Experience Timeline */}
        <div className="mb-12">
          <h3
            className={`text-2xl font-semibold mb-6 ${textColor.primary} text-center`}
          >
            {t("linkedin.sections.experience.title")}
          </h3>
          <div className="max-w-3xl mx-auto space-y-8">
            {experiences.map((exp) => (
              <div
                key={exp.role}
                className="relative pl-6 border-l-2 border-blue-500 hover:border-blue-600 transition-colors"
              >
                <h4 className={`font-semibold ${textColor.primary} mb-1`}>
                  {exp.role}
                </h4>
                <p className={`text-sm ${textColor.secondary} mb-2`}>
                  {exp.company} • {exp.period}
                </p>
                <p className={textColor.secondary}>{exp.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="mb-12">
          <h3
            className={`text-2xl font-semibold mb-6 ${textColor.primary} text-center`}
          >
            {t("linkedin.sections.projects.title")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {projects.map((project) => (
              <div
                key={project.name}
                className="group relative h-full bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-700"
              >
                <h4
                  className={`text-xl font-semibold ${textColor.primary} mb-3`}
                >
                  {project.name}
                </h4>
                <p className={`${textColor.secondary} text-sm line-clamp-3`}>
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Availability and Looking For */}
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-12">
          <div>
            <h3 className={`text-2xl font-semibold mb-4 ${textColor.primary}`}>
              {t("linkedin.sections.availability.title")}
            </h3>
            <p className={textColor.secondary}>
              {t("linkedin.sections.availability.content")}
            </p>
          </div>
          <div>
            <h3 className={`text-2xl font-semibold mb-4 ${textColor.primary}`}>
              {t("linkedin.sections.looking.title")}
            </h3>
            <p className={textColor.secondary}>
              {t("linkedin.sections.looking.content")}
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href={env.NEXT_PUBLIC_LINKEDIN_URL || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center px-8 py-3 rounded-full ${bgColor.accent} text-white hover:opacity-90 transition-opacity`}
          >
            {t("linkedin.sections.cta")}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
