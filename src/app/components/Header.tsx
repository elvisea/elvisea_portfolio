"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useTranslation } from "react-i18next";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { ModeToggle } from "./ModeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { content } from "../content/page-content";
import { textColor } from "../styles/theme";

export function Header() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => {
    setIsSheetOpen(false);
  };

  const menuItems = [
    { href: "/", label: t("header.menu.home") },
    { href: "/#experience", label: t("header.menu.experience") },
    { href: "/#portfolio", label: t("header.menu.portfolio") },
    { href: "/#profile", label: t("header.menu.profile") },
    { href: "#contact", label: t("header.menu.contact") },
  ];

  // Não mostrar o header na página de contato
  if (pathname === "/contact") return null;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md py-4 shadow-md"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold text-gray-900 dark:text-white"
          >
            {content.header.logo}
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${textColor.secondary} hover:${textColor.accent} transition-colors`}
              >
                {item.label}
              </Link>
            ))}
            <LanguageSwitcher />
            <ModeToggle />
          </nav>

          {/* Mobile Menu */}
          <div className="flex items-center lg:hidden gap-4">
            <ModeToggle />
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <button className="text-gray-700 dark:text-gray-300">
                  <Menu size={24} />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
                <div className="flex flex-col h-full">
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <SheetHeader>
                      <SheetTitle className="text-left text-xl">
                        {content.header.logo}
                      </SheetTitle>
                      <SheetDescription className="text-left">
                        {t("header.menu.description")}
                      </SheetDescription>
                    </SheetHeader>
                  </div>
                  <nav className="flex-1 p-6 flex flex-col space-y-6">
                    {menuItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`${textColor.secondary} hover:${textColor.accent} transition-colors text-lg`}
                        onClick={handleLinkClick}
                      >
                        {item.label}
                      </Link>
                    ))}
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <LanguageSwitcher variant="mobile" />
                    </div>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
