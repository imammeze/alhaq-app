"use client";

import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { SearchIcon } from "lucide-react";
import { SectionLabel, FeaturedCard, ArticleItem } from "./ArticleUI";

export type Article = {
  id: string;
  title: string;
  slug: string;
  category: string;
  thumbnail: string;
  content: string;
  created_at: string;
};

export default function ArticleClientWrapper({
  articles,
}: {
  articles: Article[];
}) {
  const [activeTab, setActiveTab] = useState("Semua");

  const uniqueCategories = [
    "Semua",
    ...Array.from(new Set(articles.map((a) => a.category))),
  ];

  const filteredArticles =
    activeTab === "Semua"
      ? articles
      : articles.filter((a) => a.category === activeTab);

  const featuredArticles = articles.slice(0, 3);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Ags",
      "Sep",
      "Okt",
      "Nov",
      "Des",
    ];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  return (
    <>
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

      <div className="px-5 mt-2 flex gap-2 overflow-x-auto no-scrollbar pb-4">
        {uniqueCategories.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === tab
                ? "bg-[#4c0519] text-white shadow-lg shadow-rose-900/20"
                : "bg-white border border-gray-100 text-gray-500 hover:bg-gray-50"
            }`}>
            {tab}
          </button>
        ))}
      </div>

      <SectionLabel icon="✨" title="TERBARU" />
      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 px-5">
        {featuredArticles.map((article) => (
          <FeaturedCard
            key={`featured-${article.id}`}
            slug={article.slug}
            category={article.category}
            title={article.title}
            imageUrl={article.thumbnail}
          />
        ))}
      </div>

      <SectionLabel
        icon="#"
        title={
          activeTab === "Semua"
            ? "SEMUA ARTIKEL"
            : `ARTIKEL ${activeTab.toUpperCase()}`
        }
      />
      <div className="px-5 space-y-4 pb-10">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
            <ArticleItem
              key={article.id}
              category={article.category}
              slug={article.slug}
              date={formatDate(article.created_at)}
              title={article.title}
              imageUrl={article.thumbnail}
            />
          ))
        ) : (
          <p className="text-center text-xs text-gray-400 py-10">
            Belum ada artikel di kategori ini.
          </p>
        )}
      </div>
    </>
  );
}
