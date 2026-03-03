"use client";

import { useState, useEffect } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DownloadIcon,
  PencilIcon,
  CheckIcon,
} from "lucide-react";
import { KalenderHeader, SunnahCard, TaskRow } from "./KalenderUI";
import {
  AladhanDay,
  getMonthlyCalendar,
} from "../services/aladhanCalendarService";

interface Props {
  initialData: AladhanDay[];
  initialMonth: number;
  initialYear: number;
}

const DAYS_OF_WEEK = ["MIN", "SEN", "SEL", "RAB", "KAM", "JUM", "SAB"];
const SHOLAT_LIST = ["Subuh", "Dzuhur", "Ashar", "Maghrib", "Isya"];

export default function KalenderClientPage({
  initialData,
  initialMonth,
  initialYear,
}: Props) {
  const [currentDate, setCurrentDate] = useState(
    new Date(initialYear, initialMonth - 1, 1)
  );
  const [calendarData, setCalendarData] = useState<AladhanDay[]>(initialData);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedDayInfo, setSelectedDayInfo] = useState<AladhanDay>(() => {
    const today = new Date().getDate().toString().padStart(2, "0");
    return (
      initialData.find((d) => d.date.gregorian.day === today) || initialData[0]
    );
  });

  const [completedSholat, setCompletedSholat] = useState<string[]>([]);

  useEffect(() => {
    const fetchNewMonth = async () => {
      setIsLoading(true);
      const data = await getMonthlyCalendar(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1
      );
      setCalendarData(data);
      setSelectedDayInfo(data[0]);
      setIsLoading(false);
    };

    if (
      currentDate.getMonth() + 1 !== initialMonth ||
      currentDate.getFullYear() !== initialYear
    ) {
      fetchNewMonth();
    }
  }, [currentDate, initialMonth, initialYear]);

  const handlePrevMonth = () =>
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  const handleNextMonth = () =>
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );

  const toggleSholat = (sholat: string) => {
    setCompletedSholat((prev) =>
      prev.includes(sholat)
        ? prev.filter((s) => s !== sholat)
        : [...prev, sholat]
    );
  };

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();
  const blankDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const hijriDayNumber = parseInt(selectedDayInfo?.date.hijri.day || "0");
  const isAyyamulBidh = hijriDayNumber >= 13 && hijriDayNumber <= 15;
  const isSeninKamis =
    selectedDayInfo?.date.gregorian.weekday.en === "Monday" ||
    selectedDayInfo?.date.gregorian.weekday.en === "Thursday";

  const currentMonthName = currentDate.toLocaleString("id-ID", {
    month: "long",
  });
  const uniqueHijriMonths = Array.from(
    new Set(calendarData.map((d) => d.date.hijri.month.en))
  );
  const hijriMonthText = uniqueHijriMonths.join(" - ");

  return (
    <div className="pb-24 bg-white min-h-screen">
      <KalenderHeader />

      <div className="px-5 mt-2">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handlePrevMonth}
            className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-50 active:scale-95 transition">
            <ChevronLeftIcon className="w-4 h-4" />
          </button>

          <div className="text-center">
            <h2 className="text-sm font-bold text-gray-800">
              {currentMonthName} {currentDate.getFullYear()}
            </h2>
            <p className="text-[10px] text-gray-400 font-medium flex items-center justify-center gap-1">
              <img
                src="https://api.iconify.design/ph:moon-fill.svg?color=%239ca3af"
                className="w-3 h-3"
                alt="moon"
              />
              {hijriMonthText}
            </p>
          </div>

          <button
            onClick={handleNextMonth}
            className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-50 active:scale-95 transition">
            <ChevronRightIcon className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {DAYS_OF_WEEK.map((day, i) => (
            <div
              key={day}
              className={`text-center text-[9px] font-bold uppercase tracking-wider ${
                i === 0 ? "text-red-500" : "text-gray-400"
              }`}>
              {day}
            </div>
          ))}
        </div>

        <div
          className={`grid grid-cols-7 gap-y-3 gap-x-1 transition-opacity duration-300 ${
            isLoading ? "opacity-30" : "opacity-100"
          }`}>
          {blankDays.map((_, i) => (
            <div key={`blank-${i}`} />
          ))}

          {calendarData.map((dayData, i) => {
            const isSelected =
              selectedDayInfo?.date.gregorian.date ===
              dayData.date.gregorian.date;
            const isSunday =
              new Date(
                parseInt(dayData.date.gregorian.year),
                parseInt(dayData.date.gregorian.month.number.toString()) - 1,
                parseInt(dayData.date.gregorian.day)
              ).getDay() === 0;

            return (
              <button
                key={i}
                onClick={() => setSelectedDayInfo(dayData)}
                className={`w-11 h-12 mx-auto rounded-2xl flex flex-col items-center justify-center gap-0.5 transition-all ${
                  isSelected
                    ? "bg-[#064e3b] text-white shadow-md scale-105"
                    : "bg-transparent hover:bg-gray-50"
                }`}>
                <span
                  className={`text-sm font-bold ${
                    isSelected
                      ? "text-white"
                      : isSunday
                      ? "text-red-500"
                      : "text-gray-800"
                  }`}>
                  {parseInt(dayData.date.gregorian.day)}
                </span>
                <span
                  className={`text-[8px] font-bold ${
                    isSelected ? "text-emerald-200" : "text-gray-400"
                  }`}>
                  {parseInt(dayData.date.hijri.day)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {selectedDayInfo && (
        <div className="mt-8 px-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-white rounded-4xl border border-gray-100 shadow-[0_0_40px_rgba(0,0,0,0.03)] p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  {selectedDayInfo.date.gregorian.weekday.en},{" "}
                  {parseInt(selectedDayInfo.date.gregorian.day)}{" "}
                  {selectedDayInfo.date.gregorian.month.en}{" "}
                  {selectedDayInfo.date.gregorian.year}
                </h3>
                <p className="text-xs text-gray-500 font-medium flex items-center gap-1 mt-1">
                  <img
                    src="https://api.iconify.design/ph:moon-fill.svg?color=%236b7280"
                    className="w-3.5 h-3.5"
                    alt="moon"
                  />
                  {selectedDayInfo.date.hijri.day}{" "}
                  {selectedDayInfo.date.hijri.month.en}{" "}
                  {selectedDayInfo.date.hijri.year} H
                </p>
              </div>
              <button className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-emerald-600 transition">
                <DownloadIcon className="w-4 h-4" />
              </button>
            </div>

            <SunnahCard
              isAyyamulBidh={isAyyamulBidh}
              isSeninKamis={isSeninKamis}
            />

            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                  <CheckIcon className="w-3.5 h-3.5" /> SHOLAT FARDHU
                </h4>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-400">
                    {completedSholat.length}/5
                  </span>
                  <button className="px-2 py-1 bg-gray-50 text-gray-500 rounded text-[9px] font-bold flex items-center gap-1">
                    <PencilIcon className="w-2.5 h-2.5" /> EDIT
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                {SHOLAT_LIST.map((sholat) => (
                  <TaskRow
                    key={sholat}
                    title={sholat}
                    isCompleted={completedSholat.includes(sholat)}
                    onClick={() => toggleSholat(sholat)}
                  />
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                  <img
                    src="https://api.iconify.design/mingcute:leaf-line.svg?color=%236b7280"
                    className="w-3.5 h-3.5"
                    alt="leaf"
                  />{" "}
                  IBADAH HARIAN
                </h4>
                <button className="px-2 py-1 bg-gray-50 text-gray-500 rounded text-[9px] font-bold flex items-center gap-1">
                  <PencilIcon className="w-2.5 h-2.5" /> EDIT
                </button>
              </div>
              <div className="w-full py-4 border border-dashed border-gray-200 rounded-xl flex items-center justify-center">
                <span className="text-xs text-gray-400 font-medium">
                  Belum ada data ibadah harian
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
