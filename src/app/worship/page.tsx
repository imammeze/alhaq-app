"use client";

import { usePrayerTracker } from "@/features/worship/hooks/usePrayerTracker";
import { HeaderSection } from "@/features/worship/components/HeaderSection"; 
import { ProgressCard } from "@/features/worship/components/ProgressCard";
import { PrayerIconsRow } from "@/features/worship/components/PrayerIconsRow";
import { TrackerList } from "@/features/worship/components/TrackerList";
import { DailyTargetList } from "@/features/worship/components/DailyTargetList";

export default function WorshipPage() {
  // 1. Logic & State (di-handle oleh Custom Hook)
  const { prayers, completedIds, stats, togglePrayer } = usePrayerTracker();

  return (
    <div className="pb-24 bg-gray-50 min-h-screen">
      {/* 2. UI Components (Hanya menerima data) */}

      {/* Header bisa dibuat komponen terpisah atau tetap di sini jika sederhana */}
      <HeaderSection />

      <div className="px-5 mt-4">
        <ProgressCard stats={stats} />
      </div>

      <div className="px-5 mt-6">
        <PrayerIconsRow prayers={prayers} completedIds={completedIds} />
      </div>

      <div className="px-5 mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Tracker Sholat
          </h3>
          <span className="text-[10px] text-gray-400">
            {stats.completed}/{stats.total} Selesai
          </span>
        </div>

        <TrackerList
          prayers={prayers}
          completedIds={completedIds}
          onToggle={togglePrayer}
        />
      </div>

      <div className="px-5 mt-8 mb-6">
        <DailyTargetList />
      </div>
    </div>
  );
}
