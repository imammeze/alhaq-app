"use client";

import { useState } from "react";
import { XIcon, BellIcon } from "lucide-react";
import { ICON_OPTIONS, ICON_MAP, COLOR_OPTIONS } from "../constants/targets";
import { NewTargetForm } from "../types";

interface AddTargetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: NewTargetForm) => void;
}

export const AddTargetModal = ({
  isOpen,
  onClose,
  onSave,
}: AddTargetModalProps) => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("Sun");
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!title || !subtitle) return;

    const colorTheme = COLOR_OPTIONS[selectedColorIndex];

    onSave({
      title,
      subtitle,
      iconName: selectedIcon,
      color: colorTheme.text,
      bg: colorTheme.bg,
    });

    setTitle("");
    setSubtitle("");
  };

  return (
    <div className="fixed inset-0 z-100 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-4">
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 shadow-xl animate-in slide-in-from-bottom-10 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-800">Tambah Ibadah</h2>
          <button
            onClick={onClose}
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
            <XIcon className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Form Body */}
        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1 custom-scrollbar">
          {/* Input Nama */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase">
              Nama Ibadah
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Dzikir Pagi"
              className="w-full p-4 bg-gray-50 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
            />
          </div>

          {/* Input Waktu */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase">
              Keterangan Waktu
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Contoh: Setelah Subuh"
              className="w-full p-4 bg-gray-50 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
            />
          </div>

          {/* Pilih Icon Grid */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase">
              Pilih Ikon
            </label>
            <div className="grid grid-cols-6 gap-2">
              {ICON_OPTIONS.map((iconName) => {
                const IconComponent = ICON_MAP[iconName];
                const isSelected = selectedIcon === iconName;
                return (
                  <button
                    key={iconName}
                    onClick={() => setSelectedIcon(iconName)}
                    className={`aspect-square flex items-center justify-center rounded-xl transition-all ${
                      isSelected
                        ? "bg-emerald-800 text-white shadow-lg shadow-emerald-200 scale-105"
                        : "bg-gray-50 text-gray-400 hover:bg-gray-100"
                    }`}>
                    <IconComponent className="w-5 h-5" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pilih Warna */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase">
              Pilih Warna
            </label>
            <div className="flex gap-3 overflow-x-auto py-2">
              {COLOR_OPTIONS.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedColorIndex(idx)}
                  className={`w-8 h-8 rounded-full border-2 shrink-0 transition-all ${
                    selectedColorIndex === idx
                      ? "border-gray-800 scale-110"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: option.hex }}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-3">
              <BellIcon className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-bold text-gray-700">
                Ingatkan Saya
              </span>
            </div>
            <div className="w-11 h-6 bg-gray-200 rounded-full relative cursor-not-allowed">
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
            </div>
          </div>
        </div>

        {/* Footer Button */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <button
            onClick={handleSave}
            disabled={!title || !subtitle}
            className="w-full py-4 bg-[#064e3b] text-white rounded-xl font-bold text-sm hover:bg-[#022c22] transition disabled:opacity-50 disabled:cursor-not-allowed">
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};
