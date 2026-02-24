"use client";

import { useState } from "react";
import {
  HistoryIcon,
  SettingsIcon,
  RotateCcwIcon,
  MinusIcon,
  CircleDotIcon,
} from "lucide-react";

const TARGET = 33;
const RADIUS = 45;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function Page() {
  const [count, setCount] = useState<number>(0);

  const progress = count % TARGET;
  const strokeDashoffset = CIRCUMFERENCE - (CIRCUMFERENCE * progress) / TARGET;

  return (
    <div className="pb-24 bg-gray-50 min-h-screen flex flex-col">
      {/* Header */}
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
        {/* Selector */}
        <button className="bg-white px-4 py-2 rounded-full shadow-sm flex items-center gap-3 mb-12">
          <div className="w-6 h-6 bg-emerald-900 rounded-full flex items-center justify-center">
            <CircleDotIcon className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-bold text-gray-800">Subhanallah</span>
          <span className="bg-gray-100 text-gray-500 text-xs font-bold px-2 py-0.5 rounded">
            {TARGET}
          </span>
        </button>

        {/* Main Counter */}
        <div
          className="relative w-72 h-72 flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
          onClick={() => setCount((c) => c + 1)}>
          {/* Outer Glow */}
          <div className="absolute inset-0 bg-white rounded-full shadow-[0_0_60px_rgba(0,0,0,0.05)]" />

          {/* Progress Ring */}
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
            <p className="text-[10px] font-bold text-orange-400 uppercase tracking-[0.2em] mt-2">
              Ketuk
            </p>
          </div>
        </div>

        {/* Arabic Text */}
        <div className="mt-12 text-center h-24">
          <p className="font-arabic text-3xl text-gray-800">
            سُبْحَانَ ٱللَّٰهِ
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4 mt-8">
          <button
            onClick={() => setCount(0)}
            className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-200 transition-colors">
            <RotateCcwIcon className="w-5 h-5" />
          </button>

          <button
            onClick={() => setCount((c) => Math.max(0, c - 1))}
            className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-200 transition-colors">
            <MinusIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
