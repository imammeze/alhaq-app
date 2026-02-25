import { CheckIcon, CheckCircle2Icon } from "lucide-react";
import { PrayerEntity } from "../types";

interface PrayerIconsRowProps {
  prayers: PrayerEntity[];
  completedIds: string[];
  onToggle: (id: string) => void;
  onCompleteAll: () => void;
}

export const PrayerIconsRow = ({
  prayers,
  completedIds,
  onToggle,
  onCompleteAll,
}: PrayerIconsRowProps) => {
  const isAllCompleted =
    prayers.length > 0 && completedIds.length === prayers.length;

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between w-full">
        {prayers.map((prayer) => {
          const isActive = completedIds.includes(prayer.id);
          const Icon = prayer.icon;

          return (
            <button
              key={prayer.id}
              onClick={() => onToggle(prayer.id)}
              className="flex flex-col items-center gap-2 group transition-transform active:scale-95">
              <div
                className={`relative w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
                  isActive
                    ? "border-amber-400 text-amber-500 bg-amber-50/50 shadow-sm ring-2 ring-amber-100"
                    : "border-gray-100 text-gray-300 bg-white group-hover:bg-gray-50"
                }`}>
                <Icon className="w-5 h-5" />
                {isActive && (
                  <div className="absolute -top-1 -right-1 bg-amber-500 rounded-full p-[2px] border-2 border-white animate-in zoom-in">
                    <CheckIcon className="w-2 h-2 text-white" />
                  </div>
                )}
              </div>
              <span
                className={`text-[10px] font-medium transition-colors ${
                  isActive ? "text-amber-600" : "text-gray-400"
                }`}>
                {prayer.label}
              </span>
            </button>
          );
        })}
      </div>

      {!isAllCompleted ? (
        <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-2 duration-300">
          <p className="text-[10px] text-gray-400 mt-6 mb-3 text-center">
            Tap icon untuk menandai solat
          </p>

          <button
            onClick={onCompleteAll}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#ecfdf5] text-[#065f46] rounded-full text-xs font-bold hover:bg-[#d1fae5] transition-colors active:scale-95 shadow-sm border border-[#d1fae5]">
            <CheckCircle2Icon className="w-4 h-4" />
            Selesai Semua
          </button>
        </div>
      ) : (
        <div className="mt-6 animate-in zoom-in duration-300">
          <p className="text-xs font-bold text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full">
            Alhamdulillah, Lengkap! ✨
          </p>
        </div>
      )}
    </div>
  );
};
