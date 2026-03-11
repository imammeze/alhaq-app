import ArticleClientWrapper, {
  Article,
} from "@/features/article/components/ArticleClientWrapper";

async function getArticles(): Promise<Article[]> {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/articles", {
      next: { revalidate: 60 },
      headers: {
        Accept: "application/json",
        "x-api-key": process.env.API_KEY || "",
      },
    });

    if (!res.ok) {
      return [];
    }

    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("Gagal mengambil data artikel:", error);
    return [];
  }
}

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <div className="page-enter pb-24 bg-gray-50 min-h-screen">
      <ArticleClientWrapper articles={articles} />
    </div>
  );
}
