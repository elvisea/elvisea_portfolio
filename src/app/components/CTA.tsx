import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

import { fontSize, fontWeight } from "../styles/theme";
import { useClickTracking } from "@/hooks/useClickTracking";

type Props = {
  title: string;
  subtitle: string;
  button: string;
};

function CTA({ title, subtitle, button }: Props) {
  const handleClick = useClickTracking({
    type: "button",
    data: {
      label: button,
      category: "cta",
      section: "main",
      component: "cta_button",
      action: "click_contact",
      elementId: "cta-contact-button",
      elementState: "active",
      elementPosition: "bottom",
      url: "/contact",
      analyticsGroupId: "conversion",
    },
  });

  return (
    <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl shadow-xl overflow-hidden">
      <div className="p-8 sm:p-10 text-center">
        <h3 className={`${fontSize["2xl"]} ${fontWeight.bold} text-white mb-4`}>
          {title}
        </h3>
        <p className="text-blue-100 mb-8 max-w-2xl mx-auto">{subtitle}</p>
        <Link href="/contact" passHref>
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-blue-50 group w-full sm:w-auto px-6 sm:px-8"
            onClick={handleClick}
          >
            <span className="truncate">{button}</span>
            <ArrowRight className="ml-2 h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export { CTA };
