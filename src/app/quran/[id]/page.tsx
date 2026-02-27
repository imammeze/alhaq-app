import { getSurahDetail } from "@/features/quran/services/quranService";
import { PlayCircleIcon, ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import AyatItem from "@/features/quran/components/AyatItem";
import SurahHeaderMenu from "@/features/quran/components/SurahHeaderMenu";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function SurahDetailPage({ params }: PageProps) {
  const { id } = await params;
  const surah = await getSurahDetail(id);

  if (!surah)
    return <div className="p-10 text-center">Surat tidak ditemukan</div>;

  return (
    <div className="pb-24 bg-gray-50 min-h-screen">
      <header className="px-5 pt-6 pb-4 bg-white sticky top-0 z-20 shadow-sm flex items-center justify-between">
        <Link
          href="/quran"
          className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeftIcon className="w-5 h-5" />
        </Link>

        <div className="text-center">
          <h1 className="font-bold text-gray-800">{surah.namaLatin}</h1>
          <p className="text-xs text-gray-400">
            {surah.arti} • {surah.jumlahAyat} Ayat
          </p>
        </div>

        <SurahHeaderMenu totalAyat={surah.jumlahAyat} />
      </header>

      <div className="px-5 mt-6">
        <div className="bg-[#064e3b] rounded-3xl p-6 text-white text-center relative overflow-hidden shadow-lg shadow-emerald-900/20">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-2 font-serif">{surah.nama}</h2>
            <h3 className="text-lg font-medium mb-4">{surah.namaLatin}</h3>
            <div className="w-full h-px bg-white/20 mb-4 mx-auto max-w-[200px]" />
            <p className="text-xs text-emerald-100 uppercase tracking-widest mb-6">
              {surah.tempatTurun} • {surah.jumlahAyat} Ayat
            </p>

            {surah.nomor !== 9 && (
              <div className="text-2xl font-serif mb-2 mt-2">
                بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
              </div>
            )}
          </div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
        </div>
      </div>

      <div className="px-5 mt-4 mb-2">
        <div className="bg-white p-3 rounded-xl border border-gray-100 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
              <PlayCircleIcon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-800">Putar Murottal</p>
              <p className="text-[10px] text-gray-400">Full Satu Surat</p>
            </div>
          </div>
          <audio
            src={surah.audioFull["05"]}
            controls
            className="h-8 w-32 opacity-80"
          />
        </div>
      </div>

      <div className="px-5 mt-4">
        {surah.ayat.map((ayat) => (
          <AyatItem
            key={ayat.nomorAyat}
            ayat={ayat}
            surahName={surah.namaLatin}
            surahId={surah.nomor}
          />
        ))}
      </div>

      <div className="px-5 mt-8 flex gap-3">
        {surah.suratSebelomnya && (
          <Link
            href={`/quran/${surah.suratSebelomnya.nomor}`}
            className="flex-1 bg-white p-3 rounded-xl border border-gray-200 text-center hover:border-emerald-500 transition">
            <p className="text-[10px] text-gray-400">Sebelumnya</p>
            <p className="text-xs font-bold text-gray-800">
              {surah.suratSebelomnya.namaLatin}
            </p>
          </Link>
        )}
        {surah.suratSelanjutnya && (
          <Link
            href={`/quran/${surah.suratSelanjutnya.nomor}`}
            className="flex-1 bg-white p-3 rounded-xl border border-gray-200 text-center hover:border-emerald-500 transition">
            <p className="text-[10px] text-gray-400">Selanjutnya</p>
            <p className="text-xs font-bold text-gray-800">
              {surah.suratSelanjutnya.namaLatin}
            </p>
          </Link>
        )}
      </div>
    </div>
  );
}
