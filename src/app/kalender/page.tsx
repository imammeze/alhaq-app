import { getMonthlyCalendar } from "@/features/kalender/services/aladhanCalendarService";
import KalenderClientPage from "@/features/kalender/components/KalenderClientPage";

export default async function KalenderPage() {
  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();

  const initialData = await getMonthlyCalendar(currentYear, currentMonth);

  if (!initialData || initialData.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Gagal memuat data kalender.
      </div>
    );
  }

  return (
    <KalenderClientPage
      initialData={initialData}
      initialMonth={currentMonth}
      initialYear={currentYear}
    />
  );
}
