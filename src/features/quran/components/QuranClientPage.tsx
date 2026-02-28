"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SearchIcon, HistoryIcon, BookmarkIcon } from "lucide-react";
import { Surah } from "@/shared/types/quran";
import { SearchOverlay } from "./SearchOverlay";
import { BookmarkModal } from "./BookmarkModal";
import { useQuranStorage } from "../hooks/useQuranStorage";

interface QuranClientPageProps {
  surahs: Surah[];
}

export default function QuranClientPage({ surahs }: QuranClientPageProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"surah" | "juz">("surah");

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBookmarkOpen, setIsBookmarkOpen] = useState(false);
  const { lastRead } = useQuranStorage();

  const handleLastReadClick = () => {
    if (lastRead) {
      router.push(`/quran/${lastRead.surahId}#ayat-${lastRead.ayatNumber}`);
    } else {
      setIsBookmarkOpen(true);
    }
  };

  return (
    <div className="pb-24 bg-gray-50 min-h-screen">
      <header className="px-5 pt-6 pb-4 bg-white shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Al-Qur'an</h1>
            <p className="text-xs text-gray-400 mt-1">
              Baca, dengar, dan pelajari
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLastReadClick}
              className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 bg-gray-50 rounded-lg transition active:scale-95"
              title="Terakhir Dibaca">
              <HistoryIcon className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsBookmarkOpen(true)}
              className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 bg-gray-50 rounded-lg transition active:scale-95"
              title="Bookmark & Riwayat">
              <BookmarkIcon className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 bg-gray-50 rounded-lg transition active:scale-95">
              <SearchIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="bg-gray-100 p-1 rounded-xl flex relative">
          <div
            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-lg shadow-sm transition-all duration-300 ${
              activeTab === "juz"
                ? "translate-x-[calc(100%+8px)]"
                : "translate-x-0"
            }`}
          />
          <button
            onClick={() => setActiveTab("surah")}
            className={`flex-1 py-2 text-sm font-bold rounded-lg relative z-10 transition-colors ${
              activeTab === "surah"
                ? "text-emerald-700"
                : "text-gray-400 hover:text-gray-600"
            }`}>
            Surah
          </button>
          <button
            onClick={() => setActiveTab("juz")}
            className={`flex-1 py-2 text-sm font-bold rounded-lg relative z-10 transition-colors ${
              activeTab === "juz"
                ? "text-emerald-700"
                : "text-gray-400 hover:text-gray-600"
            }`}>
            Juz
          </button>
        </div>
      </header>

      <div className="px-5 mt-4">
        {activeTab === "surah" ? (
          <div className="space-y-3 animate-in slide-in-from-left-4 duration-300">
            {surahs.map((surah) => (
              <Link
                href={`/quran/${surah.nomor}`}
                key={surah.nomor}
                className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:border-emerald-500 transition-all active:scale-[0.99]">
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-sm font-bold text-emerald-700 relative">
                  <div className="absolute inset-0 border-2 border-emerald-100 rounded-xl rotate-45 scale-75"></div>
                  <span className="relative z-10">{surah.nomor}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">{surah.namaLatin}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {surah.arti} • {surah.jumlahAyat} Ayat
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span
                    className="font-serif text-xl text-gray-800 font-bold"
                    dir="rtl">
                    {surah.nama}
                  </span>
                  <span className="text-[10px] text-gray-400 px-2 py-0.5 bg-gray-50 rounded-md border border-gray-100">
                    {surah.tempatTurun}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3 animate-in slide-in-from-right-4 duration-300">
            {Array.from({ length: 30 }, (_, i) => i + 1).map((juz) => (
              <Link
                href={`/quran/juz/${juz}`}
                key={juz}
                className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center aspect-square hover:border-emerald-500 transition cursor-pointer active:scale-95">
                <h3 className="font-bold text-gray-800 text-sm">Juz {juz}</h3>
                <p className="text-[10px] text-gray-400 mt-1">
                  Hal {1 + (juz - 1) * 20}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>

      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        surahs={surahs}
      />

      <BookmarkModal
        isOpen={isBookmarkOpen}
        onClose={() => setIsBookmarkOpen(false)}
      />
    </div>
  );
}
