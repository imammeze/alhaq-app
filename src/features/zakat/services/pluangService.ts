export const getGoldPrice = async (): Promise<number> => {
  try {
    const res = await fetch(
      "https://pluang.com/api/asset/gold/pricing?daysLimit=0",
      {
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) throw new Error("Gagal mengambil harga emas");

    const json = await res.json();
    return json.data.current.midPrice;
  } catch (error) {
    console.error("Error fetching gold price:", error);
    return 0;
  }
};
