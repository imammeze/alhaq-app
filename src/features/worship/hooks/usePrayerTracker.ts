"use client";

import { useState, useEffect, useMemo } from "react";
import { PRAYER_LIST } from "../constants/prayers";
import { TrackerStats } from "../types";

const STORAGE_KEY = "worship_prayer_tracker";

export const usePrayerTracker = () => {
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        setCompletedIds(JSON.parse(savedData));
      } catch (error) {
        console.error("Gagal parsing data sholat:", error);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completedIds));
    }
  }, [completedIds, isLoaded]);

  const togglePrayer = (id: string) => {
    setCompletedIds((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const markAllAsCompleted = () => {
    const allIds = PRAYER_LIST.map((p) => p.id);
    setCompletedIds(allIds);
  };

  const stats: TrackerStats = useMemo(() => {
    const total = PRAYER_LIST.length;
    const completed = completedIds.length;

    return {
      total,
      completed,
      percentage: (completed / total) * 100,
      remaining: total - completed,
      isAllCompleted: completed === total,
    };
  }, [completedIds]);

  return {
    prayers: PRAYER_LIST,
    completedIds,
    stats,
    togglePrayer,
    markAllAsCompleted,
    isLoaded,
  };
};
