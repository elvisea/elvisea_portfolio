'use client'

import { FAQItem } from "../content/page-content"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import {
  textColor,
  sectionStyles,
  sectionHeader,
} from "../styles/theme"

import { useTranslation } from "react-i18next"

export function FAQ() {
  const { t } = useTranslation()

  const items = t("faq.items", { returnObjects: true }) as FAQItem[]

  return (
    <section
      aria-label="Perguntas Frequentes"
      role="region"
      itemScope
      itemType="https://schema.org/FAQPage"
      id="faq"
      className={sectionStyles.primary}
    >
      <div className="container mx-auto px-4">
        <div className={sectionHeader.wrapper}>
          <div className={sectionHeader.badge}>
            {t("faq.badge")}
          </div>
          <h2 className={sectionHeader.title}>
            {t("faq.title")}
          </h2>
          <p className={sectionHeader.subtitle}>
            {t("faq.subtitle")}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {items.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200 dark:border-gray-700">
                <AccordionTrigger className={`text-left ${textColor.primary} py-5 text-lg font-medium`}>
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className={`${textColor.secondary} pb-5`}>
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
} 