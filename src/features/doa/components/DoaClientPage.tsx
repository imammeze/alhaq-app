"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { DoaItem } from "@/shared/types/doa";
import { HeroCard, MenuItem, CollectionItem } from "./DoaUI";
import {
  SettingsIcon,
  SearchIcon,
  SunriseIcon,
  SparklesIcon,
  RepeatIcon,
  Mic2Icon,
  MoonIcon,
  PlaneIcon,
  CloudLightningIcon,
  BookOpenIcon,
  ShieldIcon,
  Building2Icon,
} from "lucide-react";

interface DoaClientPageProps {
  doas: DoaItem[];
}

const getGroupIcon = (groupName: string) => {
  const lower = groupName.toLowerCase();
  if (lower.includes("tidur") || lower.includes("malam")) return MoonIcon;
  if (lower.includes("pagi") || lower.includes("sore")) return SunriseIcon;
  if (lower.includes("sholat") || lower.includes("masjid"))
    return Building2Icon;
  if (lower.includes("puasa") || lower.includes("ramadhan")) return MoonIcon;
  if (lower.includes("perjalanan")) return PlaneIcon;
  if (lower.includes("alam") || lower.includes("hujan"))
    return CloudLightningIcon;
  if (lower.includes("lindung") || lower.includes("tolak")) return ShieldIcon;
  return BookOpenIcon;
};

export default function DoaClientPage({ doas }: DoaClientPageProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleBack = () => {
    if (query) {
      setQuery("");
    } else {
      router.back();
    }
  };

  const groupedDoas = useMemo(() => {
    const groups: Record<string, number> = {};
    doas.forEach((doa) => {
      if (!groups[doa.grup]) groups[doa.grup] = 0;
      groups[doa.grup]++;
    });
    return Object.entries(groups).map(([name, count]) => ({ name, count }));
  }, [doas]);

  const filteredDoas = query
    ? doas.filter(
        (doa) =>
          doa.nama.toLowerCase().includes(query.toLowerCase()) ||
          doa.idn.toLowerCase().includes(query.toLowerCase()) ||
          doa.grup.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="page-enter pb-24 bg-gray-50 min-h-screen">
      <PageHeader
        title="Doa & Dzikir"
        subtitle="Kumpulan doa harian & wirid pilihan"
        showBackButton
        onBack={handleBack}
        rightAction={
          <button className="p-2 rounded-full bg-white text-gray-400 hover:bg-gray-100 shadow-sm transition">
            <SettingsIcon className="w-5 h-5" />
          </button>
        }
        className="bg-transparent"
      />

      <div className="px-5 mt-6">
        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari doa, kategori, atau terjemahan..."
            className="w-full bg-white rounded-2xl py-4 pl-12 pr-4 text-sm font-medium text-gray-800 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 border border-gray-100"
          />
        </div>
      </div>

      <div className="px-5 mt-6 pb-10">
        {query ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
              HASIL PENCARIAN ({filteredDoas.length})
            </h3>
            <div className="space-y-4">
              {filteredDoas.length === 0 ? (
                <div className="text-center text-gray-400 py-10 text-sm">
                  Doa tidak ditemukan.
                </div>
              ) : (
                filteredDoas.map((doa) => (
                  <Link
                    href={`/doa/${doa.id}`}
                    key={doa.id}
                    className="block bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:border-emerald-500 transition-colors active:scale-[0.99]">
                    <div className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md inline-block mb-3">
                      {doa.grup}
                    </div>
                    <h4 className="font-bold text-gray-800 text-sm mb-4">
                      {doa.nama}
                    </h4>
                    <p
                      className="text-right text-2xl font-serif text-gray-800 leading-[2.5] mb-4"
                      dir="rtl">
                      {doa.ar}
                    </p>
                    <p className="text-xs text-emerald-700 italic mb-2 leading-relaxed">
                      "{doa.tr}"
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed border-l-2 border-gray-200 pl-3">
                      {doa.idn}
                    </p>
                  </Link>
                ))
              )}
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in duration-300">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
              KOLEKSI KATEGORI DOA
            </h3>
            <div className="space-y-3">
              {groupedDoas.map((group, idx) => (
                <CollectionItem
                  key={idx}
                  icon={getGroupIcon(group.name)}
                  title={group.name}
                  count={`${group.count} Doa`}
                  onClick={() => setQuery(group.name)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
