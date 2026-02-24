"use client";

import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { SearchIcon } from "lucide-react";

export default function ArticlesPage() {
  const [activeTab, setActiveTab] = useState("Semua");

  const tabs = ["Semua", "Ramadhan", "Keluarga", "Muslimah"];

  return (
    <div className="page-enter pb-24 bg-gray-50 min-h-screen">
      <PageHeader
        title="Artikel Islami"
        subtitle="Wawasan untuk memperkuat iman"
        showBackButton
        rightAction={
          <button className="p-2 rounded-full bg-white text-gray-600 hover:bg-gray-100 shadow-sm border border-gray-100">
            <SearchIcon className="w-5 h-5" />
          </button>
        }
        className="bg-transparent"
      />

      {/* Tabs */}
      <div className="px-5 mt-2 flex gap-2 overflow-x-auto no-scrollbar pb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === tab
                ? "bg-[#064e3b] text-white shadow-lg shadow-emerald-900/20"
                : "bg-white border border-gray-100 text-gray-500"
            }`}>
            {tab}
          </button>
        ))}
      </div>

      {/* Featured */}
      <SectionLabel icon="✨" title="TERBARU" />

      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 px-5">
        <FeaturedCard
          badge="Ramadhan"
          title="Tips Produktif di Bulan Ramadhan: Menjaga Ibadah dan Aktivitas..."
          image="bg-orange-100"
        />
        <FeaturedCard
          badge="Ramadhan"
          title="Ramadhan dan Pembentukan Karakter Muslim..."
          image="bg-gray-200"
        />
      </div>

      {/* All Articles */}
      <SectionLabel icon="#" title="SEMUA ARTIKEL" />

      <div className="px-5 space-y-4 pb-10">
        <ArticleItem
          category="RAMADHAN"
          date="15 Mar 2024"
          title="Tips Produktif di Bulan Ramadhan: Menjaga Ibadah dan Aktivitas Tetap..."
          image="bg-orange-100"
        />
        <ArticleItem
          category="RAMADHAN"
          date="15 Apr 2024"
          title="Ramadhan dan Pembentukan Karakter Muslim: Sabar, Disiplin, dan Empati"
          image="bg-gray-200"
        />
        <ArticleItem
          category="RAMADHAN"
          date="10 Apr 2024"
          title="Tadabbur Surah Al-Qadr: Rahasia Kemuliaan Malam Seribu Bulan"
          image="bg-blue-100"
        />
      </div>
    </div>
  );
}

/* ============================= */
/* Reusable Components */
/* ============================= */

function SectionLabel({ icon, title }: { icon: string; title: string }) {
  return (
    <div className="px-5 mt-4 flex items-center gap-2 mb-4">
      <div className="w-4 h-4 text-emerald-600">{icon}</div>
      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
        {title}
      </h3>
    </div>
  );
}

interface FeaturedCardProps {
  badge: string;
  title: string;
  image: string;
}

function FeaturedCard({ badge, title, image }: FeaturedCardProps) {
  return (
    <div className="min-w-70 h-48 rounded-2xl bg-gray-800 relative overflow-hidden group cursor-pointer">
      <div
        className={`absolute inset-0 ${image} opacity-50 group-hover:scale-105 transition-transform duration-500`}
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />
      <div className="absolute bottom-0 left-0 p-5">
        <span className="px-2 py-1 bg-lime-400 text-lime-900 text-[10px] font-bold rounded mb-2 inline-block">
          {badge}
        </span>
        <h3 className="text-white font-bold text-sm leading-relaxed line-clamp-2">
          {title}
        </h3>
      </div>
    </div>
  );
}

interface ArticleItemProps {
  category: string;
  date: string;
  title: string;
  image: string;
}

function ArticleItem({ category, date, title, image }: ArticleItemProps) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4">
      <div className={`w-20 h-20 rounded-xl ${image} shrink-0`} />
      <div className="flex flex-col justify-between py-1 flex-1">
        <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400">
          <span className="text-emerald-700">{category}</span>
          <span>•</span>
          <span>{date}</span>
        </div>

        <h3 className="font-bold text-gray-800 text-sm leading-snug line-clamp-2">
          {title}
        </h3>

        <button className="text-[10px] font-bold text-gray-400 flex items-center gap-1 hover:text-emerald-600 transition-colors w-fit">
          Baca <span className="text-xs">›</span>
        </button>
      </div>
    </div>
  );
}
