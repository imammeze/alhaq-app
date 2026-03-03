"use client";

import { useState, useEffect } from "react";
import { RamadanHeader } from "./RamadanHeader";
import { TargetItem } from "./TargetItem";
import { TargetModal } from "./TargetModal";
import { RamadanDay } from "../services/aladhanService";
import { CalendarIcon, PlusIcon } from "lucide-react";

interface RamadanClientProps {
  calendarData: RamadanDay[];
}

export interface DailyTarget {
  id: string;
  iconId: string;
  title: string;
  subtitle: string;
  bg: string;
  color: string;
  isCustom?: boolean;
}

export default function RamadanClientPage({
  calendarData,
}: RamadanClientProps) {
  const [selectedDay, setSelectedDay] = useState<number>(() => {
    if (!calendarData || calendarData.length === 0) return 1;
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    const todayString = `${dd}-${mm}-${yyyy}`;

    const todayIndex = calendarData.findIndex(
      (day) => day.date.gregorian.date === todayString
    );
    return todayIndex !== -1 ? todayIndex + 1 : 1;
  });

  const todayData = calendarData[selectedDay - 1];
  const imsakTime = todayData?.timings.Imsak?.split(" ")[0] || "04:30";
  const maghribTime = todayData?.timings.Maghrib?.split(" ")[0] || "17:45";

  const [targets, setTargets] = useState<DailyTarget[]>([]);
  const [completedTasks, setCompletedTasks] = useState<
    Record<number, string[]>
  >({});
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTarget, setEditingTarget] = useState<DailyTarget | null>(null);

  useEffect(() => {
    const savedTasks = localStorage.getItem("ramadan_progress");
    if (savedTasks) setCompletedTasks(JSON.parse(savedTasks));

    const savedTargets = localStorage.getItem("ramadan_targets");
    if (savedTargets) {
      setTargets(JSON.parse(savedTargets));
    } else {
      setTargets([
        {
          id: "sahur",
          iconId: "coffee",
          title: "Makan Sahur",
          subtitle: `Batas Imsak pukul ${imsakTime}`,
          bg: "bg-orange-50",
          color: "text-orange-500",
        },
        {
          id: "puasa",
          iconId: "shield",
          title: "Puasa Ramadan",
          subtitle: `Buka Puasa pukul ${maghribTime}`,
          bg: "bg-orange-50",
          color: "text-orange-500",
        },
        {
          id: "tilawah",
          iconId: "book",
          title: "Tilawah 1 Juz",
          subtitle: "Target khatam Al-Quran",
          bg: "bg-emerald-50",
          color: "text-emerald-500",
        },
        {
          id: "sedekah",
          iconId: "heart",
          title: "Sedekah Harian",
          subtitle: "Berbagi rezeki kepada sesama",
          bg: "bg-pink-50",
          color: "text-pink-500",
        },
        {
          id: "tarawih",
          iconId: "star",
          title: "Sholat Tarawih",
          subtitle: "Qiyamul Lail berjamaah",
          bg: "bg-indigo-50",
          color: "text-indigo-500",
        },
      ]);
    }
    setIsDataLoaded(true);
  }, [imsakTime, maghribTime]);

  useEffect(() => {
    if (isDataLoaded) {
      localStorage.setItem("ramadan_progress", JSON.stringify(completedTasks));
      localStorage.setItem("ramadan_targets", JSON.stringify(targets));
    }
  }, [completedTasks, targets, isDataLoaded]);

  useEffect(() => {
    if (isDataLoaded) {
      setTimeout(() => {
        const selectedBtn = document.getElementById(`day-btn-${selectedDay}`);
        if (selectedBtn) {
          selectedBtn.scrollIntoView({
            behavior: "smooth",
            inline: "center",
            block: "nearest",
          });
        }
      }, 100);
    }
  }, [selectedDay, isDataLoaded]);

  const tasksForToday = completedTasks[selectedDay] || [];
  const progressPercentage =
    targets.length > 0
      ? Math.round((tasksForToday.length / targets.length) * 100)
      : 0;
  const strokeDashoffset = 100 - progressPercentage;

  const toggleTask = (taskId: string) => {
    setCompletedTasks((prev) => {
      const todayTasks = prev[selectedDay] || [];
      const isCompleted = todayTasks.includes(taskId);
      return {
        ...prev,
        [selectedDay]: isCompleted
          ? todayTasks.filter((id) => id !== taskId)
          : [...todayTasks, taskId],
      };
    });
  };

  const handleSaveTarget = (data: {
    id?: string;
    title: string;
    subtitle: string;
    iconId: string;
  }) => {
    if (data.id) {
      setTargets((prev) =>
        prev.map((t) =>
          t.id === data.id
            ? {
                ...t,
                title: data.title,
                subtitle: data.subtitle,
                iconId: data.iconId,
              }
            : t
        )
      );
    } else {
      const newTarget: DailyTarget = {
        id: `custom_${Date.now()}`,
        iconId: data.iconId,
        title: data.title,
        subtitle: data.subtitle,
        bg: "bg-emerald-50",
        color: "text-emerald-600",
        isCustom: true,
      };
      setTargets((prev) => [...prev, newTarget]);
    }
  };

  const handleDeleteTarget = (taskId: string) => {
    if (confirm("Hapus target ini dari daftar harian?")) {
      setTargets((prev) => prev.filter((t) => t.id !== taskId));
    }
  };

  const openAddModal = () => {
    setEditingTarget(null);
    setIsModalOpen(true);
  };

  const openEditModal = (target: DailyTarget) => {
    setEditingTarget(target);
    setIsModalOpen(true);
  };

  if (!isDataLoaded) return null;

  return (
    <div className="pb-24 bg-gray-50 min-h-screen">
      <RamadanHeader />

      <div className="px-5 mt-4">
        <div className="bg-[#064e3b] rounded-3xl p-6 text-white relative overflow-hidden shadow-lg">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />

          <div className="flex justify-between items-start relative z-10">
            <div>
              <span className="px-2 py-1 bg-white/20 rounded-lg text-[10px] font-bold flex items-center gap-1 w-fit mb-3 backdrop-blur-sm">
                <CalendarIcon className="w-3 h-3" />
                {todayData?.date.hijri.year || "1446"} H
              </span>
              <h2 className="text-3xl font-bold mb-1">Hari ke-{selectedDay}</h2>
              <p className="text-xs text-emerald-200/80 font-medium">
                {todayData?.date.readable || "Memuat..."}
              </p>
            </div>

            <div className="relative w-20 h-20 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="4"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#dcf59f"
                  strokeWidth="4"
                  strokeDasharray="100, 100"
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-700 ease-out"
                />
              </svg>
              <span className="absolute text-lg font-bold">
                {progressPercentage}%
              </span>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3 relative z-10">
            <div className="flex-1 bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#dcf59f] h-full rounded-full transition-all duration-700 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="px-5 flex justify-between items-center mb-4">
          <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
            Pilih Hari
          </h3>
          <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded-md">
            {30 - selectedDay} Hari menuju Idul Fitri
          </span>
        </div>

        <div className="flex gap-2 overflow-x-auto px-5 pb-2 no-scrollbar snap-x scroll-smooth">
          {calendarData.map((day, idx) => {
            const dayNum = idx + 1;
            const isSelected = selectedDay === dayNum;
            const hasProgress = completedTasks[dayNum]?.length > 0;

            return (
              <button
                id={`day-btn-${dayNum}`}
                key={dayNum}
                onClick={() => setSelectedDay(dayNum)}
                className={`flex-none w-[60px] h-[70px] rounded-2xl flex flex-col items-center justify-center gap-1 border transition-all snap-center relative ${
                  isSelected
                    ? "bg-[#064e3b] border-[#064e3b] text-white shadow-md scale-105"
                    : "bg-white border-gray-100 text-gray-500 hover:border-emerald-200"
                }`}>
                {hasProgress && !isSelected && (
                  <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400" />
                )}
                <span
                  className={`text-[9px] font-bold ${
                    isSelected ? "text-emerald-300" : "text-gray-400"
                  }`}>
                  H-{dayNum}
                </span>
                <span className="text-xl font-bold">{dayNum}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-5 mt-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
            Target Harian
          </h3>
          <button
            onClick={openAddModal}
            className="px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 active:scale-95 transition text-[10px] font-bold rounded-full flex items-center gap-1">
            <PlusIcon className="w-3 h-3" /> Tambah
          </button>
        </div>

        <div className="space-y-3">
          {targets.map((target) => (
            <TargetItem
              key={target.id}
              iconId={target.iconId}
              title={target.title}
              subtitle={target.subtitle}
              bg={target.bg}
              color={target.color}
              isCompleted={tasksForToday.includes(target.id)}
              onClick={() => toggleTask(target.id)}
              onEdit={() => openEditModal(target)}
              onDelete={() => handleDeleteTarget(target.id)}
            />
          ))}
        </div>
      </div>

      <TargetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTarget}
        initialData={editingTarget}
      />
    </div>
  );
}
