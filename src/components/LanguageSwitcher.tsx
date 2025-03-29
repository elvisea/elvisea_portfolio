'use client'

import { useTranslation } from 'react-i18next'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const languages = [
  { code: 'pt', label: '🇧🇷 PT', shortLabel: '🇧🇷 PT' },
  { code: 'en', label: '🇺🇸 EN', shortLabel: '🇺🇸 EN' },
  { code: 'es', label: '🇪🇸 ES', shortLabel: '🇪🇸 ES' }
]

export function LanguageSwitcher({ variant = 'default' }: { variant?: 'default' | 'mobile' }) {
  const { i18n } = useTranslation()

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0]

  return (
    <Select
      defaultValue={i18n.language}
      onValueChange={(value) => i18n.changeLanguage(value)}
    >
      <SelectTrigger
        className={`w-[110px] ${variant === 'mobile' ? 'w-full' : ''}`}
      >
        <SelectValue>
          {variant === 'mobile'
            ? currentLanguage.label
            : currentLanguage.shortLabel
          }
        </SelectValue>
      </SelectTrigger>
      <SelectContent
        className={variant === 'mobile' ? 'w-full' : 'w-[110px]'}
      >
        {languages.map(({ code, label }) => (
          <SelectItem
            key={code}
            value={code}
            className="cursor-pointer"
          >
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
} 