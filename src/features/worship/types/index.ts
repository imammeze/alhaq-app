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
