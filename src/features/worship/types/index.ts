import { LucideIcon } from "lucide-react";

export interface PrayerEntity {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface TrackerStats {
  total: number;
  completed: number;
  percentage: number;
  remaining: number;
  isAllCompleted: boolean;
}

export interface DailyTargetEntity {
  id: number;
  title: string;
  subtitle: string;
  iconName: string;
  color: string;
  bg: string;
  isCompleted: boolean;
}

export type NewTargetForm = Omit<DailyTargetEntity, "id" | "isCompleted">;
