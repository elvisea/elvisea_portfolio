import { Contact } from "./components/Contact";
import { FAQ } from "./components/FAQ";
import { Hero } from "./components/Hero";
import { Process } from "./components/Process";
import { Reviews } from "./components/Reviews";
import { ServiceProcessBridge } from "./components/ServiceProcessBridge";
import { Services } from "./components/Services";
// import { Skills } from "./components/Skills";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { Portfolio } from "./components/Portfolio";
import { LinkedInProfile } from "./components/LinkedInProfile";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <LinkedInProfile />
        <Portfolio />
        {/* <Skills /> */}
        {/* <Services />
        <ServiceProcessBridge />
        <Process />
        <Reviews />
        <FAQ />
        <Contact /> */}
      </main>
      <WhatsAppButton />
    </>
  )
}
