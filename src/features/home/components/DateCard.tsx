import { ChevronRightIcon } from "lucide-react";

export default function DateCard() {
  return (
    <div className="px-5 mt-4">
      <div className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm border border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700 font-bold text-sm">
            19
          </div>
          <div>
            <p className="text-sm font-bold text-gray-800">
              Kamis, 19 Februari 2026
            </p>
            <p className="text-xs text-gray-400">Ketuk untuk kalender</p>
          </div>
        </div>
        <ChevronRightIcon className="w-5 h-5 text-gray-300" />
      </div>
    </div>
  );
}
