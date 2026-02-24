"use client";

import { useEffect, useState } from "react";
import {
  SunriseIcon,
  SunIcon,
  CloudSunIcon,
  SunsetIcon,
  MoonIcon,
  CompassIcon,
  BellIcon,
  MapPinIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";

export default function Page() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [qiblaAngle, setQiblaAngle] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQiblaAngle((prev) => (prev + 0.5) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

  const changeDate = (days: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(newDate);
  };

  const isToday = selectedDate.toDateString() === new Date().toDateString();

  return (
    <div className="pb-24 min-h-screen bg-cream-100">
      {/* Header */}
      <header className="px-4 pt-6 pb-4 bg-white sticky top-0 z-10 border-b border-cream-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-ink">Prayer Times</h1>
            <p className="text-xs text-ink-muted mt-1">
              Based on your location
            </p>
          </div>
          <button
            className="p-2 rounded-lg hover:bg-cream-200 transition-colors"
            aria-label="Notifications">
            <BellIcon className="w-5 h-5 text-ink-muted" />
          </button>
        </div>
      </header>

      {/* Location */}
      <div className="px-4 mt-3 flex items-center gap-1.5 text-ink-muted">
        <MapPinIcon className="w-3.5 h-3.5 text-primary-500" />
        <span className="text-xs">Jakarta, Indonesia</span>
      </div>

      {/* Date Selector */}
      <div className="px-4 mt-3">
        <div className="flex items-center justify-between bg-white rounded-xl border border-cream-300 px-3 py-2">
          <button
            onClick={() => changeDate(-1)}
            className="p-1 rounded-lg hover:bg-cream-100 transition-colors">
            <ChevronLeftIcon className="w-4 h-4 text-ink-muted" />
          </button>

          <div className="text-center">
            <p className="text-sm font-medium text-ink">
              {formatDate(selectedDate)}
            </p>
            {isToday && (
              <span className="text-[10px] text-primary-600 font-medium">
                Today
              </span>
            )}
          </div>

          <button
            onClick={() => changeDate(1)}
            className="p-1 rounded-lg hover:bg-cream-100 transition-colors">
            <ChevronRightIcon className="w-4 h-4 text-ink-muted" />
          </button>
        </div>
      </div>

      {/* Prayer Times */}
      <div className="px-4 mt-4">
        <div className="bg-white rounded-2xl shadow-sm border border-cream-300 divide-y divide-cream-200">
          <PrayerTimeRow icon={SunriseIcon} name="Fajr" time="5:12 AM" />
          <PrayerTimeRow
            icon={SunriseIcon}
            name="Sunrise"
            time="6:24 AM"
            isSunrise
          />
          <PrayerTimeRow icon={SunIcon} name="Dhuhr" time="12:30 PM" />
          <PrayerTimeRow icon={CloudSunIcon} name="Asr" time="3:45 PM" isNext />
          <PrayerTimeRow icon={SunsetIcon} name="Maghrib" time="6:18 PM" />
          <PrayerTimeRow icon={MoonIcon} name="Isha" time="7:45 PM" />
        </div>
      </div>

      {/* Qibla */}
      <div className="px-4 mt-6 mb-6">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-ink-muted mb-3">
          Qibla Direction
        </h2>

        <div className="bg-white rounded-2xl shadow-sm border border-cream-300 p-6 flex flex-col items-center">
          <div className="relative w-48 h-48">
            <div className="absolute inset-0 rounded-full border-2 border-cream-300" />

            <div
              className="absolute inset-4 transition-transform duration-100 ease-linear"
              style={{ transform: `rotate(${qiblaAngle}deg)` }}>
              <div className="w-full h-full flex flex-col items-center">
                <div className="w-0 h-0 border-l-8 border-r-8 border-b-16 border-l-transparent border-r-transparent border-b-primary-600" />
                <div className="flex-1" />
                <div className="w-0 h-0 border-l-6 border-r-6 border-t-12 border-l-transparent border-r-transparent border-t-cream-400" />
              </div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-primary-600 border-2 border-white" />
            </div>
          </div>

          <div className="flex items-center gap-2 mt-4">
            <CompassIcon className="w-4 h-4 text-primary-600" />
            <span className="text-sm text-ink-light">
              295° NW — Qibla Direction
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

type PrayerTimeRowProps = {
  icon: React.ElementType;
  name: string;
  time: string;
  isNext?: boolean;
  isSunrise?: boolean;
};

function PrayerTimeRow({
  icon: Icon,
  name,
  time,
  isNext = false,
  isSunrise = false,
}: PrayerTimeRowProps) {
  return (
    <div
      className={`flex items-center gap-4 px-4 py-3.5 ${
        isNext ? "bg-primary-50" : ""
      }`}>
      <div
        className={`w-9 h-9 rounded-xl flex items-center justify-center ${
          isNext
            ? "bg-primary-600 text-white"
            : isSunrise
              ? "bg-amber-50 text-amber-600"
              : "bg-cream-200 text-ink-muted"
        }`}>
        <Icon className="w-4 h-4" strokeWidth={1.8} />
      </div>

      <div className="flex-1">
        <p
          className={`text-sm ${
            isNext
              ? "font-semibold text-primary-800"
              : isSunrise
                ? "text-ink-muted"
                : "font-medium text-ink"
          }`}>
          {name}
        </p>

        {isNext && (
          <span className="text-[10px] text-primary-600 font-medium">
            Next prayer
          </span>
        )}
      </div>

      <p
        className={`text-sm ${
          isNext ? "font-bold text-primary-700" : "text-ink-light"
        }`}>
        {time}
      </p>

      {!isSunrise && (
        <button className="p-1 rounded-lg text-ink-muted hover:text-primary-600 transition-colors">
          <BellIcon className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
