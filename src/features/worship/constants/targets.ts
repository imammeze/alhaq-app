import {
  Sun,
  Cloud,
  Moon,
  BookOpen,
  MoonStar,
  Heart,
  Briefcase,
  Coffee,
  Zap,
  Music,
  Camera,
  Home,
  MapPin,
  Trophy,
  Star,
} from "lucide-react";
import { DailyTargetEntity } from "../types";

export const ICON_MAP: Record<string, any> = {
  Sun,
  Cloud,
  Moon,
  BookOpen,
  MoonStar,
  Heart,
  Briefcase,
  Coffee,
  Zap,
  Music,
  Camera,
  Home,
  MapPin,
  Trophy,
  Star,
};

export const ICON_OPTIONS = Object.keys(ICON_MAP);

export const COLOR_OPTIONS = [
  { hex: "#10b981", text: "text-emerald-500", bg: "bg-emerald-50" },
  { hex: "#6b7280", text: "text-gray-500", bg: "bg-gray-50" },
  { hex: "#a855f7", text: "text-purple-500", bg: "bg-purple-50" },
  { hex: "#f97316", text: "text-orange-500", bg: "bg-orange-50" },
  { hex: "#ec4899", text: "text-pink-500", bg: "bg-pink-50" },
  { hex: "#14b8a6", text: "text-teal-500", bg: "bg-teal-50" },
  { hex: "#6366f1", text: "text-indigo-500", bg: "bg-indigo-50" },
  { hex: "#ef4444", text: "text-red-500", bg: "bg-red-50" },
];

export const DEFAULT_TARGETS: DailyTargetEntity[] = [
  {
    id: 1,
    title: "Sholat Dhuha",
    subtitle: "Pagi - Siang",
    iconName: "Sun",
    color: "text-orange-500",
    bg: "bg-orange-50",
    isCompleted: false,
  },
  {
    id: 2,
    title: "Dzikir Pagi",
    subtitle: "Setelah Subuh",
    iconName: "Cloud",
    color: "text-blue-500",
    bg: "bg-blue-50",
    isCompleted: false,
  },
];
