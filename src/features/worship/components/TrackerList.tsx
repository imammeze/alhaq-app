import { CheckIcon } from "lucide-react";
import { PrayerEntity } from "../types";

interface TrackerListProps {
  prayers: PrayerEntity[];
  completedIds: string[];
  onToggle: (id: string) => void;
}

export const TrackerList = ({
  prayers,
  completedIds,
  onToggle,
}: TrackerListProps) => {
  return (
    <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100 space-y-1">
      {prayers.map((prayer) => {
        const isCompleted = completedIds.includes(prayer.id);
        const Icon = prayer.icon;

        return (
          <button
            key={prayer.id}
            onClick={() => onToggle(prayer.id)}
            className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 group ${
              isCompleted ? "bg-emerald-50/80" : "hover:bg-gray-50 bg-white"
            }`}>
            <div className="flex items-center gap-4">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                  isCompleted
                    ? "bg-emerald-800 text-white"
                    : "bg-gray-100 text-gray-400"
                }`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p
                  className={`text-sm font-bold ${
                    isCompleted ? "text-emerald-900" : "text-gray-800"
                  }`}>
                  {prayer.label}
                </p>
                {isCompleted && (
                  <p className="text-[10px] text-emerald-600 font-medium">
                    Selesai
                  </p>
                )}
              </div>
            </div>
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                isCompleted
                  ? "bg-emerald-800 border-emerald-800"
                  : "border-gray-200"
              }`}>
              {isCompleted && <CheckIcon className="w-3.5 h-3.5 text-white" />}
            </div>
          </button>
        );
      })}
    </div>
  );
};
