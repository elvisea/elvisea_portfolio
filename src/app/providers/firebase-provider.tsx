"use client";

import { useEffect } from "react";
import { isSupported } from "firebase/analytics";

import { Logger } from "@/lib/logger";
import { firebaseService } from "@/lib/firebase-config";

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const initializeAnalytics = async () => {
      try {
        const supported = await isSupported();
        const analytics = firebaseService.getAnalytics();

        if (supported && analytics) {
          Logger.info("Firebase Analytics inicializado com sucesso!", {
            prefix: "Firebase",
          });

          // Registra o evento de inicialização
          firebaseService.logEvent("app_initialized", {
            timestamp: new Date().toISOString(),
            environment: process.env.NODE_ENV,
          });
        } else {
          Logger.warn("Firebase Analytics não é suportado neste ambiente", {
            prefix: "Firebase",
          });
        }
      } catch (error) {
        Logger.error(
          `Erro ao inicializar Firebase Analytics: ${error instanceof Error ? error.message : "Erro desconhecido"}`,
          { prefix: "Firebase" },
        );
      }
    };

    initializeAnalytics();
  }, []);

  return <>{children}</>;
}
