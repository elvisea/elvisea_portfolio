"use client";

import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { env } from "@/lib/env";

const PHONE_NUMBER = env.PHONE_NUMBER || "5541992190528";

export function WhatsAppButton() {
  const { t, i18n } = useTranslation("common");

  const handleWhatsAppClick = () => {
    const messages = {
      pt: "Olá! Tenho uma oportunidade profissional que combina com seu perfil. Podemos conversar?",
      en: "Hello! I have a professional opportunity that matches your profile. Can we talk?",
      es: "¡Hola! Tengo una oportunidad profesional que coincide con tu perfil. ¿Podemos hablar?",
    };

    const currentLang = i18n.language?.substring(0, 2) || "pt";

    const message = encodeURIComponent(
      messages[currentLang as keyof typeof messages] || messages.pt,
    );

    window.open(`https://wa.me/${PHONE_NUMBER}?text=${message}`, "_blank");
  };

  return (
    <Button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 rounded-full w-14 h-14 p-0 bg-green-500 hover:bg-green-600 text-white shadow-lg"
      aria-label={t("whatsapp.ariaLabel")}
    >
      <MessageCircle className="h-6 w-6" />
    </Button>
  );
}
