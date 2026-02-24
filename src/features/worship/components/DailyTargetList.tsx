import {
  SunIcon,
  CloudIcon,
  MoonIcon,
  BookOpenIcon,
  MoonStarIcon,
  HeartIcon,
} from "lucide-react";

// Data statis untuk target harian
const DAILY_TARGETS = [
  {
    id: 1,
    title: "Sholat Dhuha",
    subtitle: "Pagi - Siang",
    icon: SunIcon,
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
  {
    id: 2,
    title: "Dzikir Pagi",
    subtitle: "Setelah Subuh",
    icon: CloudIcon,
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    id: 3,
    title: "Dzikir Petang",
    subtitle: "Setelah Ashar",
    icon: MoonIcon,
    color: "text-purple-500",
    bg: "bg-purple-50",
  },
  {
    id: 4,
    title: "Baca Al-Quran",
    subtitle: "Kapanpun",
    icon: BookOpenIcon,
    color: "text-emerald-500",
    bg: "bg-emerald-50",
  },
  {
    id: 5,
    title: "Sholat Tahajjud",
    subtitle: "1/3 Malam",
    icon: MoonStarIcon,
    color: "text-indigo-500",
    bg: "bg-indigo-50",
  },
  {
    id: 6,
    title: "Sedekah Subuh",
    subtitle: "Pagi Hari",
    icon: HeartIcon,
    color: "text-pink-500",
    bg: "bg-pink-50",
  },
];

export const DailyTargetList = () => {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
        Target Harian
      </h3>

      {DAILY_TARGETS.map((target) => {
        const Icon = target.icon;

        return (
          <div
            key={target.id}
            className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer group">
            <div className="flex items-center gap-4">
              <div
                className={`w-10 h-10 rounded-full ${target.bg} flex items-center justify-center ${target.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800">
                  {target.title}
                </p>
                <p className="text-xs text-gray-400">{target.subtitle}</p>
              </div>
            </div>

            {/* Checkbox circle kosong (bisa dikembangkan jadi interaktif nanti) */}
            <div className="w-6 h-6 rounded-full border-2 border-gray-200 group-hover:border-emerald-500 transition-colors" />
          </div>
        );
      })}
    </div>
  );
};
