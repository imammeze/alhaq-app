"use client";

import { useState, useMemo } from "react";
import { PRAYER_LIST } from "../constants/prayers";
import { TrackerStats } from "../types";

export const usePrayerTracker = () => {
  const [completedIds, setCompletedIds] = useState<string[]>([]);

  const togglePrayer = (id: string) => {
    setCompletedIds((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
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
  };
};
