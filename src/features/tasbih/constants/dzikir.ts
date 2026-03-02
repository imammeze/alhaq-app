export interface DzikirOption {
  id: string;
  label: string;
  arabic: string;
  target: number | null;
}

export interface HistoryItem {
  id: string;
  title: string;
  count: number;
  date: string;
}

export const DZIKIR_OPTIONS: DzikirOption[] = [
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
    target: 33,
  },
  {
    id: "tahlil",
    label: "Laa ilaaha illallah",
    arabic: "لَا إِلَٰهَ إِلَّا ٱللَّٰهُ",
    target: 100,
  },
  {
    id: "istighfar",
    label: "Astaghfirullah",
    arabic: "أَسْتَغْفِرُ اللَّهَ",
    target: 100,
  },
  {
    id: "shalawat",
    label: "Shalawat Nabi",
    arabic: "اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ",
    target: 100,
  },
  {
    id: "bebas",
    label: "Target Bebas",
    arabic: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم",
    target: null,
  },
];
