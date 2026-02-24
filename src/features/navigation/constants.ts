import {
  HomeIcon,
  CheckSquareIcon,
  BookOpenIcon,
  ScrollIcon,
  HeartIcon,
  CircleDotIcon,
  MoonStarIcon,
  CalculatorIcon,
  FileTextIcon,
  StickyNoteIcon,
  UserIcon,
} from "lucide-react";

import { NavItem } from "./types";

export const NAV_ITEMS: NavItem[] = [
  { id: "", label: "Home", path: "/", icon: HomeIcon },
  { id: "worship", label: "Ibadah", path: "/worship", icon: CheckSquareIcon },
  { id: "quran", label: "Quran", path: "/quran", icon: BookOpenIcon },
  { id: "hadith", label: "Hadits", path: "/hadith", icon: ScrollIcon },
  { id: "doa", label: "Doa", path: "/doa", icon: HeartIcon },
  { id: "tasbih", label: "Tasbih", path: "/tasbih", icon: CircleDotIcon },
  { id: "ramadan", label: "Ramadan", path: "/ramadan", icon: MoonStarIcon },
  { id: "zakat", label: "Zakat", path: "/zakat", icon: CalculatorIcon },
  { id: "articles", label: "Artikel", path: "/articles", icon: FileTextIcon },
  { id: "notes", label: "Catatan", path: "/notes", icon: StickyNoteIcon },
  { id: "profile", label: "Profil", path: "/profile", icon: UserIcon },
];
