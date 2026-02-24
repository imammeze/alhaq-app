import {
  SunriseIcon,
  SunIcon,
  CloudSunIcon,
  SunsetIcon,
  MoonIcon,
} from "lucide-react";
import { PrayerEntity } from "../types";

export const PRAYER_LIST: PrayerEntity[] = [
  { id: "Subuh", label: "Subuh", icon: SunriseIcon },
  { id: "Dzuhur", label: "Dzuhur", icon: SunIcon },
  { id: "Ashar", label: "Ashar", icon: CloudSunIcon },
  { id: "Maghrib", label: "Maghrib", icon: SunsetIcon },
  { id: "Isya", label: "Isya", icon: MoonIcon },
];
