"use client";

import { useEffect, useState } from "react";
import { MapPinIcon, MoonIcon, SunriseIcon } from "lucide-react";
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
  const [progress, setProgress] = useState(0);
  const [nextPrayerInfo, setNextPrayerInfo] = useState<{
    name: string;
    time: string;
  } | null>(null);

  useEffect(() => {
    if (!data) return;

    const timings = data.timings;

    const timer = setInterval(() => {
      const { nextPrayerName, targetDate } = getNextPrayer(timings);
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft("00:00:00");
        setProgress(100);
      } else {
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        setTimeLeft(
          `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
        );

        const nextH = targetDate.getHours();
        const nextM = targetDate.getMinutes();
        const nextTimeStr = `${nextH.toString().padStart(2, "0")}:${nextM
          .toString()
          .padStart(2, "0")}`;

        let englishNextKey = "Fajr";
        const corePrayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
        for (const key of corePrayers) {
          const timeString =
            (timings[key as keyof typeof timings] as string) || "";
          if (timeString.startsWith(nextTimeStr)) {
            englishNextKey = key;
            break;
          }
        }

        const prevMap: Record<string, string> = {
          Fajr: "Isha",
          Dhuhr: "Fajr",
          Asr: "Dhuhr",
          Maghrib: "Asr",
          Isha: "Maghrib",
        };
        const prevKey = prevMap[englishNextKey] || "Isha";
        const prevTimeStrRaw =
          (timings[prevKey as keyof typeof timings] as string)?.split(" ")[0] ||
          "00:00";
        const prevH = Number(prevTimeStrRaw.split(":")[0]) || 0;
        const prevM = Number(prevTimeStrRaw.split(":")[1]) || 0;

        let targetSec = nextH * 3600 + nextM * 60;
        let prevSec = prevH * 3600 + prevM * 60;
        const currentSec =
          now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();

        if (currentSec > targetSec) {
          targetSec += 86400;
        }

        if (prevSec > targetSec) {
          prevSec -= 86400;
        }

        const totalDurationSec = targetSec - prevSec;
        const elapsedSec = currentSec - prevSec;
        let currentProgress = (elapsedSec / totalDurationSec) * 100;

        if (currentProgress < 0) currentProgress = 0;
        if (currentProgress > 100) currentProgress = 100;

        setProgress(currentProgress);
        setNextPrayerInfo({ name: nextPrayerName, time: nextTimeStr });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [data]);

  if (loading || !data) {
    return (
      <div className="px-5 mt-2">
        <div className="bg-[#064e3b] rounded-3xl p-6 h-[220px] animate-pulse flex flex-col justify-center items-center">
          <div className="h-4 w-32 bg-emerald-800/50 rounded mb-4"></div>
          <div className="h-10 w-48 bg-emerald-800/50 rounded"></div>
        </div>
      </div>
    );
  }

  const imsakTime = (data.timings.Imsak as string)?.split(" ")[0] || "--:--";
  const sunriseTime =
    (data.timings.Sunrise as string)?.split(" ")[0] || "--:--";

  return (
    <div className="px-5 mt-2">
      <div className="bg-[#064e3b] rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>

        <div className="flex items-center justify-between mb-6 relative z-10">
          <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-lg backdrop-blur-sm">
            <MapPinIcon className="w-3 h-3 text-emerald-300" />
            <span className="text-xs font-medium truncate max-w-[120px]">
              {city}
            </span>
          </div>
          <span className="text-xs text-emerald-200/80 font-medium">
            {data.date.hijri.day} {data.date.hijri.month.en}{" "}
            {data.date.hijri.year}
          </span>
        </div>

        <p className="text-xs text-emerald-200 uppercase tracking-wider mb-1">
          Sholat Berikutnya
        </p>

        <div className="relative z-10 flex flex-col">
          <div className="flex justify-between items-end mb-1">
            <h2 className="text-2xl font-bold text-emerald-50">
              {nextPrayerInfo?.name || "..."}
            </h2>
          </div>

          <h1 className="text-5xl font-bold tracking-tight font-mono tabular-nums mb-4">
            {timeLeft}{" "}
            <span className="text-sm font-sans text-emerald-200 font-medium tracking-normal">
              lagi
            </span>
          </h1>

          {nextPrayerInfo && (
            <div className="w-full mt-2 flex items-center gap-3">
              <div className="flex-1 h-1.5 bg-emerald-900/40 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-400 rounded-full transition-all duration-1000 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="shrink-0">
                <span className="text-[10px] font-medium text-emerald-100/80 tracking-wide">
                  Pukul{" "}
                  <span className="font-bold text-white text-[11px] ml-0.5">
                    {nextPrayerInfo.time}
                  </span>
                </span>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 mt-4">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <MoonIcon className="w-3 h-3 text-amber-200/90" />
              <span className="text-[10px] font-bold text-emerald-300 ml-0.5">
                Imsak
              </span>
              <span className="text-[11px] font-bold text-white ml-0.5">
                {imsakTime}
              </span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <SunriseIcon className="w-3 h-3 text-amber-200/90" />
              <span className="text-[10px] font-bold text-emerald-300 ml-0.5">
                Terbit
              </span>
              <span className="text-[11px] font-bold text-white ml-0.5">
                {sunriseTime}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
