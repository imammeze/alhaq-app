"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeftIcon, SearchIcon, XIcon } from "lucide-react";
import {
  HadithDetailData,
  HadithItem as TypeHadithItem,
} from "@/shared/types/hadith";

import HadithItem from "./HadithItem";

interface HadithListClientProps {
  data: HadithDetailData;
}

export default function HadithListClient({ data }: HadithListClientProps) {
  const [hadiths, setHadiths] = useState<TypeHadithItem[]>(data.hadiths);
  const [currentEnd, setCurrentEnd] = useState(25);
  const [isLoading, setIsLoading] = useState(false);
  const [showJumpModal, setShowJumpModal] = useState(false);
  const [jumpNumber, setJumpNumber] = useState("");

  const handleLoadMore = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const nextStart = currentEnd + 1;
      let nextEnd = currentEnd + 25;

      if (nextEnd > data.available) {
        nextEnd = data.available;
      }

      const res = await fetch(
        `https://api.hadith.gading.dev/books/${data.id}?range=${nextStart}-${nextEnd}`
      );
      if (!res.ok) throw new Error("Gagal mengambil data tambahan");

      const result = await res.json();

      setHadiths((prev) => [...prev, ...result.data.hadiths]);
      setCurrentEnd(nextEnd);
    } catch (error) {
      console.error(error);
      alert("Gagal memuat hadits tambahan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleJump = async (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(jumpNumber);

    if (!num || num < 1 || num > data.available) {
      alert(
        `Masukkan nomor antara 1 hingga ${data.available.toLocaleString(
          "id-ID"
        )}`
      );
      return;
    }

    setShowJumpModal(false);

    const isLoaded = hadiths.some((h) => h.number === num);

    if (isLoaded) {
      const el = document.getElementById(`hadith-${num}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.classList.add(
          "ring-2",
          "ring-emerald-500",
          "transition-all",
          "duration-500"
        );
        setTimeout(
          () => el.classList.remove("ring-2", "ring-emerald-500"),
          2000
        );
      }
    } else {
      if (isLoading) return;
      setIsLoading(true);
      try {
        const nextStart = num;
        const nextEnd = Math.min(num + 24, data.available);

        const res = await fetch(
          `https://api.hadith.gading.dev/books/${data.id}?range=${nextStart}-${nextEnd}`
        );
        if (!res.ok) throw new Error();

        const result = await res.json();

        setHadiths(result.data.hadiths);
        setCurrentEnd(nextEnd);

        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 100);
      } catch (error) {
        console.error(error);
        alert("Gagal melompat ke hadits tersebut.");
      } finally {
        setIsLoading(false);
        setJumpNumber("");
      }
    }
  };

  const hasMore = currentEnd < data.available;
  const firstVisibleNumber = hadiths.length > 0 ? hadiths[0].number : 0;
  const lastVisibleNumber =
    hadiths.length > 0 ? hadiths[hadiths.length - 1].number : 0;

  return (
    <>
      <div className="pb-24 bg-gray-50 min-h-screen">
        <header className="px-5 pt-6 pb-4 bg-white shadow-sm flex items-center justify-between">
          <Link
            href="/hadith"
            className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeftIcon className="w-5 h-5" />
          </Link>
          <div className="text-center">
            <h1 className="font-bold text-gray-800">{data.name}</h1>
            <p className="text-xs text-gray-400">
              Menampilkan {firstVisibleNumber} - {lastVisibleNumber} dari{" "}
              {data.available.toLocaleString("id-ID")}
            </p>
          </div>

          <button
            onClick={() => setShowJumpModal(true)}
            className="p-2 -mr-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors">
            <SearchIcon className="w-5 h-5" />
          </button>
        </header>

        <div className="px-5 mt-6 mb-6">
          <div className="bg-[#064e3b] rounded-3xl p-6 text-white text-center relative overflow-hidden shadow-lg shadow-emerald-900/20">
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-2 font-serif text-emerald-50">
                {data.name}
              </h2>
              <div className="w-full h-px bg-white/20 mb-3 mx-auto max-w-[150px]" />
              <p className="text-xs text-emerald-100 uppercase tracking-widest">
                Kumpulan Hadits Shahih
              </p>
            </div>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
          </div>
        </div>

        <div className="px-5 space-y-4">
          {hadiths.map((hadith) => (
            <HadithItem
              key={hadith.number}
              hadith={hadith}
              bookName={data.name}
            />
          ))}
        </div>

        {hasMore && (
          <div className="px-5 mt-6 flex justify-center">
            <button
              onClick={handleLoadMore}
              disabled={isLoading}
              className="px-6 py-3 bg-gray-100 text-gray-600 text-xs font-bold rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50 active:scale-95 flex items-center gap-2">
              {isLoading ? (
                <>
                  <div className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                  Memuat...
                </>
              ) : (
                "Muat Lebih Banyak"
              )}
            </button>
          </div>
        )}
      </div>

      {showJumpModal && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setShowJumpModal(false)}
          />
          <div className="relative w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-gray-800">Cari Nomor Hadits</h3>
              <button
                onClick={() => setShowJumpModal(false)}
                className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500 transition">
                <XIcon className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleJump}>
              <div className="mb-4">
                <label className="block text-xs text-gray-400 mb-2">
                  Masukkan antara 1 - {data.available.toLocaleString("id-ID")}
                </label>
                <input
                  type="number"
                  min="1"
                  max={data.available}
                  value={jumpNumber}
                  onChange={(e) => setJumpNumber(e.target.value)}
                  placeholder="Contoh: 500"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-bold text-gray-800"
                  autoFocus
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#064e3b] text-white font-bold py-3 rounded-xl hover:bg-emerald-900 transition active:scale-95 flex items-center justify-center gap-2">
                Lompat Sekarang
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
