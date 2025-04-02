import { useEffect } from "react";

import { firebaseService } from "@/lib/firebase-config";

interface PageTrackingProps {
  pageTitle: string;
  pagePath: string;
}

interface NavigatorWithConnection extends Navigator {
  connection?: {
    effectiveType?: string;
  };
}

export function usePageTracking({ pageTitle, pagePath }: PageTrackingProps) {
  useEffect(() => {
    // Informações básicas do dispositivo e navegador
    const screenResolution = `${window.screen.width}x${window.screen.height}`;
    const viewportSize = `${window.innerWidth}x${window.innerHeight}`;
    const isDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const connection =
      (navigator as NavigatorWithConnection).connection?.effectiveType ||
      "unknown";

    // Registra o evento de visualização da página
    firebaseService.logEvent("page_view", {
      // Ambiente
      environment: process.env.NODE_ENV,

      // Informações da página
      page_title: pageTitle,
      page_path: pagePath,
      page_url: window.location.href,
      timestamp: new Date().toISOString(),

      // Informações do dispositivo e navegador
      screen_resolution: screenResolution,
      viewport_size: viewportSize,
      connection_type: connection,
      is_online: navigator.onLine,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      prefers_dark_mode: isDarkMode,

      // Referência
      referrer: document.referrer || "direct",
    });

    // Registra métricas de performance usando a API moderna
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.entryType === "navigation") {
          const navEntry = entry as PerformanceNavigationTiming;
          firebaseService.logEvent("performance_metrics", {
            environment: process.env.NODE_ENV,
            page_load_time: navEntry.loadEventEnd - navEntry.startTime,
            dom_interactive_time: navEntry.domInteractive - navEntry.startTime,
            dom_complete_time: navEntry.domComplete - navEntry.startTime,
          });
        }
      });
    });

    // Observa métricas de navegação
    observer.observe({ entryTypes: ["navigation"] });

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, [pageTitle, pagePath]);
}
