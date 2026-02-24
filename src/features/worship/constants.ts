import { WorshipItem } from "./types";

export const WORSHIP_ITEMS: WorshipItem[] = [
  {
    id: "subhanallah",
    label: "Subhanallah",
    arabic: "سُبْحَانَ ٱللَّٰهِ",
    target: 33,
  },
  {
    id: "alhamdulillah",
    label: "Alhamdulillah",
    arabic: "ٱلْحَمْدُ لِلَّٰهِ",
    target: 33,
  },
  {
    id: "allahuakbar",
    label: "Allahu Akbar",
    arabic: "ٱللَّٰهُ أَكْبَرُ",
    target: 34,
  },
];

export const RADIUS = 45;
export const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
