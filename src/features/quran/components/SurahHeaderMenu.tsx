"use client";

import { useState, useRef, useEffect } from "react";
import {
  MoreVerticalIcon,
  ArrowUpDownIcon,
  BookmarkIcon,
  HistoryIcon,
  XIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface SurahHeaderMenuProps {
  totalAyat: number;
}

export default function SurahHeaderMenu({ totalAyat }: SurahHeaderMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showJumpModal, setShowJumpModal] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleScrollToAyat = (num: number) => {
    const element = document.getElementById(`ayat-${num}`);
    if (element) {
      setShowJumpModal(false);
      setIsOpen(false);

      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        element.classList.add("bg-emerald-50");
        setTimeout(() => element.classList.remove("bg-emerald-50"), 2000);
      }, 300);
    } else {
      alert("Ayat belum termuat.");
    }
  };

  const handleBookmarks = () => {
    router.push("/quran");
    setIsOpen(false);
  };

  const handleLastRead = () => {
    const saved = localStorage.getItem("quran_last_read");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data && data.surahId && data.ayatNumber) {
          router.push(`/quran/${data.surahId}#ayat-${data.ayatNumber}`);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Belum ada riwayat bacaan.");
    }
    setIsOpen(false);
  };

  return (
    <>
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 -mr-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
          <MoreVerticalIcon className="w-5 h-5" />
        </button>

        {isOpen && (
          <div className="absolute right-0 top-12 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
            <button
              onClick={() => {
                setIsOpen(false);
                setShowJumpModal(true);
              }}
              className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors">
              <div className="text-gray-400">
                <ArrowUpDownIcon className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium text-gray-700">
                Lompat ke Ayat
              </span>
            </button>

            <button
              onClick={handleBookmarks}
              className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors">
              <div className="text-gray-400">
                <BookmarkIcon className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium text-gray-700">
                Bookmarks
              </span>
            </button>

            <button
              onClick={handleLastRead}
              className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors">
              <div className="text-gray-400">
                <HistoryIcon className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium text-gray-700">
                Terakhir Dibaca
              </span>
            </button>
          </div>
        )}
      </div>

      {showJumpModal && (
        <div className="fixed inset-0 z-99999 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setShowJumpModal(false)}
          />

          <div className="relative w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl animate-in zoom-in-95 duration-300 max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between mb-4 shrink-0">
              <h3 className="font-bold text-gray-800 text-lg">
                Lompat ke Ayat
              </h3>
              <button
                onClick={() => setShowJumpModal(false)}
                className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500 transition">
                <XIcon className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-y-auto custom-scrollbar pr-1">
              <div className="grid grid-cols-5 gap-3">
                {Array.from({ length: totalAyat }, (_, i) => i + 1).map(
                  (num) => (
                    <button
                      key={num}
                      onClick={() => handleScrollToAyat(num)}
                      className="aspect-square flex items-center justify-center rounded-xl bg-gray-50 text-gray-600 font-bold text-sm hover:bg-emerald-500 hover:text-white transition-all active:scale-95 border border-gray-100">
                      {num}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
