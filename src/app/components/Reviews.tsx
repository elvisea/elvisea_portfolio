'use client'

import { useTranslation } from "react-i18next"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

import { TestimonialItem } from "../content/page-content"
import { sectionHeader, textColor, bgColor, cardStyles } from "../styles/theme"

export function Reviews() {

  const { t } = useTranslation()

  const items = t("testimonials.items", { returnObjects: true }) as TestimonialItem[]

  return (
    <section
      aria-label="Depoimentos"
      role="region"
      itemScope
      itemType="https://schema.org/Review"
      id="testimonials"
      className={`min-h-screen flex items-center py-24 ${bgColor.secondary}`}
    >
      <div className="container mx-auto px-4">
        <div className={sectionHeader.wrapper}>
          <div className={sectionHeader.badge}>
            {t("testimonials.badge")}
          </div>
          <h2 className={sectionHeader.title}>
            {t("testimonials.title")}
          </h2>
          <p className={sectionHeader.subtitle}>
            {t("testimonials.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.slice(0, 3).map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ReviewCard({ review }: { review: TestimonialItem }) {
  return (
    <Card className={`${cardStyles.bordered} flex flex-col h-full`}>
      <CardContent className="p-6 flex-grow flex flex-col">
        <p className={`${textColor.secondary} flex-grow line-clamp-6`}>
          {review.text}
        </p>
      </CardContent>

      <CardFooter className="px-6 py-5 border-t border-gray-100 dark:border-gray-700 mt-auto">
        <div className="flex items-center gap-4">
          <Avatar className={`h-10 w-10 ${bgColor.accentLight} ${textColor.accent}`}>
            <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
          </Avatar>

          <div>
            <div className={`font-medium ${textColor.primary}`}>
              {review.name}
            </div>
            <div className={`text-sm ${textColor.tertiary}`}>
              {review.role}, {review.company}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
} 