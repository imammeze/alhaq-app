"use client";

import { useEffect, useState } from "react";
import { PrayerTimesResponse } from "@/shared/types/api";

interface PrayerScheduleProps {
  timings?: PrayerTimesResponse["data"]["timings"];
}

export default function PrayerSchedule({ timings }: PrayerScheduleProps) {
  const [currentTime, setCurrentTime] = useState<number>(0);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.getHours() * 60 + now.getMinutes());
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!timings) return null;

  const prayers = [
    { name: "Subuh", time: timings.Fajr },
    { name: "Dzuhur", time: timings.Dhuhr },
    { name: "Ashar", time: timings.Asr },
    { name: "Maghrib", time: timings.Maghrib },
    { name: "Isya", time: timings.Isha },
  ];

  let nextFound = false;

  const prayersWithStatus = prayers.map((prayer) => {
    const [hours, minutes] = prayer.time.split(":").map(Number);
    const prayerMinutes = hours * 60 + minutes;

    let status: "past" | "next" | "future" = "future";

    if (prayerMinutes < currentTime) {
      status = "past";
    } else if (!nextFound) {
      status = "next";
      nextFound = true;
    }

    return { ...prayer, status };
  });

  return (
    <div className="px-5 mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          Jadwal Hari Ini
        </h3>
        <button className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-full">
          Lihat Detail
        </button>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 space-y-5">
        {prayersWithStatus.map((prayer, index) => {
          const isNext = prayer.status === "next";
          const isPast = prayer.status === "past";

          return (
            <div
              key={prayer.name}
              className="flex items-center justify-between group">
              {/* Kiri: Indikator & Nama */}
              <div className="flex items-center gap-4">
                {/* Dot Indicator */}
                <div
                  className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                    isNext
                      ? "bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.2)]"
                      : isPast
                      ? "bg-gray-200"
                      : "bg-emerald-200"
                  }`}
                />

                {/* Nama Sholat */}
                <span
                  className={`text-sm font-medium transition-colors ${
                    isNext ? "text-emerald-700 font-bold" : "text-gray-600"
                  }`}>
                  {prayer.name}
                </span>
              </div>

              {/* Kanan: Badge (Optional) & Jam */}
              <div className="flex items-center gap-3">
                {/* Badge 'Akan Datang' hanya jika isNext */}
                {isNext && (
                  <span className="px-2 py-0.5 bg-emerald-600 text-white text-[10px] font-bold rounded flex items-center shadow-sm animate-in fade-in zoom-in duration-300">
                    Akan Datang
                  </span>
                )}

                {/* Jam */}
                <span
                  className={`text-sm font-mono transition-colors ${
                    isNext ? "text-emerald-700 font-bold" : "text-gray-600"
                  }`}>
                  {prayer.time}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
