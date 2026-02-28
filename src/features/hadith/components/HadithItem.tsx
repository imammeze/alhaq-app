"use client";

import { Share2Icon, BookmarkIcon } from "lucide-react";
import { HadithItem as TypeHadithItem } from "@/shared/types/hadith";

interface HadithItemProps {
  hadith: TypeHadithItem;
  bookName: string;
}

export default function HadithItem({ hadith, bookName }: HadithItemProps) {
  const handleShare = () => {
    const textToShare = `${bookName} No. ${hadith.number}\n\n${hadith.arab}\n\n"${hadith.id}"`;
    if (navigator.share) {
      navigator
        .share({ title: `${bookName} - ${hadith.number}`, text: textToShare })
        .catch(console.error);
    } else {
      navigator.clipboard.writeText(textToShare);
      alert("Teks hadits disalin ke clipboard!");
    }
  };

  return (
    <div
      id={`hadith-${hadith.number}`}
      className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm scroll-mt-24">
      <div className="flex items-center justify-between mb-6 bg-gray-50/50 p-2 rounded-lg">
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-700 text-xs font-bold border border-emerald-200 shadow-sm">
            No. {hadith.number}
          </div>
        </div>

        <div className="flex gap-1">
          <button
            onClick={handleShare}
            className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition">
            <Share2Icon className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition">
            <BookmarkIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      <p
        className="text-right text-2xl font-serif text-gray-800 leading-[2.5] mb-6"
        dir="rtl">
        {hadith.arab}
      </p>

      <div className="space-y-2 border-t border-gray-100 pt-4">
        <p className="text-sm text-gray-600 leading-relaxed border-l-2 border-emerald-500 pl-3">
          {hadith.id}
        </p>
      </div>
    </div>
  );
}
