"use client";

import { useState } from "react";
import {
  SettingsIcon,
  DownloadIcon,
  CalendarIcon,
  CoffeeIcon,
  ShieldIcon,
  BookOpenIcon,
  HeartIcon,
  StarIcon,
  PlusIcon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export default function Page() {
  const [selectedDay, setSelectedDay] = useState<number>(2);

  return (
    <div className="pb-24 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="px-5 pt-6 pb-4 bg-white sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex bg-gray-100 p-1 rounded-xl">
            <button className="px-4 py-1.5 bg-emerald-900 text-white text-xs font-bold rounded-lg flex items-center gap-2">
              <span className="w-4 h-4 rounded-full border border-white flex items-center justify-center text-[8px]">
                ⚡
              </span>
              Tracker
            </button>
            <button className="px-4 py-1.5 text-gray-500 text-xs font-bold rounded-lg flex items-center gap-2">
              <CalendarIcon className="w-3.5 h-3.5" />
              Jadwal Imsak
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Ramadan Tracker</h1>
            <p className="text-xs text-gray-400 mt-1">
              Maksimalkan ibadah di bulan suci
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full bg-gray-50 text-gray-400 hover:bg-gray-100">
              <SettingsIcon className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full bg-gray-50 text-gray-400 hover:bg-gray-100">
              <DownloadIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Card */}
      <div className="px-5 mt-4">
        <div className="bg-emerald-950 rounded-3xl p-6 text-white relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <span className="px-2 py-1 bg-white/10 rounded-lg text-[10px] font-bold flex items-center gap-1 w-fit mb-2">
                <CalendarIcon className="w-3 h-3" />
                1446 H
              </span>
              <h2 className="text-3xl font-bold mb-1">Hari ke-{selectedDay}</h2>
              <p className="text-xs text-emerald-200/80">
                Semangat mengejar target!
              </p>
            </div>

            {/* Circular Progress */}
            <div className="relative w-20 h-20 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#064e3b"
                  strokeWidth="4"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#4ade80"
                  strokeWidth="4"
                  strokeDasharray="0, 100"
                />
              </svg>
              <span className="absolute text-xl font-bold">0%</span>
            </div>
          </div>

          {/* Linear Progress */}
          <div className="mt-6 flex items-center gap-3">
            <div className="w-full bg-white/10 h-1.5 rounded-full">
              <div className="bg-emerald-400 h-full w-0 rounded-full" />
            </div>
            <span className="text-xs font-bold text-emerald-400">0%</span>
          </div>
        </div>
      </div>

      {/* Day Selector */}
      <div className="mt-6">
        <div className="px-5 flex justify-between items-center mb-3">
          <h3 className="text-xs font-bold text-gray-800">Pilih Hari</h3>
          <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded">
            28 Hari menuju Idul Fitri
          </span>
        </div>

        <div className="flex gap-2 overflow-x-auto px-5 pb-2 no-scrollbar">
          {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`min-w-12.5 h-15 rounded-xl flex flex-col items-center justify-center gap-1 border transition-all ${
                selectedDay === day
                  ? "bg-emerald-950 border-emerald-950 text-white shadow-lg"
                  : "bg-white border-gray-100 text-gray-600"
              }`}>
              <span
                className={`text-[8px] font-bold ${
                  selectedDay === day ? "text-emerald-400" : "text-gray-400"
                }`}>
                H-{day}
              </span>
              <span className="text-lg font-bold">{day}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Target Section */}
      <div className="px-5 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-bold text-gray-800">Target Harian</h3>
          <button className="px-3 py-1.5 bg-emerald-950 text-white text-[10px] font-bold rounded-full flex items-center gap-1">
            <PlusIcon className="w-3 h-3" />
            Tambah
          </button>
        </div>

        <div className="space-y-3">
          <TargetItem
            icon={CoffeeIcon}
            title="Makan Sahur"
            subtitle="Sunnah sebelum fajar"
            bg="bg-orange-50"
            color="text-orange-500"
          />
          <TargetItem
            icon={ShieldIcon}
            title="Puasa Ramadan"
            subtitle="Menahan diri dari fajar hingga maghrib"
            bg="bg-orange-50"
            color="text-orange-500"
          />
          <TargetItem
            icon={BookOpenIcon}
            title="Tilawah 1 Juz"
            subtitle="Target khatam Al-Quran"
            bg="bg-emerald-50"
            color="text-emerald-500"
          />
          <TargetItem
            icon={HeartIcon}
            title="Sedekah Harian"
            subtitle="Berbagi rezeki kepada sesama"
            bg="bg-pink-50"
            color="text-pink-500"
          />
          <TargetItem
            icon={StarIcon}
            title="Sholat Tarawih"
            subtitle="Qiyamul Lail berjamaah atau sendiri"
            bg="bg-indigo-50"
            color="text-indigo-500"
          />
        </div>
      </div>
    </div>
  );
}

interface TargetItemProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  bg: string;
  color: string;
}

function TargetItem({
  icon: Icon,
  title,
  subtitle,
  bg,
  color,
}: TargetItemProps) {
  return (
    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div
          className={`w-12 h-12 rounded-2xl ${bg} flex items-center justify-center ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h4 className="font-bold text-gray-800 text-sm">{title}</h4>
          <p className="text-[10px] text-gray-400 mt-0.5">{subtitle}</p>
        </div>
      </div>
      <div className="w-6 h-6 rounded-full border-2 border-gray-200" />
    </div>
  );
}
