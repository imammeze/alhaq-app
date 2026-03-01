"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeftIcon,
  Share2Icon,
  BookmarkIcon,
  CopyIcon,
  InfoIcon,
} from "lucide-react";
import { DoaItem } from "@/shared/types/doa";

interface DoaDetailClientProps {
  doa: DoaItem;
}

export default function DoaDetailClient({ doa }: DoaDetailClientProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const router = useRouter();

  const handleCopy = () => {
    const textToCopy = `${doa.nama}\n\n${doa.ar}\n\n${doa.tr}\n\nArtinya: "${doa.idn}"\n\nSumber: ${doa.tentang}`;
    navigator.clipboard.writeText(textToCopy);
    alert("Teks doa berhasil disalin!");
  };

  const handleShare = async () => {
    const textToShare = `${doa.nama}\n\n${doa.ar}\n\nArtinya: "${doa.idn}"`;
    if (navigator.share) {
      try {
        await navigator.share({ title: doa.nama, text: textToShare });
      } catch (err) {
        console.error(err);
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="pb-24 bg-gray-50 min-h-screen">
      <header className="px-5 pt-6 pb-4 bg-white shadow-sm flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors active:scale-95">
          <ArrowLeftIcon className="w-5 h-5" />
        </button>
        <div className="text-center flex-1 px-4">
          <h1 className="font-bold text-gray-800 truncate">{doa.nama}</h1>
          <p className="text-xs text-gray-400">{doa.grup}</p>
        </div>
        <div className="w-9" />{" "}
      </header>

      <div className="px-5 mt-6 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="bg-[#064e3b] rounded-3xl p-6 text-white relative overflow-hidden shadow-lg shadow-emerald-900/20">
          <div className="relative z-10 flex flex-col items-center text-center">
            <span className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-bold tracking-widest uppercase mb-3 backdrop-blur-sm">
              Doa No. {doa.id}
            </span>
            <h2 className="text-xl font-bold mb-2 text-emerald-50 leading-snug">
              {doa.nama}
            </h2>
          </div>
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex justify-end gap-2 mb-6 pb-4 border-b border-gray-50">
            <button
              onClick={handleCopy}
              className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition"
              title="Salin Teks">
              <CopyIcon className="w-5 h-5" />
            </button>
            <button
              onClick={handleShare}
              className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition"
              title="Bagikan">
              <Share2Icon className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`p-2 rounded-xl transition ${
                isBookmarked
                  ? "text-emerald-600 bg-emerald-50"
                  : "text-gray-400 hover:text-emerald-600 hover:bg-emerald-50"
              }`}
              title="Simpan Doa">
              <BookmarkIcon
                className={`w-5 h-5 ${isBookmarked ? "fill-emerald-600" : ""}`}
              />
            </button>
          </div>

          <p
            className="text-right text-3xl font-serif text-gray-800 leading-[2.5] mb-8"
            dir="rtl">
            {doa.ar}
          </p>

          <div className="space-y-4">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Cara Membaca
              </p>
              <p className="text-sm text-emerald-700 font-medium italic leading-relaxed">
                {doa.tr}
              </p>
            </div>

            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Terjemahan
              </p>
              <p className="text-sm text-gray-600 leading-relaxed border-l-2 border-emerald-500 pl-3">
                {doa.idn}
              </p>
            </div>
          </div>
        </div>

        {doa.tentang && (
          <div className="bg-blue-50/50 border border-blue-100 p-5 rounded-2xl flex items-start gap-3">
            <InfoIcon className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-1">
                Sumber / Keterangan
              </h4>
              <p className="text-xs text-blue-600 leading-relaxed font-medium">
                {doa.tentang}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
