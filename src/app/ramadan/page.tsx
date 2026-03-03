import { getRamadanCalendar } from "@/features/ramadan/services/aladhanService";
import RamadanClientPage from "@/features/ramadan/components/RamadanClientPage";

export default async function RamadanPage() {
  const calendarData = await getRamadanCalendar(
    "Purwokerto",
    "Indonesia",
    1447
  );

  if (!calendarData || calendarData.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Gagal memuat jadwal Ramadan. Silakan muat ulang.
      </div>
    );
  }

  return <RamadanClientPage calendarData={calendarData} />;
}
