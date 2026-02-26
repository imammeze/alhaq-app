import { QalbunResponse, GuideItemAPI } from "@/shared/types/api";

const API_KEY = process.env.QALBUN_API_KEY;
const BASE_URL = "https://api.qalbun.my.id/api-json";

export const getPrayerGuides = async (): Promise<{
  niat: GuideItemAPI[];
  bacaan: GuideItemAPI[];
}> => {
  try {
    const [niatRes, bacaanRes] = await Promise.all([
      fetch(`${BASE_URL}/niat-shalat?apikey=${API_KEY}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "force-cache",
      }),
      fetch(`${BASE_URL}/bacaan-shalat?apikey=${API_KEY}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "force-cache",
      }),
    ]);

    if (!niatRes.ok || !bacaanRes.ok) {
      console.error("Gagal fetch data panduan shalat");
      return { niat: [], bacaan: [] };
    }

    const niatData: QalbunResponse = await niatRes.json();
    const bacaanData: QalbunResponse = await bacaanRes.json();

    return {
      niat: niatData.results || [],
      bacaan: bacaanData.results || [],
    };
  } catch (error) {
    console.error("Error fetching guides:", error);
    return { niat: [], bacaan: [] };
  }
};
