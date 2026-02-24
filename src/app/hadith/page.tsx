"use client";

import {
  SearchIcon,
  SettingsIcon,
  BookmarkIcon,
  ChevronRightIcon,
} from "lucide-react";

type Collection = {
  name: string;
  count: string;
  active?: boolean;
};

const collections: Collection[] = [
  { name: "HR. Abu Daud", count: "4,419 hadits" },
  { name: "HR. Ahmad", count: "4,305 hadits" },
  { name: "HR. Bukhari", count: "6,638 hadits" },
  { name: "HR. Darimi", count: "2,949 hadits", active: true },
  { name: "HR. Ibnu Majah", count: "4,285 hadits" },
  { name: "HR. Malik", count: "1,587 hadits" },
  { name: "HR. Muslim", count: "4,930 hadits" },
  { name: "HR. Nasai", count: "5,364 hadits" },
  { name: "HR. Tirmidzi", count: "3,625 hadits" },
];

const topics: string[] = [
  "Adab Makan & Minum",
  "Adab Tidur",
  "Tentang Sholat",
  "Kesabaran",
  "Berbakti pada Orang Tua",
  "Menuntut Ilmu",
];

export default function Page() {
  return (
    <div className="pb-24 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="px-5 pt-6 pb-4 bg-white sticky top-0 z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Hadits Nabi</h1>
            <p className="text-xs text-gray-400 mt-1">
              Pedoman hidup kedua setelah Al-Qur'an
            </p>
          </div>
          <button className="p-2 rounded-full bg-gray-50 text-gray-400 hover:bg-gray-100">
            <SettingsIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-white border border-gray-100 p-1 rounded-xl flex mb-4">
          <button className="flex-1 py-2 text-sm font-bold rounded-lg bg-white text-gray-800 shadow-sm flex items-center justify-center gap-2">
            <span className="text-lg">📚</span> Kitab
          </button>
          <button className="flex-1 py-2 text-sm font-bold rounded-lg text-gray-400 flex items-center justify-center gap-2">
            <BookmarkIcon className="w-4 h-4" /> Disimpan
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Cari kitab atau topik..."
            className="w-full bg-gray-50 border-none rounded-xl py-3 pl-10 pr-4 text-sm font-medium text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500/20 outline-none"
          />
        </div>
      </header>

      {/* Topics */}
      <div className="px-5 mt-4">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
          Topik Populer
        </h3>
        <div className="flex flex-wrap gap-2">
          {topics.map((topic) => (
            <button
              key={topic}
              className="px-3 py-1.5 bg-gray-100 rounded-lg text-[10px] font-bold text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 transition-colors">
              {topic}
            </button>
          ))}
        </div>
      </div>

      {/* Collections */}
      <div className="px-5 mt-6 space-y-3">
        {collections.map((item, i) => {
          const isActive = item.active ?? false;

          return (
            <div
              key={i}
              className={`bg-white p-4 rounded-2xl shadow-sm border flex items-center gap-4
              ${
                isActive
                  ? "border-emerald-500 ring-1 ring-emerald-500"
                  : "border-gray-100"
              }`}>
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold
                ${
                  isActive
                    ? "bg-[#064e3b] text-white"
                    : "bg-gray-50 text-gray-600"
                }`}>
                H
              </div>

              <div className="flex-1">
                <h3 className="font-bold text-gray-800">{item.name}</h3>
                <p className="text-xs text-gray-400 mt-0.5">{item.count}</p>
              </div>

              <ChevronRightIcon className="w-5 h-5 text-gray-300" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
