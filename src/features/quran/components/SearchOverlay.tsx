"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowLeftIcon, SearchIcon } from "lucide-react";
import { Surah } from "@/shared/types/quran";
import Link from "next/link";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  surahs: Surah[];
}

export const SearchOverlay = ({
  isOpen,
  onClose,
  surahs,
}: SearchOverlayProps) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto focus saat dibuka
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Logic Filter
  const filteredSurahs = surahs.filter(
    (surah) =>
      surah.namaLatin.toLowerCase().includes(query.toLowerCase()) ||
      surah.arti.toLowerCase().includes(query.toLowerCase()) ||
      surah.nomor.toString() === query
  );

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col animate-in fade-in duration-200">
      {/* Search Header */}
      <div className="px-4 py-4 border-b border-gray-100 flex items-center gap-3">
        <button
          onClick={onClose}
          className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full">
          <ArrowLeftIcon className="w-5 h-5" />
        </button>
        <div className="flex-1 bg-gray-50 rounded-xl flex items-center px-4 py-3">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari surat atau ayat (misal: 'Yasin')..."
            className="bg-transparent w-full text-sm outline-none text-gray-800 placeholder:text-gray-400"
          />
        </div>
        <div className="p-2 bg-[#064e3b] rounded-xl text-white">
          <SearchIcon className="w-5 h-5" />
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {query && filteredSurahs.length === 0 ? (
          <div className="text-center text-gray-400 mt-10 text-sm">
            Tidak ditemukan surat "{query}"
          </div>
        ) : (
          filteredSurahs.map((surah) => (
            <Link
              href={`/quran/${surah.nomor}`}
              key={surah.nomor}
              onClick={onClose} // Tutup search saat diklik
              className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition border-b border-gray-50 last:border-0">
              <div className="flex items-center gap-4">
                <div className="text-sm font-bold text-gray-400 w-6">
                  {surah.nomor}
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{surah.namaLatin}</h4>
                  <p className="text-xs text-gray-400">{surah.arti}</p>
                </div>
              </div>
              <span className="font-serif text-lg text-emerald-700">
                {surah.nama}
              </span>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};
