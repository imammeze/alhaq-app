import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeftIcon, CalendarIcon, TagIcon } from "lucide-react";

type ArticleDetail = {
  id: string;
  title: string;
  slug: string;
  category: string;
  thumbnail: string;
  content: string;
  created_at: string;
};

async function getArticle(slug: string): Promise<ArticleDetail | null> {
  try {
    const res = await fetch(`http://127.0.0.1:8000/api/articles/${slug}`, {
      next: { revalidate: 60 },
      headers: {
        Accept: "application/json",
        "x-api-key": process.env.API_KEY || "",
      },
    });

    if (!res.ok) {
      if (res.status === 404) return null;
      return null;
    }

    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("Gagal mengambil detail artikel:", error);
    return null;
  }
}

function formatDate(dateString: string) {
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
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white pb-24">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-5 py-4 flex items-center gap-4">
        <Link
          href="/articles"
          className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-full text-gray-600 hover:bg-gray-100 transition-colors">
          <ChevronLeftIcon className="w-5 h-5" />
        </Link>
        <h1 className="text-sm font-bold text-gray-800 line-clamp-1 flex-1">
          {article.title}
        </h1>
      </header>

      <div className="w-full h-64 sm:h-80 relative bg-gray-100">
        <img
          src={article.thumbnail}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
      </div>

      <main className="px-5 pt-6 sm:px-8 max-w-2xl mx-auto">
        <div className="flex items-center gap-4 text-xs font-bold mb-4">
          <div className="flex items-center gap-1.5 text-lime-600 bg-lime-50 px-2.5 py-1 rounded-md">
            <TagIcon className="w-3.5 h-3.5" />
            <span className="uppercase">{article.category}</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-400">
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>{formatDate(article.created_at)}</span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight mb-8">
          {article.title}
        </h1>

        <div
          className="prose prose-sm sm:prose-base prose-gray prose-p:leading-relaxed prose-headings:font-bold prose-a:text-[#881337] max-w-none text-gray-700 space-y-4"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </main>
    </div>
  );
}
