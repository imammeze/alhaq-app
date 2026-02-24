import PrayerRow from "@/shared/components/PrayerRow";
import { PRAYER_TIMES } from "../constants";

export default function PrayerSchedule() {
  return (
    <div className="px-5 mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          Jadwal Hari Ini
        </h3>
        <button className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-full">
          Lihat Detail
        </button>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 space-y-4">
        {PRAYER_TIMES.map((prayer) => (
          <PrayerRow key={prayer.name} prayer={prayer} />
        ))}
      </div>
    </div>
  );
}
