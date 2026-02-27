import Link from "next/link";
import { ArrowLeftIcon, MoreVerticalIcon } from "lucide-react";
import { getJuzDetail } from "@/features/quran/services/juzService";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function JuzDetailPage({ params }: PageProps) {
  const { id } = await params;
  const ayahs = await getJuzDetail(id);

  if (!ayahs || ayahs.length === 0) {
    return <div className="p-10 text-center">Data Juz tidak ditemukan</div>;
  }

  const surahsInJuz = Array.from(
    new Set(ayahs.map((a) => a.surah.englishName))
  );
  const titleSurahs =
    surahsInJuz.length > 2
      ? `${surahsInJuz[0]} - ${surahsInJuz[surahsInJuz.length - 1]}`
      : surahsInJuz.join(" & ");

  return (
    <div className="pb-24 bg-gray-50 min-h-screen">
      <header className="px-5 pt-6 pb-4 bg-white sticky top-0 z-20 shadow-sm flex items-center justify-between">
        <Link
          href="/quran"
          className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full">
          <ArrowLeftIcon className="w-5 h-5" />
        </Link>
        <div className="text-center">
          <h1 className="font-bold text-gray-800">Juz {id}</h1>
          <p className="text-[10px] text-gray-400 max-w-[200px] truncate">
            {titleSurahs}
          </p>
        </div>
        <button className="p-2 -mr-2 text-gray-600 hover:bg-gray-100 rounded-full">
          <MoreVerticalIcon className="w-5 h-5" />
        </button>
      </header>

      <div className="px-5 mt-4 space-y-4">
        {ayahs.map((ayat) => {
          const isFirstAyah = ayat.numberInSurah === 1;
          const showBismillah =
            isFirstAyah && ayat.surah.number !== 9 && ayat.surah.number !== 1;
          let cleanArabicText = ayat.text;
          if (
            showBismillah &&
            cleanArabicText.startsWith(
              "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ "
            )
          ) {
            cleanArabicText = cleanArabicText.replace(
              "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ ",
              ""
            );
          }

          return (
            <div key={ayat.number}>
              {isFirstAyah && (
                <div className="mb-6 mt-10 animate-in fade-in slide-in-from-bottom-2">
                  <div className="bg-[#064e3b] rounded-2xl p-4 text-white text-center relative overflow-hidden shadow-md">
                    <h2 className="text-xl font-bold font-serif relative z-10">
                      {ayat.surah.name}
                    </h2>
                    <p className="text-xs text-emerald-100 relative z-10">
                      {ayat.surah.englishName}
                    </p>
                    <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                  </div>
                  {showBismillah && (
                    <div className="text-center text-2xl font-serif mt-6 mb-2 text-gray-800">
                      بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                    </div>
                  )}
                </div>
              )}

              <div
                className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm"
                id={`juz-${id}-ayat-${ayat.number}`}>
                <div className="flex items-center justify-between mb-4 bg-gray-50/50 p-2 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold border border-emerald-200">
                      {ayat.numberInSurah}
                    </div>
                    <span className="text-xs font-bold text-gray-400">
                      {ayat.surah.englishName}
                    </span>
                  </div>
                </div>

                <p
                  className="text-right text-3xl font-serif text-gray-800 leading-[2.5] mb-6"
                  dir="rtl">
                  {cleanArabicText}
                </p>

                <div className="space-y-2">
                  <p className="text-sm text-gray-600 leading-relaxed border-l-2 border-emerald-500 pl-3">
                    {ayat.translation}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="px-5 mt-8 flex gap-3">
        {parseInt(id) > 1 && (
          <Link
            href={`/quran/juz/${parseInt(id) - 1}`}
            className="flex-1 bg-white p-3 rounded-xl border border-gray-200 text-center hover:border-emerald-500 transition">
            <p className="text-[10px] text-gray-400">Juz Sebelumnya</p>
            <p className="text-xs font-bold text-gray-800">
              Juz {parseInt(id) - 1}
            </p>
          </Link>
        )}
        {parseInt(id) < 30 && (
          <Link
            href={`/quran/juz/${parseInt(id) + 1}`}
            className="flex-1 bg-white p-3 rounded-xl border border-gray-200 text-center hover:border-emerald-500 transition">
            <p className="text-[10px] text-gray-400">Juz Selanjutnya</p>
            <p className="text-xs font-bold text-gray-800">
              Juz {parseInt(id) + 1}
            </p>
          </Link>
        )}
      </div>
    </div>
  );
}
