"use client";

import Header from "@/shared/components/Header";
import HeroSection from "@/features/home/components/HeroSection";
import DateCard from "@/features/home/components/DateCard";
import QuickAccess from "@/features/home/components/QuickAccess";
import PrayerSchedule from "@/features/home/components/PrayerSchedule";
import DailyInspiration from "@/features/home/components/DailyInspiration";

export default function HomePage() {
  return (
    <div className="pb-24 bg-gray-50 min-h-screen">
      <Header />
      <HeroSection />
      <DateCard />
      <QuickAccess />
      <PrayerSchedule />
      <DailyInspiration />
    </div>
  );
}
