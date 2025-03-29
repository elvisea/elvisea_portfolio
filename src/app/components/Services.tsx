'use client'

import { useTranslation } from "react-i18next"
import { LucideIcon, Code, Smartphone, PenTool, Search, Layers, Zap } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { sectionHeader, textColor, bgColor, cardStyles } from "../styles/theme"

type Item = {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
}

type ServiceIcon = {
  titles: string[];
  icon: LucideIcon;
}

const serviceIcons: ServiceIcon[] = [
  {
    titles: ["Desenvolvimento Web", "Web Development", "Desarrollo Web"],
    icon: Code
  },
  {
    titles: ["Desenvolvimento Mobile", "Mobile Development", "Desarrollo Móvil"],
    icon: Smartphone
  },
  {
    titles: ["UX/UI Design", "UX/UI Design", "Diseño UX/UI"],
    icon: PenTool
  },
  {
    titles: ["Consultoria Técnica", "Technical Consulting", "Consultoría Técnica"],
    icon: Search
  },
  {
    titles: ["Integrações e APIs", "Integrations & APIs", "Integraciones y APIs"],
    icon: Layers
  },
  {
    titles: ["Otimização de Performance", "Performance Optimization", "Optimización de Rendimiento"],
    icon: Zap
  }
]

export function Services() {
  const { t } = useTranslation('common')
  const items = t('services.items', { returnObjects: true }) as Item[];

  const getIcon = (title: string) => {
    const service = serviceIcons.find(service => service.titles.includes(title))
    return service ? <service.icon className={`h-6 w-6 ${textColor.accent}`} /> : null
  }

  return (
    <section
      aria-label="Nossos Serviços"
      role="region"
      id="services"
      itemScope
      itemType="https://schema.org/Service"
      className={`min-h-screen flex items-center py-24 ${bgColor.secondary}`}
    >
      <div className="container mx-auto px-4">
        <div className={sectionHeader.wrapper}>
          <div className={sectionHeader.badge}>
            {t('services.badge')}
          </div>
          <h2 className={sectionHeader.title}>
            {t('services.title')}
          </h2>
          <p className={sectionHeader.subtitle}>
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {items.map((item, index) => (
            <Card key={index} className={cardStyles.bordered}>
              <CardHeader className="pb-2">
                <div className={`w-12 h-12 rounded-full ${bgColor.accentLight} flex items-center justify-center mb-4`}>
                  {getIcon(item.title)}
                </div>
                <CardTitle className={textColor.primary}>{item.title}</CardTitle>
                <CardDescription className={textColor.tertiary}>
                  {item.subtitle}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className={textColor.secondary}>
                  {item.description}
                </p>
                <ul className="mt-4 space-y-2">
                  {item.features.map((feature, idx) => (
                    <li key={idx} className={`flex items-start ${textColor.secondary}`}>
                      <span className={`mr-2 mt-1 ${textColor.accent}`}>•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
} 