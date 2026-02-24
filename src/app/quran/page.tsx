"use client";

import { useState } from "react";
import { SearchIcon, BookOpenIcon } from "lucide-react";

type TabType = "surah" | "juz";

const surahs = [
  {
    number: 1,
    name: "Al-Fatihah",
    arabic: "الفاتحة",
    verses: 7,
    meaning: "Pembukaan",
  },
  {
    number: 2,
    name: "Al-Baqarah",
    arabic: "البقرة",
    verses: 286,
    meaning: "Sapi",
  },
  {
    number: 3,
    name: "Ali 'Imran",
    arabic: "آل عمران",
    verses: 200,
    meaning: "Keluarga Imran",
  },
  {
    number: 4,
    name: "An-Nisa",
    arabic: "النساء",
    verses: 176,
    meaning: "Wanita",
  },
  {
    number: 5,
    name: "Al-Ma'idah",
    arabic: "المائدة",
    verses: 120,
    meaning: "Hidangan",
  },
  {
    number: 6,
    name: "Al-An'am",
    arabic: "الأنعام",
    verses: 165,
    meaning: "Binatang Ternak",
  },
  {
    number: 7,
    name: "Al-A'raf",
    arabic: "الأعراف",
    verses: 206,
    meaning: "Tempat Tertinggi",
  },
  {
    number: 8,
    name: "Al-Anfal",
    arabic: "الأنفال",
    verses: 75,
    meaning: "Rampasan Perang",
  },
  {
    number: 9,
    name: "At-Tawbah",
    arabic: "التوبة",
    verses: 129,
    meaning: "Pengampunan",
  },
  { number: 10, name: "Yunus", arabic: "يونس", verses: 109, meaning: "Yunus" },
];

export default function Page() {
  const [activeTab, setActiveTab] = useState<TabType>("surah");

  return (
    <div className="pb-24 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="px-5 pt-6 pb-4 bg-white sticky top-0 z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Al-Qur'an</h1>
            <p className="text-xs text-gray-400 mt-1">
              Baca, dengar, dan pelajari
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <SearchIcon className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <BookOpenIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-gray-100 p-1 rounded-xl flex">
          <button
            onClick={() => setActiveTab("surah")}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
              activeTab === "surah"
                ? "bg-white text-gray-800 shadow-sm"
                : "text-gray-400"
            }`}>
            Surah
          </button>

          <button
            onClick={() => setActiveTab("juz")}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
              activeTab === "juz"
                ? "bg-white text-gray-800 shadow-sm"
                : "text-gray-400"
            }`}>
            Juz
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="px-5 mt-4">
        {activeTab === "surah" ? (
          <div className="space-y-3">
            {surahs.map((surah) => (
              <div
                key={surah.number}
                className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-sm font-bold text-gray-600">
                  {surah.number}
                </div>

                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">{surah.name}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {surah.meaning} • {surah.verses} Ayat
                  </p>
                </div>

                <span className="font-arabic text-xl text-emerald-600">
                  {surah.arabic}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3">
            {Array.from({ length: 30 }, (_, i) => i + 1).map((juz) => (
              <div
                key={juz}
                className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center aspect-square">
                <h3 className="font-bold text-gray-800 text-sm">Juz {juz}</h3>
                <p className="text-[10px] text-gray-400 mt-1">
                  Halaman {1 + (juz - 1) * 20}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
