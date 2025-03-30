"use client";

import { useTranslation } from "react-i18next";

import { CTA } from "./CTA";

import { sectionStyles, sectionHeader } from "../styles/theme";

import { ContactCard } from "./contact-card";

export function Contact() {
  const { t } = useTranslation();

  const cards = t("contact.cards", { returnObjects: true }) as {
    title: string;
    subtitle: string;
    icon: string;
  }[];

  return (
    <section
      aria-label="Contato"
      role="region"
      itemScope
      itemType="https://schema.org/ContactPage"
      id="contact"
      className={sectionStyles.gradient}
    >
      <div className="container mx-auto px-4">
        <div className={sectionHeader.wrapper}>
          <div className={sectionHeader.badge}>{t("contact.badge")}</div>
          <h2 className={sectionHeader.title}>{t("contact.title")}</h2>
          <p className={`${sectionHeader.subtitle} mb-12`}>
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cartões de Contato */}
            {cards.map((card, index) => (
              <ContactCard
                index={index}
                key={card.title}
                title={card.title}
                subtitle={card.subtitle}
              />
            ))}
          </div>

          <CTA
            title={t("contact.cta.title")}
            subtitle={t("contact.cta.subtitle")}
            button={t("contact.cta.button")}
          />
        </div>
      </div>
    </section>
  );
}
