"use client";

import {
  ChevronRightIcon,
  MapPinIcon,
  HistoryIcon,
  DownloadIcon,
  CheckIcon,
  SunriseIcon,
  SunIcon,
  CloudSunIcon,
  SunsetIcon,
  MoonIcon,
  SparklesIcon,
  CloudIcon,
  MoonStarIcon,
  BookOpenIcon,
  HeartIcon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export default function Page() {
  return (
    <div className="pb-24 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="px-5 pt-6 pb-4 bg-white sticky top-0 z-10 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-gray-800">Solatku</h1>

          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg bg-gray-50 text-gray-400 hover:bg-gray-100">
              <HistoryIcon className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-lg bg-gray-50 text-gray-400 hover:bg-gray-100">
              <DownloadIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-900 text-white rounded-full text-xs font-medium">
            <MapPinIcon className="w-3 h-3" />
            <span>Purwokerto</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium">
            <span>3 Ramadan 1447 H</span>
          </div>
        </div>

        <div className="bg-emerald-900 rounded-xl p-4 flex items-center justify-between text-white">
          <span className="font-bold text-sm">Jadwal Sholat</span>
          <span className="text-xs text-emerald-200">Panduan Sholat</span>
        </div>
      </header>

      {/* Progress */}
      <div className="px-5 mt-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#eee"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#064e3b"
                strokeWidth="3"
                strokeDasharray="0, 100"
              />
            </svg>
            <span className="absolute text-sm font-bold text-gray-800">
              0/5
            </span>
          </div>

          <div>
            <h3 className="font-bold text-gray-800">Bismillah! 💪</h3>
            <p className="text-xs text-gray-500 mt-1">5 solat lagi hari ini</p>
          </div>
        </div>
      </div>

      {/* Prayer Icons */}
      <div className="px-5 mt-6 flex justify-between">
        <PrayerIconItem icon={SunriseIcon} label="Subuh" />
        <PrayerIconItem icon={SunIcon} label="Dzuhur" />
        <PrayerIconItem icon={CloudSunIcon} label="Ashar" />
        <PrayerIconItem icon={SunsetIcon} label="Maghrib" />
        <PrayerIconItem icon={MoonIcon} label="Isya" />
      </div>

      {/* Tracker */}
      <div className="px-5 mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Tracker Sholat
          </h3>
          <span className="text-[10px] text-gray-400">0/5 Selesai</span>
        </div>

        <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100 space-y-1">
          <TrackerItem icon={SunriseIcon} name="Subuh" />
          <TrackerItem icon={SunIcon} name="Dzuhur" />
          <TrackerItem icon={CloudSunIcon} name="Ashar" />
          <TrackerItem icon={SunsetIcon} name="Maghrib" />
          <TrackerItem icon={MoonIcon} name="Isya" />
        </div>
      </div>

      {/* Target Harian */}
      <div className="px-5 mt-8 mb-6">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
          Target Harian
        </h3>

        <div className="space-y-3">
          <TargetItem
            icon={SunIcon}
            color="text-orange-500"
            bg="bg-orange-50"
            title="Sholat Dhuha"
            subtitle="Pagi - Siang"
          />
          <TargetItem
            icon={CloudIcon}
            color="text-blue-500"
            bg="bg-blue-50"
            title="Dzikir Pagi"
            subtitle="Setelah Subuh"
          />
          <TargetItem
            icon={MoonIcon}
            color="text-purple-500"
            bg="bg-purple-50"
            title="Dzikir Petang"
            subtitle="Setelah Ashar"
          />
          <TargetItem
            icon={BookOpenIcon}
            color="text-emerald-500"
            bg="bg-emerald-50"
            title="Baca Al-Quran"
            subtitle="Kapanpun"
          />
          <TargetItem
            icon={MoonStarIcon}
            color="text-indigo-500"
            bg="bg-indigo-50"
            title="Sholat Tahajjud"
            subtitle="1/3 Malam"
          />
          <TargetItem
            icon={HeartIcon}
            color="text-pink-500"
            bg="bg-pink-50"
            title="Sedekah Subuh"
            subtitle="Pagi Hari"
          />
        </div>
      </div>
    </div>
  );
}

/* ---------- Components ---------- */

interface PrayerIconItemProps {
  icon: LucideIcon;
  label: string;
}

function PrayerIconItem({ icon: Icon, label }: PrayerIconItemProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center text-gray-300">
        <Icon className="w-5 h-5" />
      </div>
      <span className="text-[10px] text-gray-400">{label}</span>
    </div>
  );
}

interface TrackerItemProps {
  icon: LucideIcon;
  name: string;
}

function TrackerItem({ icon: Icon, name }: TrackerItemProps) {
  return (
    <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400">
          <Icon className="w-5 h-5" />
        </div>
        <p className="text-sm font-bold text-gray-800">{name}</p>
      </div>
      <div className="w-6 h-6 rounded-full border-2 border-gray-200" />
    </div>
  );
}

interface TargetItemProps {
  icon: LucideIcon;
  color: string;
  bg: string;
  title: string;
  subtitle: string;
}

function TargetItem({
  icon: Icon,
  color,
  bg,
  title,
  subtitle,
}: TargetItemProps) {
  return (
    <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div
          className={`w-10 h-10 rounded-full ${bg} flex items-center justify-center ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <p className="text-sm font-bold text-gray-800">{title}</p>
          <p className="text-xs text-gray-400">{subtitle}</p>
        </div>
      </div>
      <div className="w-6 h-6 rounded-full border-2 border-gray-200" />
    </div>
  );
}
