"use client";

import { useState } from "react";
import { usePrayerTracker } from "@/features/worship/hooks/usePrayerTracker";
import { HeaderSection } from "@/features/worship/components/HeaderSection";
import { ProgressCard } from "@/features/worship/components/ProgressCard";
import { PrayerIconsRow } from "@/features/worship/components/PrayerIconsRow";
import { TrackerList } from "@/features/worship/components/TrackerList";
import { DailyTargetList } from "@/features/worship/components/DailyTargetList";
import { usePrayerTimes } from "@/features/prayer/hooks/usePrayerTimes";
import { PrayerGuideView } from "@/features/worship/components/PrayerGuideView";
import { GuideItemAPI } from "@/shared/types/api";

interface WorshipClientPageProps {
  niatList: GuideItemAPI[];
  bacaanList: GuideItemAPI[];
}

export default function WorshipClientPage({
  niatList,
  bacaanList,
}: WorshipClientPageProps) {
  const [activeTab, setActiveTab] = useState<"schedule" | "guide">("schedule");

  const {
    prayers,
    completedIds,
    stats,
    togglePrayer,
    markAllAsCompleted,
    isLoaded: isTrackerLoaded,
  } = usePrayerTracker();

  const { city, data } = usePrayerTimes();

  const hijriDate = data
    ? `${data.date.hijri.day} ${data.date.hijri.month.en} ${data.date.hijri.year} H`
    : "Memuat Tanggal...";

  const displayCity = city || "Mencari Lokasi...";

  if (!isTrackerLoaded)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-sm text-gray-400">
        Memuat data...
      </div>
    );

  return (
    <div className="pb-24 bg-gray-50 min-h-screen">
      <HeaderSection
        city={displayCity}
        hijriDate={hijriDate}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {activeTab === "schedule" ? (
        <div className="animate-in fade-in slide-in-from-left-4 duration-300">
          <div className="px-5 mt-4">
            <ProgressCard stats={stats} />
          </div>

          <div className="px-5 mt-6">
            <PrayerIconsRow
              prayers={prayers}
              completedIds={completedIds}
              onToggle={togglePrayer}
              onCompleteAll={markAllAsCompleted}
            />
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
      ) : (
        <PrayerGuideView niatList={niatList} bacaanList={bacaanList} />
      )}
    </div>
  );
}
