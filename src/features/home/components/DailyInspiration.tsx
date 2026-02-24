import { Share2Icon } from "lucide-react";

export default function DailyInspiration() {
  return (
    <div className="px-5 mt-6 mb-6">
      <h3 className="text-xs font-bold text-gray-400 uppercase mb-4">
        Inspirasi Harian
      </h3>

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 relative">
        <p className="text-xs text-emerald-600 font-bold mb-4 uppercase">
          Doa Sapu Jagat
        </p>

        <p
          className="text-2xl text-right leading-loose text-gray-800 mb-6"
          dir="rtl">
          رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً
        </p>

        <button className="absolute top-5 right-5 text-gray-400">
          <Share2Icon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
