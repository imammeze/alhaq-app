import { SettingsIcon, DownloadIcon } from "lucide-react";

export function RamadanHeader() {
  return (
    <header className="px-5 pt-6 pb-4 bg-gray-50 sticky top-0 z-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Ramadan Tracker</h1>
          <p className="text-xs text-gray-400 mt-1">
            Maksimalkan ibadah di bulan suci
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full bg-white shadow-sm text-gray-400 hover:text-rose-500 transition">
            <SettingsIcon className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-full bg-white shadow-sm text-gray-400 hover:text-rose-500 transition">
            <DownloadIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
