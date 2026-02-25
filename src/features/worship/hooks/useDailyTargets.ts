"use client";

import { useState, useEffect } from "react";
import { DailyTargetEntity, NewTargetForm } from "../types";
import { DEFAULT_TARGETS } from "../constants/targets";

const STORAGE_KEY = "worship_daily_targets";

export const useDailyTargets = () => {
  const [targets, setTargets] = useState<DailyTargetEntity[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        setTargets(JSON.parse(savedData));
      } catch (error) {
        console.error("Gagal parsing data target:", error);
        setTargets(DEFAULT_TARGETS);
      }
    } else {
      setTargets(DEFAULT_TARGETS);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(targets));
    }
  }, [targets, isLoaded]);

  const toggleTarget = (id: number) => {
    setTargets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isCompleted: !t.isCompleted } : t))
    );
  };

  const addTarget = (form: NewTargetForm) => {
    const newId =
      targets.length > 0 ? Math.max(...targets.map((t) => t.id)) + 1 : 1;

    setTargets((prev) => [...prev, { ...form, id: newId, isCompleted: false }]);
    setIsModalOpen(false);
  };

  const deleteTarget = (id: number) => {
    setTargets((prev) => prev.filter((t) => t.id !== id));
  };

  const completedCount = targets.filter((t) => t.isCompleted).length;

  return {
    targets,
    stats: { completedCount },
    isModalOpen,
    setIsModalOpen,
    toggleTarget,
    addTarget,
    deleteTarget,
    isLoaded,
  };
};
