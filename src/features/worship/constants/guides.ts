import {
  MapPin,
  Sun,
  Clock,
  Moon,
  CloudSun,
  Sparkles,
  Users,
  Calendar,
  Heart,
  BookOpen,
} from "lucide-react";

export interface GuideItem {
  id: string;
  title: string;
  subtitle: string;
  icon: any;
  color: string;
  bg: string;
}

export const NIAT_SHOLAT_LIST: GuideItem[] = [
  {
    id: "1",
    title: "Sholat Safar (Jamak/Qasar)",
    subtitle: "10 Niat",
    icon: MapPin,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    id: "2",
    title: "Sholat Wajib (Fardhu)",
    subtitle: "5 Niat",
    icon: Sun,
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
  {
    id: "3",
    title: "Sholat Sunnah Rawatib",
    subtitle: "5 Niat",
    icon: Clock,
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    id: "4",
    title: "Sholat Sunnah Malam",
    subtitle: "4 Niat",
    icon: Moon,
    color: "text-indigo-500",
    bg: "bg-indigo-50",
  },
  {
    id: "5",
    title: "Sholat Sunnah Siang",
    subtitle: "2 Niat",
    icon: CloudSun,
    color: "text-yellow-500",
    bg: "bg-yellow-50",
  },
  {
    id: "6",
    title: "Sholat Sunnah Khusus",
    subtitle: "5 Niat",
    icon: Sparkles,
    color: "text-purple-500",
    bg: "bg-purple-50",
  },
  {
    id: "7",
    title: "Sholat Berjamaah",
    subtitle: "2 Niat",
    icon: Users,
    color: "text-teal-600",
    bg: "bg-teal-50",
  },
  {
    id: "8",
    title: "Sholat Hari Raya",
    subtitle: "2 Niat",
    icon: Calendar,
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    id: "9",
    title: "Sholat Jenazah",
    subtitle: "1 Niat",
    icon: Heart,
    color: "text-pink-500",
    bg: "bg-pink-50",
  },
];

export const BACAAN_SHOLAT_LIST: GuideItem[] = [
  {
    id: "1",
    title: "Tata Cara Sholat Sunnah Rawatib",
    subtitle: "Sunnah (Qabliyah dan Ba'diyah)",
    icon: BookOpen,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    id: "2",
    title: "Tata Cara Sholat Fardhu",
    subtitle: "Fardhu",
    icon: BookOpen,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    id: "3",
    title: "Tata Cara Sholat Jenazah",
    subtitle: "Fardhu Kifayah",
    icon: BookOpen,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    id: "4",
    title: "Tata Cara Sholat Idul Fitri",
    subtitle: "Sunnah Muakkad",
    icon: BookOpen,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    id: "5",
    title: "Tata Cara Sholat Idul Adha",
    subtitle: "Sunnah Muakkad",
    icon: BookOpen,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    id: "6",
    title: "Tata Cara Sholat Jamak Taqdim",
    subtitle: "Fardhu (Safar/Uzur)",
    icon: BookOpen,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
];
