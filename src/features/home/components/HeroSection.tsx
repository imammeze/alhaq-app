"use client";

import { useEffect, useState } from "react";
import { MapPinIcon } from "lucide-react";
import { PrayerTimesResponse } from "@/shared/types/api";
import { getNextPrayer } from "@/shared/utils/dateUtils";

interface HeroSectionProps {
  data: PrayerTimesResponse["data"] | null;
  city?: string;
  loading?: boolean;
}

export default function HeroSection({
  data,
  city = "Mencari Lokasi...",
  loading,
}: HeroSectionProps) {
  const [timeLeft, setTimeLeft] = useState("00:00:00");
  const [nextPrayerInfo, setNextPrayerInfo] = useState<{
    name: string;
    time: string;
  } | null>(null);

  useEffect(() => {
    if (!data) return;

    const timings = data.timings;

    // Update setiap detik
    const timer = setInterval(() => {
      const { nextPrayerName, targetDate } = getNextPrayer(timings);
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        // Jika waktu habis, trigger re-render untuk ambil sholat berikutnya
        setTimeLeft("00:00:00");
      } else {
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        setTimeLeft(
          `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
        );
        setNextPrayerInfo({ name: nextPrayerName, time: "" }); // Time display opsional di sini
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [data]);

  // Skeleton Loading State
  if (loading || !data) {
    return (
      <div className="px-5 mt-2">
        <div className="bg-[#064e3b] rounded-3xl p-6 h-[200px] animate-pulse flex flex-col justify-center items-center">
          <div className="h-4 w-32 bg-emerald-800/50 rounded mb-4"></div>
          <div className="h-10 w-48 bg-emerald-800/50 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-5 mt-2">
      <div className="bg-[#064e3b] rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
        {/* Background Pattern (Opsional agar lebih cantik) */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>

        <div className="flex items-center gap-2 mb-6 relative z-10">
          <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-lg backdrop-blur-sm">
            <MapPinIcon className="w-3 h-3 text-emerald-300" />
            <span className="text-xs font-medium truncate max-w-[120px]">
              {city}
            </span>
          </div>
          <span className="text-xs text-emerald-200/80">
            {data.date.hijri.day} {data.date.hijri.month.en}{" "}
            {data.date.hijri.year}
          </span>
        </div>

        <div className="relative z-10">
          <p className="text-xs text-emerald-200 uppercase tracking-wider mb-1">
            Sholat Berikutnya
          </p>
          <h2 className="text-3xl font-bold mb-0 text-emerald-50">
            {nextPrayerInfo?.name || "..."}
          </h2>
          <h1 className="text-5xl font-bold tracking-tight font-mono tabular-nums">
            {timeLeft}
          </h1>
        </div>
      </div>
    </div>
  );
}
