"use client";

import { useState } from "react";
import {
  HistoryIcon,
  SettingsIcon,
  RotateCcwIcon,
  MinusIcon,
  CircleDotIcon,
  XIcon,
  CheckIcon,
} from "lucide-react";

const DZIKIR_OPTIONS = [
  {
    id: "subhanallah",
    label: "Subhanallah",
    arabic: "سُبْحَانَ ٱللَّٰهِ",
    target: 33,
  },
  {
    id: "alhamdulillah",
    label: "Alhamdulillah",
    arabic: "ٱلْحَمْدُ لِلَّٰهِ",
    target: 33,
  },
  {
    id: "allahuakbar",
    label: "Allahu Akbar",
    arabic: "ٱللَّٰهُ أَكْبَرُ",
    target: 33,
  },
  {
    id: "tahlil",
    label: "Laa ilaaha illallah",
    arabic: "لَا إِلَٰهَ إِلَّا ٱللَّٰهُ",
    target: 100,
  },
  {
    id: "istighfar",
    label: "Astaghfirullah",
    arabic: "أَسْتَغْفِرُ اللَّهَ",
    target: 100,
  },
  {
    id: "shalawat",
    label: "Shalawat Nabi",
    arabic: "اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ",
    target: 100,
  },
  {
    id: "bebas",
    label: "Target Bebas",
    arabic: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم",
    target: null,
  },
];

const RADIUS = 45;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function TasbihPage() {
  const [count, setCount] = useState<number>(0);
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [activeDzikirId, setActiveDzikirId] = useState<string>("subhanallah");

  const activeDzikir =
    DZIKIR_OPTIONS.find((d) => d.id === activeDzikirId) || DZIKIR_OPTIONS[0];

  const effectiveTarget = activeDzikir.target || 100;
  const progress = count % effectiveTarget;
  const strokeDashoffset =
    CIRCUMFERENCE - (CIRCUMFERENCE * progress) / effectiveTarget;

  const handleSelectDzikir = (id: string) => {
    setActiveDzikirId(id);
    setCount(0);
    setIsSelectorOpen(false);
  };

  return (
    <div className="pb-24 bg-gray-50 min-h-screen flex flex-col relative overflow-hidden">
      <header className="px-5 pt-6 pb-4 flex items-center justify-between">
        <h1 className="text-lg font-bold text-gray-800">Tasbih Digital</h1>

        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg bg-white text-gray-400 hover:bg-gray-100 shadow-sm">
            <HistoryIcon className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-lg bg-white text-gray-400 hover:bg-gray-100 shadow-sm">
            <SettingsIcon className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-5">
        <button
          onClick={() => setIsSelectorOpen(true)}
          className="bg-white px-4 py-2 rounded-full shadow-sm flex items-center gap-3 mb-12 hover:shadow-md transition-shadow active:scale-95">
          <div className="w-6 h-6 bg-[#064e3b] rounded-full flex items-center justify-center">
            <CircleDotIcon className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-bold text-gray-800">
            {activeDzikir.label}
          </span>
          <span className="bg-gray-100 text-gray-500 text-xs font-bold px-2 py-0.5 rounded">
            {activeDzikir.target ? activeDzikir.target : "∞"}
          </span>
        </button>

        <div
          className="relative w-72 h-72 flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
          onClick={() => setCount((c) => c + 1)}>
          <div className="absolute inset-0 bg-white rounded-full shadow-[0_0_60px_rgba(0,0,0,0.05)]" />

          <svg
            className="absolute inset-0 w-full h-full -rotate-90 p-4"
            viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r={RADIUS}
              fill="none"
              stroke="#f3f4f6"
              strokeWidth="2"
            />
            <circle
              cx="50"
              cy="50"
              r={RADIUS}
              fill="none"
              stroke="#064e3b"
              strokeWidth="2"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-300"
            />
          </svg>

          <div className="text-center relative z-10">
            <h1 className="text-8xl font-bold text-slate-900 font-mono tracking-tighter">
              {count}
            </h1>
            <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-[0.2em] mt-2">
              Ketuk
            </p>
          </div>
        </div>

        <div className="mt-12 text-center h-24">
          <p
            className="text-3xl font-serif text-gray-800 leading-relaxed"
            dir="rtl">
            {activeDzikir.arabic}
          </p>
        </div>

        <div className="flex items-center gap-4 mt-8">
          <button
            onClick={() => setCount(0)}
            className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 hover:bg-gray-50 active:scale-95 transition-all">
            <RotateCcwIcon className="w-5 h-5" />
          </button>

          <button
            onClick={() => setCount((c) => Math.max(0, c - 1))}
            className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 hover:bg-gray-50 active:scale-95 transition-all">
            <MinusIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {isSelectorOpen && (
        <div className="fixed inset-0 z-999 w-full max-w-lg mx-auto flex flex-col justify-end">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setIsSelectorOpen(false)}
          />

          <div className="relative bg-white w-full rounded-t-[2.5rem] pb-safe animate-in slide-in-from-bottom-full duration-300">
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mt-4 mb-2" />

            <div className="px-6 pt-2 pb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-base font-bold text-gray-800">
                  Pilih Dzikir
                </h2>
                <button
                  onClick={() => setIsSelectorOpen(false)}
                  className="p-1.5 bg-gray-100 text-gray-500 rounded-full hover:bg-gray-200 transition-colors">
                  <XIcon className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2.5 max-h-[60vh] overflow-y-auto no-scrollbar pb-10">
                {DZIKIR_OPTIONS.map((dzikir) => {
                  const isActive = activeDzikirId === dzikir.id;

                  return (
                    <button
                      key={dzikir.id}
                      onClick={() => handleSelectDzikir(dzikir.id)}
                      className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all active:scale-[0.98] ${
                        isActive
                          ? "border-[#064e3b] bg-emerald-50/50"
                          : "border-gray-100 bg-white hover:border-emerald-200"
                      }`}>
                      <div className="flex flex-col gap-1">
                        <span
                          className={`text-sm font-bold ${
                            isActive ? "text-[#064e3b]" : "text-gray-800"
                          }`}>
                          {dzikir.label}
                        </span>
                        <span className="text-[10px] text-gray-400 font-medium">
                          {dzikir.target
                            ? `Target: ${dzikir.target}`
                            : "Tanpa Batas"}
                        </span>
                      </div>

                      {isActive && (
                        <CheckIcon className="w-5 h-5 text-[#064e3b]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
