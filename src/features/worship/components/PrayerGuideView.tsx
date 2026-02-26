"use client";

import { useState } from "react";
import { ChevronDownIcon, BookOpenIcon, HeartIcon } from "lucide-react";
import { GuideItemAPI } from "@/shared/types/api";

interface PrayerGuideViewProps {
  niatList: GuideItemAPI[];
  bacaanList: GuideItemAPI[];
}

export const PrayerGuideView = ({
  niatList,
  bacaanList,
}: PrayerGuideViewProps) => {
  const [subTab, setSubTab] = useState<"niat" | "bacaan">("niat");

  const [expandedId, setExpandedId] = useState<number | null>(null);

  const activeList = subTab === "niat" ? niatList : bacaanList;
  const ActiveIcon = subTab === "niat" ? HeartIcon : BookOpenIcon;
  const activeColor =
    subTab === "niat" ? "text-pink-500 bg-pink-50" : "text-blue-600 bg-blue-50";

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="pb-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="px-5 mt-4 mb-6">
        <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-100">
          <button
            onClick={() => {
              setSubTab("niat");
              setExpandedId(null);
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              subTab === "niat"
                ? "bg-[#064e3b] text-white shadow-md"
                : "text-gray-500 hover:bg-gray-100"
            }`}>
            Niat Sholat
          </button>
          <button
            onClick={() => {
              setSubTab("bacaan");
              setExpandedId(null);
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              subTab === "bacaan"
                ? "bg-[#064e3b] text-white shadow-md"
                : "text-gray-500 hover:bg-gray-100"
            }`}>
            Bacaan Sholat
          </button>
        </div>
      </div>

      <div className="px-5 space-y-3">
        {activeList.length === 0 ? (
          <div className="text-center py-10 text-gray-400 text-sm">
            Tidak ada data panduan.
          </div>
        ) : (
          activeList.map((item) => {
            const isExpanded = expandedId === item.id;

            return (
              <div
                key={item.id}
                className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isExpanded
                    ? "border-gray-300 shadow-md"
                    : "border-gray-100 hover:border-gray-200"
                }`}>
                <button
                  onClick={() => toggleExpand(item.id)}
                  className="w-full p-4 flex items-center justify-between bg-white">
                  <div className="flex items-center gap-4 text-left">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${activeColor}`}>
                      <ActiveIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3
                        className={`text-sm font-bold transition-colors ${
                          isExpanded ? "text-[#064e3b]" : "text-gray-800"
                        }`}>
                        {item.name}
                      </h3>
                      {!isExpanded && (
                        <p className="text-[10px] text-gray-400 line-clamp-1">
                          Ketuk untuk melihat bacaan
                        </p>
                      )}
                    </div>
                  </div>
                  <ChevronDownIcon
                    className={`w-5 h-5 text-gray-300 transition-transform duration-300 ${
                      isExpanded ? "rotate-180 text-[#064e3b]" : ""
                    }`}
                  />
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 pt-0 animate-in slide-in-from-top-2">
                    <div className="p-4 bg-gray-50 rounded-xl space-y-4">
                      {/* Arabic */}
                      <p
                        className="text-right text-2xl font-bold text-gray-800 leading-loose font-serif"
                        dir="rtl">
                        {item.arabic}
                      </p>

                      {/* Latin & Arti */}
                      <div className="space-y-2 border-t border-gray-200 pt-3">
                        <p className="text-sm font-medium text-[#064e3b] italic">
                          "{item.latin}"
                        </p>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          {item.terjemahan}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
