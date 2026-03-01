import { getHadithRange } from "@/features/hadith/services/hadithService";
import HadithListClient from "@/features/hadith/components/HadithListClient";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function HadithDetailPage({ params }: PageProps) {
  const { id } = await params;

  const data = await getHadithRange(id, 1, 25);

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-5">
        <p className="text-gray-500 mb-4">Gagal memuat data kitab hadits.</p>
        <Link
          href="/hadith"
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium">
          <ArrowLeftIcon className="w-4 h-4" /> Kembali ke Daftar
        </Link>
      </div>
    );
  }

  return <HadithListClient data={data} />;
}
