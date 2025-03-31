import { Calendar } from "lucide-react";
import { textColor } from "@/app/styles/theme";

type Props = {
  startDate: string;
  endDate: string;
  duration: string;
};

export function ExperienceTime({ startDate, endDate, duration }: Props) {
  return (
    <div className="flex items-center gap-2">
      <Calendar className="h-5 w-5 text-gray-400 flex-shrink-0" />
      <span className={`${textColor.secondary}`}>
        {startDate} - {endDate} · {duration}
      </span>
    </div>
  );
}
