import { textColor, bgColor } from "@/app/styles/theme";

type Props = {
  label: string;
  items: string[];
  maxItems?: number;
  showCount?: boolean;
};

export function SkillsList({
  label,
  items,
  maxItems,
  showCount = false,
}: Props) {
  const displayItems = maxItems ? items.slice(0, maxItems) : items;
  const remainingCount = maxItems ? items.length - maxItems : 0;

  return (
    <div>
      <h3 className={`text-lg font-semibold ${textColor.primary} mb-3`}>
        {label}
      </h3>
      <div className="flex flex-wrap gap-2">
        {displayItems.map((item) => (
          <span
            key={item}
            className={`px-3 py-1 rounded-full ${bgColor.accentLight} ${textColor.accent} text-sm font-medium`}
          >
            {item}
          </span>
        ))}
        {showCount && remainingCount > 0 && (
          <span
            className={`px-3 py-1 rounded-full ${bgColor.accentLight} ${textColor.accent} text-sm font-medium`}
          >
            +{remainingCount}
          </span>
        )}
      </div>
    </div>
  );
}
