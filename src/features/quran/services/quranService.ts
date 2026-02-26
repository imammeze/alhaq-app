import { Surah, SurahDetail } from "@/shared/types/quran";

const BASE_URL = "https://equran.id/api/v2";

export const getAllSurah = async (): Promise<Surah[]> => {
  try {
    const res = await fetch(`${BASE_URL}/surat`, { cache: "force-cache" });
    if (!res.ok) throw new Error("Gagal fetch surat");
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getSurahDetail = async (
  id: string
): Promise<SurahDetail | null> => {
  try {
    const res = await fetch(`${BASE_URL}/surat/${id}`, {
      cache: "force-cache",
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
