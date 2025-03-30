import { Mail, Phone, MapPin } from "lucide-react";

import { env } from "@/lib/env";
import { cardStyles, fontSize, fontWeight, textColor } from "../styles/theme";
import { generateMessageWhatsapp } from "@/lib/generate-message-whatsapp";
import { useTranslation } from "react-i18next";

type Props = { title: string; subtitle: string; index: number };

const EMAIL_CONTACT = env.EMAIL_CONTACT || "contato@bytefulcode.tech";
const PHONE_NUMBER = env.PHONE_NUMBER || "5541992190528";
const MAP_COORDINATES = env.MAP_COORDINATES || "-25.4322266,-49.2811471";

export function ContactCard({ title, subtitle, index }: Props) {
  const { i18n } = useTranslation("common");

  // Obtém o idioma atual ou usa português como padrão
  const currentLang =
    (i18n.language?.substring(0, 2) as "pt" | "en" | "es") || "pt";

  const message = generateMessageWhatsapp(currentLang);

  const keys: {
    [key: number]: { title: string; href: string; icon: React.ReactNode };
  } = {
    0: {
      title: EMAIL_CONTACT,
      href: `mailto:${EMAIL_CONTACT}`,
      icon: <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
    },
    1: {
      title: PHONE_NUMBER,
      href: `https://wa.me/${PHONE_NUMBER}?text=${message}`,
      icon: <Phone className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
    },
    2: {
      title: "Localização",
      href: `https://maps.google.com/?q=${MAP_COORDINATES}&z=12`,
      icon: <MapPin className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
    },
  };

  const generateValues = (index: number) => {
    return {
      title: keys[index].title,
      href: keys[index].href,
      icon: keys[index].icon,
    };
  };

  return (
    <div
      className={`${cardStyles.default} p-8 text-center flex flex-col items-center justify-between`}
    >
      <div className="flex flex-col items-center">
        <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
          {generateValues(index).icon}
        </div>
        <h3
          className={`${fontSize.xl} ${fontWeight.semibold} ${textColor.primary} mb-2`}
        >
          {title}
        </h3>
        <p className={`${textColor.secondary} mb-4`}>{subtitle}</p>
      </div>
      <a
        href={generateValues(index).href}
        target="_blank"
        className={`${textColor.accent} ${fontWeight.medium} hover:underline`}
      >
        {generateValues(index).title}
      </a>
    </div>
  );
}
