import { HistoryIcon, DownloadIcon, MapPinIcon } from "lucide-react";

interface HeaderSectionProps {
  city: string;
  hijriDate: string;
  activeTab: "schedule" | "guide";
  onTabChange: (tab: "schedule" | "guide") => void;
}

export const HeaderSection = ({
  city,
  hijriDate,
  activeTab,
  onTabChange,
}: HeaderSectionProps) => {
  return (
    <header className="px-5 pt-6 pb-4 bg-white z-20 shadow-sm">
      {/* Top Bar */}
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

      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-900 text-white rounded-full text-xs font-medium">
          <MapPinIcon className="w-3 h-3" />
          <span>{city}</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium">
          <span>{hijriDate}</span>
        </div>
      </div>

      <div className="bg-gray-100 p-1 rounded-xl flex relative">
        <div
          className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-[#064e3b] rounded-lg shadow-sm transition-all duration-300 ease-spring ${
            activeTab === "guide"
              ? "translate-x-[calc(100%+8px)]"
              : "translate-x-0"
          }`}
        />

        <button
          onClick={() => onTabChange("schedule")}
          className={`flex-1 py-2.5 text-xs font-bold rounded-lg relative z-10 transition-colors duration-300 ${
            activeTab === "schedule"
              ? "text-white"
              : "text-gray-500 hover:text-gray-700"
          }`}>
          Jadwal Sholat
        </button>
        <button
          onClick={() => onTabChange("guide")}
          className={`flex-1 py-2.5 text-xs font-bold rounded-lg relative z-10 transition-colors duration-300 ${
            activeTab === "guide"
              ? "text-white"
              : "text-gray-500 hover:text-gray-700"
          }`}>
          Panduan Sholat
        </button>
      </div>
    </header>
  );
};
