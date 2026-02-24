"use client";

import { useState } from "react";
import {
  PlusIcon,
  SearchIcon,
  FileTextIcon,
  HistoryIcon,
  SlidersHorizontalIcon,
  FileIcon,
} from "lucide-react";

type TabType = "catatan" | "riwayat";

export default function NotesPage() {
  const [activeTab, setActiveTab] = useState<TabType>("catatan");
  const [activeFilter, setActiveFilter] = useState<string>("Semua");

  return (
    <div className="pb-24 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="px-5 pt-6 pb-4 bg-white sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Catatan Islami</h1>
            <p className="text-xs text-gray-400 mt-1">
              Tulis & simpan catatan Anda
            </p>
          </div>

          <button className="w-10 h-10 bg-[#0e2e25] rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-900/20 hover:bg-[#064e3b] transition-colors">
            <PlusIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-gray-100 p-1 rounded-xl flex mb-4">
          <button
            onClick={() => setActiveTab("catatan")}
            className={`flex-1 py-2.5 text-sm font-bold rounded-lg flex items-center justify-center gap-2 transition-all ${
              activeTab === "catatan"
                ? "bg-white text-[#064e3b] shadow-sm"
                : "text-gray-400 hover:text-gray-600"
            }`}>
            <FileTextIcon className="w-4 h-4" />
            Catatan
          </button>

          <button
            onClick={() => setActiveTab("riwayat")}
            className={`flex-1 py-2.5 text-sm font-bold rounded-lg flex items-center justify-center gap-2 transition-all ${
              activeTab === "riwayat"
                ? "bg-white text-[#064e3b] shadow-sm"
                : "text-gray-400 hover:text-gray-600"
            }`}>
            <HistoryIcon className="w-4 h-4" />
            Riwayat
          </button>
        </div>

        {/* Search & Filter */}
        <div className="flex gap-3 mb-4">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari catatan..."
              className="w-full bg-white border border-gray-100 rounded-xl py-3 pl-12 pr-4 text-sm font-medium text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          <button className="w-12 bg-white border border-gray-100 rounded-xl flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors">
            <SlidersHorizontalIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {["Semua", "Pribadi", "Kajian", "Hafalan"].map((filter) => {
            const isActive = activeFilter === filter;

            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                  isActive
                    ? "bg-[#0e2e25] text-white"
                    : "bg-white border border-gray-100 text-gray-500 hover:bg-gray-50"
                }`}>
                {filter}

                {filter === "Semua" && (
                  <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[8px]">
                    0
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </header>

      {/* Empty State */}
      <div className="flex flex-col items-center justify-center py-20 px-5">
        <div className="w-24 h-24 bg-gray-100 rounded-3xl flex items-center justify-center mb-6">
          <FileIcon className="w-10 h-10 text-gray-300" />
        </div>

        <h3 className="text-lg font-bold text-gray-800 mb-2">
          Belum ada catatan
        </h3>

        <p className="text-sm text-gray-400 text-center mb-8">
          Mulai tulis catatan pertama Anda
        </p>

        <button className="px-6 py-3 bg-[#0e2e25] text-white text-sm font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-900/20 hover:bg-[#064e3b] transition-colors">
          <PlusIcon className="w-4 h-4" />
          Catatan Baru
        </button>
      </div>
    </div>
  );
}
