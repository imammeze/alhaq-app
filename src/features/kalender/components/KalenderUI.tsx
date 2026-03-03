import {
  ArrowLeftIcon,
  SettingsIcon,
  CalendarIcon,
  DownloadIcon,
  CheckIcon,
  PencilIcon,
} from "lucide-react";
import Link from "next/link";

export function KalenderHeader() {
  return (
    <header className="px-5 pt-6 pb-4 bg-white sticky top-0 z-20 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="p-2 -ml-2 text-gray-800 hover:bg-gray-100 rounded-full transition">
          <ArrowLeftIcon className="w-5 h-5" />
        </Link>
        <h1 className="text-lg font-bold text-gray-800">Kalender Hijriyah</h1>
      </div>
      <div className="flex items-center gap-2">
        <button className="p-2 rounded-full text-gray-400 hover:text-emerald-600 transition">
          <SettingsIcon className="w-5 h-5" />
        </button>
        <button className="p-2 rounded-full text-gray-400 hover:text-emerald-600 transition">
          <CalendarIcon className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}

export function SunnahCard({
  isAyyamulBidh,
  isSeninKamis,
}: {
  isAyyamulBidh: boolean;
  isSeninKamis: boolean;
}) {
  if (!isAyyamulBidh && !isSeninKamis) return null;

  return (
    <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 mb-6">
      <div className="flex items-center gap-2 mb-1.5">
        <span className="text-orange-500">
          <InfoCircleIcon />
        </span>
        <h4 className="text-xs font-bold text-orange-600 uppercase tracking-wider">
          Sunnah Puasa
        </h4>
      </div>
      <p className="text-[11px] text-orange-600/80 font-medium">
        Hari ini adalah{" "}
        {isAyyamulBidh
          ? "Ayyamul Bidh (Pertengahan Bulan)"
          : "Puasa Sunnah Senin Kamis"}
        .
      </p>
    </div>
  );
}

function InfoCircleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}

export function TaskRow({
  title,
  isCompleted,
  onClick,
}: {
  title: string;
  isCompleted: boolean;
  onClick: () => void;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
          <img
            src="https://api.iconify.design/mingcute:mosque-line.svg?color=%239ca3af"
            className="w-4 h-4"
            alt="mosque"
          />
        </div>
        <span
          className={`text-sm font-bold ${
            isCompleted ? "text-gray-400 line-through" : "text-gray-700"
          }`}>
          {title}
        </span>
      </div>
      <button
        onClick={onClick}
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
          isCompleted
            ? "bg-emerald-500 border-emerald-500 text-white"
            : "border-gray-200"
        }`}>
        {isCompleted && <CheckIcon className="w-4 h-4" />}
      </button>
    </div>
  );
}
