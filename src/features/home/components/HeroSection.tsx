import { MapPinIcon } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="px-5 mt-2">
      <div className="bg-[#064e3b] rounded-3xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-2 mb-6">
          <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-lg">
            <MapPinIcon className="w-3 h-3 text-emerald-300" />
            <span className="text-xs font-medium">Purwokerto</span>
          </div>
          <span className="text-xs text-emerald-200/80">2 Ramadan 1447 H</span>
        </div>

        <p className="text-xs text-emerald-200 uppercase tracking-wider">
          Sholat Berikutnya
        </p>
        <h2 className="text-3xl font-bold mb-2">Dhuhr</h2>
        <h1 className="text-5xl font-bold tracking-tight">00:57:20</h1>
      </div>
    </div>
  );
}
