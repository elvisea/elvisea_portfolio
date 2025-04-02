import { useCallback } from "react";

import { firebaseService } from "@/lib/firebase-config";

export type SocialNetwork = "github" | "linkedin" | "whatsapp";

export type SocialTrackingProps = {
  network: SocialNetwork;
  url: string;
};

export function useSocialTracking({ network, url }: SocialTrackingProps) {
  const handleSocialClick = useCallback(() => {
    // Coleta informações do contexto
    const currentPath = window.location.pathname;
    const timestamp = new Date().toISOString();
    const timeOnPage = Math.floor(performance.now() / 1000); // Tempo em segundos

    // Registra o evento de clique em rede social
    firebaseService.logEvent("social_click", {
      // Informações do ambiente
      environment: process.env.NODE_ENV,

      // Informações da rede social
      network,
      url,

      // Contexto da interação
      source_page: currentPath,
      timestamp,
      time_on_page: timeOnPage,

      // Informações do dispositivo
      device_type: /Mobile|Android|iPhone/i.test(window.navigator.userAgent)
        ? "mobile"
        : "desktop",
      screen_size: `${window.innerWidth}x${window.innerHeight}`,

      // Contexto do usuário
      language: window.navigator.language,
      is_online: navigator.onLine,

      // Sessão
      session_id:
        sessionStorage.getItem("session_started") || Date.now().toString(),
    });

    // Registra também como evento específico da rede social
    firebaseService.logEvent(`${network}_click`, {
      environment: process.env.NODE_ENV,
      source_page: currentPath,
      timestamp,
      url,
    });
  }, [network, url]);

  return handleSocialClick;
}
