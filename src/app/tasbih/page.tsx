"use client";

import { useState, useEffect } from "react";
import {
  HistoryIcon,
  SettingsIcon,
  RotateCcwIcon,
  MinusIcon,
  CircleDotIcon,
} from "lucide-react";
import {
  DZIKIR_OPTIONS,
  HistoryItem,
} from "@/features/tasbih/constants/dzikir";
import {
  GoalReachedModal,
  HistoryModal,
  SelectorModal,
  ResetModal,
} from "@/features/tasbih/components/TasbihModals";

const RADIUS = 45;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function TasbihPage() {
  const [count, setCount] = useState<number>(0);

  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [isGoalReachedOpen, setIsGoalReachedOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const [activeDzikirId, setActiveDzikirId] = useState<string>("subhanallah");
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem("tasbih_history");
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  }, []);

  const saveHistory = (newHistory: HistoryItem[]) => {
    setHistory(newHistory);
    localStorage.setItem("tasbih_history", JSON.stringify(newHistory));
  };

  const activeDzikir =
    DZIKIR_OPTIONS.find((d) => d.id === activeDzikirId) || DZIKIR_OPTIONS[0];
  const effectiveTarget = activeDzikir.target || 100;
  const progress = count % effectiveTarget;
  const strokeDashoffset =
    CIRCUMFERENCE - (CIRCUMFERENCE * progress) / effectiveTarget;

  const handleTap = () => {
    const newCount = count + 1;

    if (activeDzikir.target && newCount === activeDzikir.target) {
      setIsGoalReachedOpen(true);
      setTimeout(() => setIsGoalReachedOpen(false), 3000);

      const now = new Date();
      const dateStr = new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "short",
      }).format(now);
      const timeStr = new Intl.DateTimeFormat("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      })
        .format(now)
        .replace(":", ".");

      saveHistory([
        {
          id: Date.now().toString(),
          title: activeDzikir.label,
          count: activeDzikir.target,
          date: `${dateStr}, ${timeStr}`,
        },
        ...history,
      ]);

      setCount(0);
    } else {
      setCount(newCount);
    }
  };

  const handleSelectDzikir = (id: string) => {
    setActiveDzikirId(id);
    setCount(0);
    setIsSelectorOpen(false);
  };

  const handleConfirmReset = () => {
    if (count > 0) {
      const now = new Date();
      const dateStr = new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "short",
      }).format(now);
      const timeStr = new Intl.DateTimeFormat("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      })
        .format(now)
        .replace(":", ".");

      saveHistory([
        {
          id: Date.now().toString(),
          title: activeDzikir.label,
          count: count,
          date: `${dateStr}, ${timeStr}`,
        },
        ...history,
      ]);
    }

    setCount(0);
    setIsResetModalOpen(false);
  };

  return (
    <div className="pb-24 bg-gray-50 min-h-screen flex flex-col relative overflow-hidden">
      <header className="px-5 pt-6 pb-4 flex items-center justify-between">
        <h1 className="text-lg font-bold text-gray-800">Tasbih Digital</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsHistoryOpen(true)}
            className="p-2 rounded-lg bg-white text-gray-400 hover:bg-gray-100 shadow-sm active:scale-95 transition">
            <HistoryIcon className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-lg bg-white text-gray-400 hover:bg-gray-100 shadow-sm active:scale-95 transition">
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
            {activeDzikir.target || "∞"}
          </span>
        </button>

        <div
          className="relative w-72 h-72 flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
          onClick={handleTap}>
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
            onClick={() => {
              if (count > 0) setIsResetModalOpen(true);
            }}
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

      <GoalReachedModal
        isOpen={isGoalReachedOpen}
        onClose={() => setIsGoalReachedOpen(false)}
        activeDzikir={activeDzikir}
      />

      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onDelete={(id) => saveHistory(history.filter((h) => h.id !== id))}
      />

      <SelectorModal
        isOpen={isSelectorOpen}
        onClose={() => setIsSelectorOpen(false)}
        activeDzikirId={activeDzikirId}
        onSelect={handleSelectDzikir}
      />

      <ResetModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleConfirmReset}
        currentCount={count}
      />
    </div>
  );
}
