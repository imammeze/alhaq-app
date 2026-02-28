"use client";

import { useState } from "react";
import Link from "next/link";
import {
  SearchIcon,
  SettingsIcon,
  BookmarkIcon,
  ChevronRightIcon,
} from "lucide-react";
import { HadithBook } from "@/shared/types/hadith";

const topics: string[] = [
  "Adab Makan & Minum",
  "Adab Tidur",
  "Tentang Sholat",
  "Kesabaran",
  "Berbakti pada Orang Tua",
  "Menuntut Ilmu",
];

interface HadithClientPageProps {
  books: HadithBook[];
}

export default function HadithClientPage({ books }: HadithClientPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"kitab" | "bookmark">("kitab");

  const filteredBooks = books.filter((book) =>
    book.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pb-24 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="px-5 pt-6 pb-4 bg-white shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Hadits Nabi</h1>
            <p className="text-xs text-gray-400 mt-1">
              Pedoman hidup kedua setelah Al-Qur'an
            </p>
          </div>
          <button className="p-2 rounded-full bg-gray-50 text-gray-400 hover:bg-gray-100 transition active:scale-95">
            <SettingsIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-white border border-gray-100 p-1 rounded-xl flex mb-4 relative">
          <div
            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white shadow-sm border border-gray-100 rounded-lg transition-all duration-300 ${
              activeTab === "bookmark"
                ? "translate-x-[calc(100%+8px)]"
                : "translate-x-0"
            }`}
          />

          <button
            onClick={() => setActiveTab("kitab")}
            className={`flex-1 py-2 text-sm font-bold rounded-lg flex items-center justify-center gap-2 relative z-10 transition-colors ${
              activeTab === "kitab" ? "text-gray-800" : "text-gray-400"
            }`}>
            <span className="text-lg">📚</span> Kitab
          </button>

          <button
            onClick={() => setActiveTab("bookmark")}
            className={`flex-1 py-2 text-sm font-bold rounded-lg flex items-center justify-center gap-2 relative z-10 transition-colors ${
              activeTab === "bookmark" ? "text-gray-800" : "text-gray-400"
            }`}>
            <BookmarkIcon className="w-4 h-4" /> Disimpan
          </button>
        </div>

        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari kitab hadits..."
            className="w-full bg-gray-50 border-none rounded-xl py-3 pl-10 pr-4 text-sm font-medium text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500/20 outline-none"
          />
        </div>
      </header>

      {activeTab === "kitab" && (
        <div className="animate-in fade-in slide-in-from-left-4 duration-300">
          {/* Topics */}
          {!searchQuery && (
            <div className="px-5 mt-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                Topik Populer
              </h3>
              <div className="flex flex-wrap gap-2">
                {topics.map((topic) => (
                  <button
                    key={topic}
                    className="px-3 py-1.5 bg-gray-100 rounded-lg text-[10px] font-bold text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 transition-colors active:scale-95">
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="px-5 mt-6 space-y-3">
            {filteredBooks.length === 0 ? (
              <div className="text-center text-sm text-gray-400 py-10">
                Kitab tidak ditemukan
              </div>
            ) : (
              filteredBooks.map((item) => (
                <Link
                  href={`/hadith/${item.id}`}
                  key={item.id}
                  className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:border-emerald-500 transition-colors active:scale-[0.99] group">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold bg-gray-50 text-gray-600 group-hover:bg-[#064e3b] group-hover:text-white transition-colors">
                    H
                  </div>

                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 group-hover:text-[#064e3b] transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {item.available.toLocaleString("id-ID")} hadits
                    </p>
                  </div>

                  <ChevronRightIcon className="w-5 h-5 text-gray-300 group-hover:text-[#064e3b] transition-colors" />
                </Link>
              ))
            )}
          </div>
        </div>
      )}

      {activeTab === "bookmark" && (
        <div className="px-5 mt-10 flex flex-col items-center justify-center opacity-50 animate-in fade-in slide-in-from-right-4 duration-300">
          <BookmarkIcon className="w-12 h-12 text-gray-300 mb-3" />
          <p className="text-sm text-gray-400 font-medium">
            Belum ada hadits tersimpan
          </p>
        </div>
      )}
    </div>
  );
}
