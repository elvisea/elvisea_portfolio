import "./globals.css";

import type { Viewport } from "next";
import { Inter } from "next/font/google";

import I18nProvider from "@/i18n/I18nProvider";
import { ThemeProvider } from "next-themes";
import { FirebaseProvider } from "./providers/firebase-provider";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <FirebaseProvider>
          <I18nProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </I18nProvider>
        </FirebaseProvider>
      </body>
    </html>
  );
}
