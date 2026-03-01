import { DoaItem } from "@/shared/types/doa";

export const getAllDoa = async (): Promise<DoaItem[]> => {
  try {
    const res = await fetch("https://equran.id/api/doa", {
      cache: "force-cache",
    });
    if (!res.ok) throw new Error("Gagal mengambil data doa");

    const json = await res.json();
    return Array.isArray(json) ? json : json.data || [];
  } catch (error) {
    console.error("Error fetching Doa:", error);
    return [];
  }
};

export const getDoaById = async (id: string): Promise<DoaItem | null> => {
  try {
    const res = await fetch(`https://equran.id/api/doa/${id}`, {
      cache: "force-cache",
    });
    if (!res.ok) throw new Error("Gagal mengambil detail doa");

    const json = await res.json();

    return json.data ? json.data : json;
  } catch (error) {
    console.error(`Error fetching Doa ${id}:`, error);
    return null;
  }
};
