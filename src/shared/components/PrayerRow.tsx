import { PrayerTime } from "@/features/home/types";

interface Props {
  prayer: PrayerTime;
}

export default function PrayerRow({ prayer }: Props) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-700 font-medium">{prayer.name}</span>
      <span className="text-gray-900 font-bold">{prayer.time}</span>
    </div>
  );
}
