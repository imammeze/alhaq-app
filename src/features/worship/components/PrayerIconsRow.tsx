import { CheckIcon } from "lucide-react";
import { PrayerEntity } from "../types";

interface PrayerIconsRowProps {
  prayers: PrayerEntity[];
  completedIds: string[];
}

export const PrayerIconsRow = ({
  prayers,
  completedIds,
}: PrayerIconsRowProps) => {
  return (
    <div className="flex justify-between">
      {prayers.map((prayer) => {
        const isActive = completedIds.includes(prayer.id);
        const Icon = prayer.icon;

        return (
          <div key={prayer.id} className="flex flex-col items-center gap-2">
            <div
              className={`relative w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
                isActive
                  ? "border-amber-400 text-amber-500 bg-amber-50/50 shadow-sm ring-2 ring-amber-100"
                  : "border-gray-100 text-gray-300 bg-white"
              }`}>
              <Icon className="w-5 h-5" />
              {isActive && (
                <div className="absolute -top-1 -right-1 bg-amber-500 rounded-full p-[2px] border-2 border-white">
                  <CheckIcon className="w-2 h-2 text-white" />
                </div>
              )}
            </div>
            <span
              className={`text-[10px] font-medium ${
                isActive ? "text-amber-600" : "text-gray-400"
              }`}>
              {prayer.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};
