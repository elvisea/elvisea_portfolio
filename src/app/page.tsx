"use client";

import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Experiencies } from "./components/Experiencies";
import { Portfolio } from "./components/Portfolio";
import { LinkedInProfile } from "./components/LinkedInProfile";
import { Contact } from "./components/Contact";
import { WhatsAppButton } from "./components/WhatsAppButton";

import { usePageTracking } from "@/hooks/usePageTracking";

export default function Home() {
  usePageTracking({
    pageTitle: "Home",
    pagePath: "/",
  });

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Experiencies />
        <Portfolio />
        <LinkedInProfile />
        <Contact />
      </main>
      <WhatsAppButton />
    </>
  );
}
