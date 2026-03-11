"use client";

import HeroSection from "@/features/home/components/HeroSection";
import DateCard from "@/features/home/components/DateCard";
import QuickAccess from "@/features/home/components/QuickAccess";
import PrayerSchedule from "@/features/home/components/PrayerSchedule";
import { usePrayerTimes } from "@/features/prayer/hooks/usePrayerTimes";

export default function HomeClientWrapper() {
  const { data, loading, city } = usePrayerTimes();

  return (
    <>
      <HeroSection
        data={data}
        loading={loading}
        city={city || "Mencari Lokasi..."}
      />
      <DateCard />
      <QuickAccess />
      <PrayerSchedule timings={data?.timings} />
    </>
  );
}
