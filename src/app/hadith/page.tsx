import { getHadithBooks } from "@/features/hadith/services/hadithService";
import HadithClientPage from "@/features/hadith/components/HadithClientPage";

export default async function HadithPage() {
  const books = await getHadithBooks();

  return <HadithClientPage books={books} />;
}
