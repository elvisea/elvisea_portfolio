"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { textColor } from "../styles/theme";

import { Button } from "@/components/ui/button";
import { RepositoryCard } from "@/components/RepositoryCard";
import { useRepositories } from "@/hooks/useRepositories";

const ITEMS_PER_PAGE = 9;

export default function ProjectsPage() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const { repositories, isLoading, totalPages } = useRepositories({
    perPage: ITEMS_PER_PAGE,
    page: currentPage,
  });

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-16">
          <Link
            href="/#portfolio"
            className={`inline-flex items-center ${textColor.secondary} hover:text-blue-500 transition-colors mb-6`}
          >
            <ChevronLeft size={20} className="mr-2" />
            {t("projects.backToPortfolio")}
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-200">
            {t("projects.title")}
          </h1>
          <p className={`text-lg ${textColor.secondary} max-w-2xl mx-auto`}>
            {t("projects.subtitle")}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? // Loading skeletons
              Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 h-64 animate-pulse shadow-lg"
                />
              ))
            : // Repository cards
              repositories.map((repository) => (
                <RepositoryCard key={repository.id} repository={repository} />
              ))}
        </div>

        {/* Pagination */}
        {!isLoading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 sm:gap-6 mt-12">
            <Button
              variant="outline"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="w-9 h-9 p-0 sm:w-auto sm:h-auto sm:px-4 sm:py-2"
              title={t("projects.previous")}
            >
              <ChevronLeft size={16} className="sm:mr-2" />
              <span className="hidden sm:inline">{t("projects.previous")}</span>
            </Button>

            <div
              className={`text-sm sm:text-base ${textColor.secondary} min-w-[4.5rem] text-center`}
            >
              <span className="hidden sm:inline">{t("projects.page")}</span>{" "}
              {currentPage} {t("projects.of")} {totalPages}
            </div>

            <Button
              variant="outline"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="w-9 h-9 p-0 sm:w-auto sm:h-auto sm:px-4 sm:py-2"
              title={t("projects.next")}
            >
              <span className="hidden sm:inline">{t("projects.next")}</span>
              <ChevronRight size={16} className="sm:ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
