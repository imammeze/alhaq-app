"use client";

import { useState } from "react";
import { ChevronRightIcon } from "lucide-react";
import { NIAT_SHOLAT_LIST, BACAAN_SHOLAT_LIST } from "../constants/guides";

export const PrayerGuideView = () => {
  const [subTab, setSubTab] = useState<"niat" | "bacaan">("niat");

  const activeList = subTab === "niat" ? NIAT_SHOLAT_LIST : BACAAN_SHOLAT_LIST;

  return (
    <div className="pb-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="px-5 mt-4 mb-6">
        <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-100">
          <button
            onClick={() => setSubTab("niat")}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              subTab === "niat"
                ? "bg-[#064e3b] text-white shadow-md"
                : "text-gray-500 hover:bg-gray-100"
            }`}>
            Niat Sholat
          </button>
          <button
            onClick={() => setSubTab("bacaan")}
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
        {activeList.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className="w-full bg-white p-4 rounded-2xl border border-gray-100 flex items-center justify-between hover:bg-gray-50 active:scale-[0.99] transition-all group">
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center ${item.bg} ${item.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <h3 className="text-sm font-bold text-gray-800 mb-0.5 group-hover:text-[#064e3b] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-400">{item.subtitle}</p>
                </div>
              </div>
              <ChevronRightIcon className="w-5 h-5 text-gray-300 group-hover:text-[#064e3b] transition-colors" />
            </button>
          );
        })}
      </div>
    </div>
  );
};
