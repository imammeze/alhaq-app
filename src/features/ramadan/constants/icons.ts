import {
  CoffeeIcon,
  ShieldIcon,
  BookOpenIcon,
  HeartIcon,
  StarIcon,
  LayoutGridIcon,
  ZapIcon,
  SunIcon,
  MoonIcon,
  CloudIcon,
  MusicIcon,
  SmartphoneIcon,
  BellIcon,
  BookmarkIcon,
  MessageCircleIcon,
  MicIcon,
  VideoIcon,
  CameraIcon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const ICON_OPTIONS: { id: string; icon: LucideIcon }[] = [
  { id: "coffee", icon: CoffeeIcon },
  { id: "shield", icon: ShieldIcon },
  { id: "book", icon: BookOpenIcon },
  { id: "heart", icon: HeartIcon },
  { id: "star", icon: StarIcon },
  { id: "grid", icon: LayoutGridIcon },
  { id: "zap", icon: ZapIcon },
  { id: "sun", icon: SunIcon },
  { id: "moon", icon: MoonIcon },
  { id: "cloud", icon: CloudIcon },
  { id: "music", icon: MusicIcon },
  { id: "smartphone", icon: SmartphoneIcon },
  { id: "bell", icon: BellIcon },
  { id: "bookmark", icon: BookmarkIcon },
  { id: "message", icon: MessageCircleIcon },
  { id: "mic", icon: MicIcon },
  { id: "video", icon: VideoIcon },
  { id: "camera", icon: CameraIcon },
];

export const getIconComponent = (id: string): LucideIcon => {
  return ICON_OPTIONS.find((opt) => opt.id === id)?.icon || StarIcon;
};
