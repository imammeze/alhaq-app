"use client";

import { XIcon, CheckIcon, RotateCcwIcon } from "lucide-react";
import { DzikirOption, HistoryItem, DZIKIR_OPTIONS } from "../constants/dzikir";

interface GoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeDzikir: DzikirOption;
}

export function GoalReachedModal({
  isOpen,
  onClose,
  activeDzikir,
}: GoalModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      <div className="relative bg-white p-8 rounded-3xl shadow-2xl flex flex-col items-center animate-in zoom-in-95 duration-300 w-64 text-center">
        <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-5">
          <CheckIcon className="w-8 h-8 text-[#064e3b]" strokeWidth={3} />
        </div>
        <h3 className="text-lg font-bold text-[#064e3b] mb-2">
          Alhamdulillah!
        </h3>
        <p className="text-[11px] font-medium text-gray-400">
          Target {activeDzikir.label} Tercapai
        </p>
      </div>
    </div>
  );
}

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryItem[];
  onDelete: (id: string) => void;
}

export function HistoryModal({
  isOpen,
  onClose,
  history,
  onDelete,
}: HistoryModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-999 w-full max-w-lg mx-auto flex flex-col justify-end">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      <div className="relative bg-white w-full rounded-t-[2.5rem] pb-safe animate-in slide-in-from-bottom-full duration-300">
        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mt-4 mb-2" />
        <div className="px-6 pt-2 pb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-bold text-gray-800">
              Riwayat Dzikir
            </h2>
            <button
              onClick={onClose}
              className="p-1.5 bg-gray-100 text-gray-500 rounded-full hover:bg-gray-200 transition-colors">
              <XIcon className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3 max-h-[60vh] overflow-y-auto no-scrollbar pb-10">
            {history.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-sm text-gray-400 font-medium">
                  Belum ada riwayat
                </p>
              </div>
            ) : (
              history.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-gray-50/50 p-3 rounded-2xl border border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-gray-100 shadow-sm">
                      <span className="font-bold text-[#064e3b] text-base">
                        {item.count}
                      </span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-bold text-gray-800">
                        {item.title}
                      </span>
                      <span className="text-[10px] text-gray-400 font-medium">
                        {item.date}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors">
                    <XIcon className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface SelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeDzikirId: string;
  onSelect: (id: string) => void;
}

export function SelectorModal({
  isOpen,
  onClose,
  activeDzikirId,
  onSelect,
}: SelectorModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-999 w-full max-w-lg mx-auto flex flex-col justify-end">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      <div className="relative bg-white w-full rounded-t-[2.5rem] pb-safe animate-in slide-in-from-bottom-full duration-300">
        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mt-4 mb-2" />
        <div className="px-6 pt-2 pb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-bold text-gray-800">Pilih Dzikir</h2>
            <button
              onClick={onClose}
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
                  onClick={() => onSelect(dzikir.id)}
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
                  {isActive && <CheckIcon className="w-5 h-5 text-[#064e3b]" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

interface ResetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  currentCount: number;
}

export function ResetModal({
  isOpen,
  onClose,
  onConfirm,
  currentCount,
}: ResetModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-999 w-full max-w-lg mx-auto flex flex-col justify-end">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      <div className="relative bg-white w-full rounded-t-[2.5rem] pb-safe animate-in slide-in-from-bottom-full duration-300">
        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mt-4 mb-2" />

        <div className="px-6 pt-6 pb-8 flex flex-col items-center text-center">
          <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mb-5">
            <RotateCcwIcon className="w-6 h-6 text-red-500" />
          </div>

          <h3 className="text-lg font-bold text-gray-800 mb-2">
            Reset Hitungan?
          </h3>
          <p className="text-xs font-medium text-gray-500 mb-8">
            Hitungan saat ini (
            <span className="font-bold text-gray-800">{currentCount}</span>)
            akan disimpan ke riwayat.
          </p>

          <div className="flex items-center gap-3 w-full">
            <button
              onClick={onClose}
              className="flex-1 py-3.5 rounded-xl bg-gray-100 text-gray-700 font-bold text-sm hover:bg-gray-200 active:scale-95 transition-all">
              Batal
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 py-3.5 rounded-xl bg-[#064e3b] text-white font-bold text-sm hover:bg-emerald-900 active:scale-95 transition-all shadow-sm">
              Ya, Simpan & Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
