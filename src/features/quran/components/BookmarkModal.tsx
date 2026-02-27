"use client";

import { useState } from "react";
import {
  XIcon,
  HistoryIcon,
  BookMarkedIcon,
  Trash2Icon,
  ChevronRightIcon,
} from "lucide-react";
import Link from "next/link";
import { useQuranStorage } from "../hooks/useQuranStorage";

interface BookmarkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookmarkModal = ({ isOpen, onClose }: BookmarkModalProps) => {
  const [activeTab, setActiveTab] = useState<"riwayat" | "bookmark">("riwayat");
  const { history, bookmarks, lastRead, deleteBookmark } = useQuranStorage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="bg-white w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex border-b border-gray-100">
          <button
            onClick={() => setActiveTab("riwayat")}
            className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-colors ${
              activeTab === "riwayat"
                ? "text-[#064e3b] border-b-2 border-[#064e3b]"
                : "text-gray-400 hover:text-gray-600"
            }`}>
            Riwayat
          </button>
          <button
            onClick={() => setActiveTab("bookmark")}
            className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-colors ${
              activeTab === "bookmark"
                ? "text-[#064e3b] border-b-2 border-[#064e3b]"
                : "text-gray-400 hover:text-gray-600"
            }`}>
            Bookmark
          </button>
          <button
            onClick={onClose}
            className="p-4 text-gray-400 hover:bg-gray-50">
            <XIcon className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 h-[400px] overflow-y-auto custom-scrollbar bg-gray-50/50">
          {activeTab === "riwayat" && (
            <div className="space-y-6">
              <div>
                <h4 className="text-[10px] font-bold text-gray-400 uppercase mb-3">
                  Bacaan Hari Ini
                </h4>
                {lastRead ? (
                  <Link
                    href={`/quran/${lastRead.surahId}#ayat-${lastRead.ayatNumber}`}
                    className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between group hover:border-emerald-500 transition">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700">
                        <BookMarkedIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-800">
                          {lastRead.surahName}
                        </p>
                        <p className="text-xs text-gray-500">
                          Ayat {lastRead.ayatNumber}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] text-gray-400">2m lalu</span>
                  </Link>
                ) : (
                  <div className="text-center text-xs text-gray-400 py-4">
                    Belum ada bacaan hari ini
                  </div>
                )}
              </div>

              <div>
                <h4 className="text-[10px] font-bold text-gray-400 uppercase mb-3">
                  Titik Terakhir
                </h4>
                {history.slice(0, 5).map((item, idx) => (
                  <Link
                    href={`/quran/${item.surahId}#ayat-${item.ayatNumber}`}
                    key={idx}
                    className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between mb-2 hover:border-emerald-500 transition">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                        <HistoryIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-800">
                          {item.surahName}
                        </p>
                        <p className="text-[10px] text-gray-500">
                          Ayat {item.ayatNumber}
                        </p>
                      </div>
                    </div>
                    <ChevronRightIcon className="w-4 h-4 text-gray-300" />
                  </Link>
                ))}
                {history.length === 0 && (
                  <div className="text-center text-xs text-gray-400 py-4">
                    Belum ada riwayat
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "bookmark" && (
            <div className="space-y-3">
              {bookmarks.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between group">
                  <Link
                    href={`/quran/${item.surahId}#ayat-${item.ayatNumber}`}
                    className="flex items-center gap-4 flex-1">
                    <div className="w-8 h-8 rounded-lg bg-gray-50 text-emerald-600 font-bold flex items-center justify-center text-xs">
                      {item.surahId}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">
                        {item.surahName}
                      </p>
                      <p className="text-xs text-gray-500">
                        Ayat {item.ayatNumber}
                      </p>
                    </div>
                  </Link>
                  <button
                    onClick={() =>
                      deleteBookmark(item.surahId, item.ayatNumber)
                    }
                    className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition">
                    <Trash2Icon className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {bookmarks.length === 0 && (
                <div className="flex flex-col items-center justify-center py-10 opacity-50">
                  <BookMarkedIcon className="w-10 h-10 text-gray-300 mb-2" />
                  <p className="text-xs text-gray-400">Belum ada bookmark</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
