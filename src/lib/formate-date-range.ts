import { ptBR } from "date-fns/locale";
import { formatDistanceStrict, format } from "date-fns";

export function formatDateRange(startDate: string, endDate: string | null) {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();

  const startFormatted = format(start, "MMM yyyy", { locale: ptBR });
  const endFormatted = endDate
    ? format(end, "MMM yyyy", { locale: ptBR })
    : "Presente";

  const duration = formatDistanceStrict(start, end, {
    locale: ptBR,
    addSuffix: false,
    unit: endDate ? "month" : "day",
  });

  return {
    startDate: startFormatted,
    endDate: endFormatted,
    duration: duration,
  };
}
