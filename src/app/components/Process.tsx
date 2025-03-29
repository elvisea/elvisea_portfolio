'use client'

import { useTranslation } from "react-i18next"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { ProcessStep } from "../content/page-content"
import { sectionHeader, textColor, bgColor, cardStyles } from "../styles/theme"

export function Process() {

  const { t } = useTranslation()
  const steps = t("process.steps", { returnObjects: true }) as ProcessStep[]

  return (
    <section
      aria-label="Nosso Processo"
      role="region"
      id="process"
      className={`min-h-screen flex items-center py-24 ${bgColor.primary}`}
    >
      <div className="container mx-auto px-4">
        <div className={sectionHeader.wrapper}>
          <div className={sectionHeader.badge}>
            {t("process.badge")}
          </div>
          <h2 className={sectionHeader.title}>
            {t("process.title")}
          </h2>
          <p className={sectionHeader.subtitle}>
            {t("process.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <Card key={index} className={cardStyles.bordered}>
              <CardHeader className="pb-2">
                <div className={`w-10 h-10 rounded-full ${bgColor.accentLight} flex items-center justify-center mb-4`}>
                  <span className={`${textColor.accent} font-bold`}>{index + 1}</span>
                </div>
                <CardTitle className={textColor.primary}>{step.title}</CardTitle>
                <CardDescription className={textColor.tertiary}>
                  {step.subtitle}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className={textColor.secondary}>
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mensagem de processo contínuo */}
        <div className="text-center mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800 max-w-3xl mx-auto">
          <p className={textColor.accent}>
            {t("process.footer")}
          </p>
        </div>
      </div>
    </ section>
  )
} 