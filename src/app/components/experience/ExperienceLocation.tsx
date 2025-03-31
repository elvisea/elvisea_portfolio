import { MapPin } from "lucide-react";
import { textColor } from "@/app/styles/theme";

type Props = {
  location: string;
};

export function ExperienceLocation({ location }: Props) {
  return (
    <div className="flex items-center gap-2">
      <MapPin className="h-5 w-5 text-gray-400 flex-shrink-0" />
      <span className={textColor.secondary}>{location}</span>
    </div>
  );
}
