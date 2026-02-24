import { HistoryIcon, DownloadIcon, MapPinIcon } from "lucide-react";

export const HeaderSection = () => {
  return (
    <header className="px-5 pt-6 pb-4 bg-white sticky top-0 z-10 shadow-sm">
      {/* Top Bar: Title & Actions */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold text-gray-800">Solatku</h1>

        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg bg-gray-50 text-gray-400 hover:bg-gray-100 transition-colors">
            <HistoryIcon className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-lg bg-gray-50 text-gray-400 hover:bg-gray-100 transition-colors">
            <DownloadIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Info Chips: Location & Date */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-900 text-white rounded-full text-xs font-medium">
          <MapPinIcon className="w-3 h-3" />
          <span>Purwokerto</span>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium">
          <span>3 Ramadan 1447 H</span>
        </div>
      </div>

      {/* Banner */}
      <div className="bg-emerald-900 rounded-xl p-4 flex items-center justify-between text-white shadow-lg shadow-emerald-900/20">
        <span className="font-bold text-sm">Jadwal Sholat</span>
        <span className="text-xs text-emerald-200 cursor-pointer hover:text-white transition">
          Panduan Sholat
        </span>
      </div>
    </header>
  );
};
