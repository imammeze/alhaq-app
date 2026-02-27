import { getAllSurah } from "@/features/quran/services/quranService";
import QuranClientPage from "@/features/quran/components/QuranClientPage";

export default async function QuranPage() {
  const surahs = await getAllSurah();

  return <QuranClientPage surahs={surahs} />;
}
