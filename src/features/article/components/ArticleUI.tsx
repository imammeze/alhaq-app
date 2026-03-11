import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";

export function SectionLabel({ icon, title }: { icon: string; title: string }) {
  return (
    <div className="px-5 mt-4 flex items-center gap-2 mb-4">
      <div className="w-4 h-4 text-rose-600 flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
        {title}
      </h3>
    </div>
  );
}

interface FeaturedCardProps {
  slug: string;
  category: string;
  title: string;
  imageUrl: string;
}

export function FeaturedCard({
  slug,
  category,
  title,
  imageUrl,
}: FeaturedCardProps) {
  return (
    <Link
      href={`/articles/${slug}`}
      className="min-w-[280px] h-48 rounded-2xl relative overflow-hidden group cursor-pointer shrink-0 shadow-sm block">
      <img
        src={imageUrl}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

      <div className="absolute bottom-0 left-0 p-5">
        <span className="px-2 py-1 bg-lime-400 text-lime-900 text-[10px] font-bold rounded mb-2 inline-block">
          {category}
        </span>
        <h3 className="text-white font-bold text-sm leading-relaxed line-clamp-2">
          {title}
        </h3>
      </div>
    </Link>
  );
}

interface ArticleItemProps {
  slug: string;
  category: string;
  date: string;
  title: string;
  imageUrl: string;
}

export function ArticleItem({
  slug,
  category,
  date,
  title,
  imageUrl,
}: ArticleItemProps) {
  return (
    <Link
      href={`/articles/${slug}`}
      className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4 group cursor-pointer hover:shadow-md transition-all">
      <img
        src={imageUrl}
        alt={title}
        className="w-20 h-20 rounded-xl object-cover shrink-0"
      />

      <div className="flex flex-col justify-between py-1 flex-1">
        <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400">
          <span className="text-rose-700 uppercase">{category}</span>
          <span>•</span>
          <span>{date}</span>
        </div>

        <h3 className="font-bold text-gray-800 text-sm leading-snug line-clamp-2 group-hover:text-rose-700 transition-colors">
          {title}
        </h3>

        <div className="text-[10px] font-bold text-gray-400 flex items-center gap-1 group-hover:text-rose-600 transition-colors w-fit mt-1">
          Baca <ChevronRightIcon className="w-3 h-3" />
        </div>
      </div>
    </Link>
  );
}
