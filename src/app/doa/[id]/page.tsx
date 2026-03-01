import { getDoaById } from "@/features/doa/services/doaService";
import DoaDetailClient from "@/features/doa/components/DoaDetailClient";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

interface PageProps {
  params: { id: string } | Promise<{ id: string }>;
}

export default async function DoaDetailPage({ params }: PageProps) {
  const resolvedParams = await Promise.resolve(params);
  const id = resolvedParams.id;

  const doa = await getDoaById(id);

  if (!doa) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-5">
        <p className="text-gray-500 mb-4">Gagal memuat detail doa.</p>
        <Link
          href="/doa"
          className="flex items-center gap-2 px-4 py-2 bg-[#064e3b] text-white rounded-lg font-medium transition active:scale-95">
          <ArrowLeftIcon className="w-4 h-4" /> Kembali ke Daftar
        </Link>
      </div>
    );
  }

  return <DoaDetailClient doa={doa} />;
}
