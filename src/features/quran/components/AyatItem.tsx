"use client";

import { useState, useRef, useEffect } from "react";
import {
  PlayIcon,
  PauseIcon,
  Share2Icon,
  BookmarkIcon,
  MoreHorizontalIcon,
  XIcon,
  CopyIcon,
  FlagIcon,
} from "lucide-react";
import { Ayat } from "@/shared/types/quran";

interface AyatItemProps {
  ayat: Ayat;
  surahName: string;
  surahId: number;
}

export default function AyatItem({ ayat, surahName, surahId }: AyatItemProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("quran_bookmarks");
    if (saved) {
      const bookmarks = JSON.parse(saved);
      const exists = bookmarks.some(
        (b: any) => b.surahId === surahId && b.ayatNumber === ayat.nomorAyat
      );
      setIsBookmarked(exists);
    }
  }, [surahId, ayat.nomorAyat]);

  const toggleAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(ayat.audio["05"]);
      audioRef.current.onended = () => setIsPlaying(false);
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      document.querySelectorAll("audio").forEach((el) => el.pause());
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleShare = async () => {
    const textToShare = `QS. ${surahName}: ${ayat.nomorAyat}\n\n${ayat.teksArab}\n\n"${ayat.teksIndonesia}"`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `QS. ${surahName}: ${ayat.nomorAyat}`,
          text: textToShare,
        });
      } catch (err) {
        console.error(err);
      }
    } else {
      navigator.clipboard.writeText(textToShare);
      alert("Teks ayat disalin!");
    }
    setIsMenuOpen(false);
  };

  const handleCopy = () => {
    const textToCopy = `${ayat.teksArab}\n\n${ayat.teksIndonesia}`;
    navigator.clipboard.writeText(textToCopy);
    alert("Teks berhasil disalin ke clipboard");
    setIsMenuOpen(false);
  };

  const toggleBookmark = () => {
    const STORAGE_KEY = "quran_bookmarks";
    const saved = localStorage.getItem(STORAGE_KEY);
    const bookmarks = saved ? JSON.parse(saved) : [];

    const existingIndex = bookmarks.findIndex(
      (b: any) => b.surahId === surahId && b.ayatNumber === ayat.nomorAyat
    );

    let newBookmarks;
    if (existingIndex !== -1) {
      newBookmarks = bookmarks.filter(
        (_: any, index: number) => index !== existingIndex
      );
      setIsBookmarked(false);
    } else {
      const newBookmark = {
        surahId,
        surahName,
        ayatNumber: ayat.nomorAyat,
        timestamp: Date.now(),
      };
      newBookmarks = [newBookmark, ...bookmarks];
      setIsBookmarked(true);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newBookmarks));
    window.dispatchEvent(new Event("storage"));
    setIsMenuOpen(false);
  };

  const handleLastRead = () => {
    const lastReadData = {
      surahId,
      surahName,
      ayatNumber: ayat.nomorAyat,
      timestamp: Date.now(),
    };

    localStorage.setItem("quran_last_read", JSON.stringify(lastReadData));

    const historyKey = "quran_history";
    const historySaved = localStorage.getItem(historyKey);
    const history = historySaved ? JSON.parse(historySaved) : [];

    const newHistory = [lastReadData, ...history].slice(0, 20);
    localStorage.setItem(historyKey, JSON.stringify(newHistory));

    window.dispatchEvent(new Event("storage"));
    alert(`Ditandai: ${surahName} Ayat ${ayat.nomorAyat}`);
    setIsMenuOpen(false);
  };

  return (
    <>
      <div
        className={`bg-white p-5 rounded-2xl border transition-colors duration-300 scroll-mt-32 mb-4 ${
          isMenuOpen
            ? "border-emerald-500 ring-1 ring-emerald-500"
            : "border-gray-100 shadow-sm"
        }`}
        id={`ayat-${ayat.nomorAyat}`}>
        <div className="flex items-center justify-between mb-6 bg-gray-50/50 p-2 rounded-lg">
          <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold border border-emerald-200 shadow-sm">
            {ayat.nomorAyat}
          </div>

          <div className="flex gap-1">
            {isBookmarked && (
              <BookmarkIcon className="w-4 h-4 text-emerald-600 fill-emerald-600 mr-2" />
            )}

            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition active:scale-95">
              <MoreHorizontalIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        <p
          className="text-right text-3xl font-serif text-gray-800 leading-[2.5] mb-6"
          dir="rtl">
          {ayat.teksArab}
        </p>

        <div className="space-y-2">
          <p className="text-sm text-emerald-700 font-medium italic">
            "{ayat.teksLatin}"
          </p>
          <p className="text-sm text-gray-600 leading-relaxed border-l-2 border-gray-200 pl-3">
            {ayat.teksIndonesia}
          </p>
        </div>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 z-100 flex items-end justify-center">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setIsMenuOpen(false)}
          />

          <div className="relative w-full max-w-lg bg-white rounded-t-3xl p-6 shadow-2xl animate-in slide-in-from-bottom-10 duration-300 mb-0">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  {surahName} : {ayat.nomorAyat}
                </h3>
                <p className="text-xs text-gray-400">
                  Pilih aksi untuk ayat ini
                </p>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition">
                <XIcon className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            <div className="grid grid-cols-5 gap-2">
              <button
                onClick={toggleAudio}
                className="flex flex-col items-center gap-2 group">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                    isPlaying
                      ? "bg-emerald-100 text-emerald-600 animate-pulse"
                      : "bg-gray-50 text-gray-600 group-hover:bg-emerald-50 group-hover:text-emerald-600"
                  }`}>
                  {isPlaying ? (
                    <PauseIcon className="w-5 h-5" />
                  ) : (
                    <PlayIcon className="w-5 h-5" />
                  )}
                </div>
                <span className="text-[10px] font-medium text-gray-500 text-center">
                  Putar
                </span>
              </button>

              <button
                onClick={handleCopy}
                className="flex flex-col items-center gap-2 group">
                <div className="w-12 h-12 rounded-2xl bg-gray-50 text-gray-600 flex items-center justify-center group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all">
                  <CopyIcon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-medium text-gray-500 text-center">
                  Salin
                </span>
              </button>

              <button
                onClick={toggleBookmark}
                className="flex flex-col items-center gap-2 group">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                    isBookmarked
                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200"
                      : "bg-gray-50 text-gray-600 group-hover:bg-emerald-50 group-hover:text-emerald-600"
                  }`}>
                  <BookmarkIcon
                    className={`w-5 h-5 ${isBookmarked ? "fill-white" : ""}`}
                  />
                </div>
                <span className="text-[10px] font-medium text-gray-500 text-center">
                  Tandai
                </span>
              </button>

              <button
                onClick={handleLastRead}
                className="flex flex-col items-center gap-2 group">
                <div className="w-12 h-12 rounded-2xl bg-gray-50 text-gray-600 flex items-center justify-center group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all">
                  <FlagIcon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-medium text-gray-500 text-center">
                  Terakhir
                </span>
              </button>

              <button
                onClick={handleShare}
                className="flex flex-col items-center gap-2 group">
                <div className="w-12 h-12 rounded-2xl bg-gray-50 text-gray-600 flex items-center justify-center group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all">
                  <Share2Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-medium text-gray-500 text-center">
                  Share
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
