"use client";

import { PageHeader } from "@/components/PageHeader";
import {
  SettingsIcon,
  SearchIcon,
  SunriseIcon,
  SparklesIcon,
  RepeatIcon,
  Mic2Icon,
  LayoutGridIcon,
  Building2Icon,
  MoonIcon,
  PlaneIcon,
  CloudLightningIcon,
  BookOpenIcon,
  ShieldIcon,
  GlobeIcon,
  ChevronRightIcon,
} from "lucide-react";

export default function DoaPage() {
  return (
    <div className="page-enter pb-24 bg-gray-50 min-h-screen">
      <PageHeader
        title="Doa & Dzikir"
        subtitle="Kumpulan doa harian & wirid pilihan"
        showBackButton
        rightAction={
          <button className="p-2 rounded-full bg-white text-gray-400 hover:bg-gray-100 shadow-sm">
            <SettingsIcon className="w-5 h-5" />
          </button>
        }
        className="bg-transparent"
      />

      {/* Hero Cards */}
      <div className="px-5 mt-2 grid grid-cols-2 gap-3">
        <HeroCard
          bg="bg-emerald-900"
          icon={<SunriseIcon className="w-4 h-4 text-emerald-300" />}
          title="Al-Ma'tsurat"
          subtitle="Pagi & Petang"
        />
        <HeroCard
          bg="bg-amber-700"
          icon={<SparklesIcon className="w-4 h-4 text-orange-200" />}
          title="Asmaul Husna"
          subtitle="99 Nama Allah"
        />
      </div>

      {/* Menu List */}
      <div className="px-5 mt-4 space-y-3">
        <MenuItem
          icon={RepeatIcon}
          title="Wirid & Tahlil"
          subtitle="Setelah Sholat & Tahlilan"
          color="bg-blue-50 text-blue-600"
        />
        <MenuItem
          icon={Mic2Icon}
          title="Bilal & Tarawih"
          subtitle="Panduan Lengkap"
          color="bg-emerald-50 text-emerald-600"
        />
      </div>

      {/* Search */}
      <div className="px-5 mt-6">
        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Cari kategori, judul, atau arti doa..."
            className="w-full bg-white rounded-2xl py-4 pl-12 pr-4 text-sm font-medium text-gray-800 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
          />
        </div>
      </div>

      {/* Collection */}
      <div className="px-5 mt-6 pb-10">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
          KOLEKSI DOA
        </h3>

        <div className="space-y-3">
          <CollectionItem
            icon={LayoutGridIcon}
            title="Aktivitas Harian"
            count="15 doa"
          />
          <CollectionItem
            icon={Building2Icon}
            title="Seputar Sholat & Masjid"
            count="6 doa"
          />
          <CollectionItem
            icon={MoonIcon}
            title="Puasa & Ramadhan"
            count="4 doa"
          />
          <CollectionItem icon={PlaneIcon} title="Perjalanan" count="5 doa" />
          <CollectionItem
            icon={CloudLightningIcon}
            title="Fenomena Alam"
            count="6 doa"
          />
          <CollectionItem
            icon={BookOpenIcon}
            title="Doa-Doa Al-Qur'an & Pilihan"
            count="9 doa"
          />
          <CollectionItem
            icon={ShieldIcon}
            title="Perlindungan & Ketenangan"
            count="19 doa"
          />
          <CollectionItem
            icon={GlobeIcon}
            title="Doa-Doa Lengkap (API)"
            count="23 doa"
          />
        </div>
      </div>
    </div>
  );
}

interface HeroCardProps {
  bg: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

function HeroCard({ bg, icon, title, subtitle }: HeroCardProps) {
  return (
    <div
      className={`${bg} rounded-2xl p-4 text-white h-32 flex flex-col justify-between`}>
      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-sm">{title}</h3>
        <p className="text-[10px] opacity-80">{subtitle}</p>
      </div>
    </div>
  );
}

interface MenuItemProps {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  color: string;
}

function MenuItem({ icon: Icon, title, subtitle, color }: MenuItemProps) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div
          className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-bold text-gray-800 text-sm">{title}</h4>
          <p className="text-xs text-gray-400">{subtitle}</p>
        </div>
      </div>
      <ChevronRightIcon className="w-5 h-5 text-gray-300" />
    </div>
  );
}

interface CollectionItemProps {
  icon: React.ElementType;
  title: string;
  count: string;
}

function CollectionItem({ icon: Icon, title, count }: CollectionItemProps) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-gray-50 text-gray-500 flex items-center justify-center">
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-bold text-gray-800 text-sm">{title}</h4>
          <p className="text-xs text-gray-400">{count}</p>
        </div>
      </div>
      <ChevronRightIcon className="w-5 h-5 text-gray-300" />
    </div>
  );
}
