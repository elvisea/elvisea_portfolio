import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { LinkedInProfile } from "./components/LinkedInProfile";
import { Portfolio } from "./components/Portfolio";
import { Contact } from "./components/Contact";
import { WhatsAppButton } from "./components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <LinkedInProfile />
        <Portfolio />
        <Contact />
      </main>
      <WhatsAppButton />
    </>
  );
}
