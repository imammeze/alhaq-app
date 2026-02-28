import {
  HadithBook,
  HadithBooksResponse,
  HadithRangeResponse,
} from "@/shared/types/hadith";

const BASE_URL = "https://api.hadith.gading.dev";

export const getHadithBooks = async (): Promise<HadithBook[]> => {
  try {
    const res = await fetch(`${BASE_URL}/books`, { cache: "force-cache" });
    if (!res.ok) throw new Error("Gagal mengambil daftar kitab hadits");

    const json: HadithBooksResponse = await res.json();
    return json.data;
  } catch (error) {
    console.error("Error fetching hadith books:", error);
    return [];
  }
};

export const getHadithRange = async (
  bookId: string,
  start: number = 1,
  end: number = 50
): Promise<HadithRangeResponse["data"] | null> => {
  try {
    const res = await fetch(
      `${BASE_URL}/books/${bookId}?range=${start}-${end}`,
      {
        cache: "force-cache",
      }
    );

    if (!res.ok) throw new Error("Gagal mengambil detail hadits");

    const json: HadithRangeResponse = await res.json();
    return json.data;
  } catch (error) {
    console.error(`Error fetching hadith ${bookId}:`, error);
    return null;
  }
};
