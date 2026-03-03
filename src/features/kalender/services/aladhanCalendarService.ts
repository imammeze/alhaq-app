export interface AladhanDay {
  date: {
    readable: string;
    gregorian: {
      date: string;
      day: string;
      month: { number: number; en: string };
      year: string;
      weekday: { en: string };
    };
    hijri: {
      date: string;
      day: string;
      month: { number: number; en: string; ar: string };
      year: string;
      holidays: string[];
    };
  };
  timings: Record<string, string>;
}

export const getMonthlyCalendar = async (
  year: number,
  month: number,
  city = "Purwokerto",
  country = "Indonesia"
): Promise<AladhanDay[]> => {
  try {
    const res = await fetch(
      `https://api.aladhan.com/v1/calendarByCity/${year}/${month}?city=${city}&country=${country}&method=11`,
      { cache: "force-cache" }
    );
    if (!res.ok) throw new Error("Gagal mengambil data kalender");
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("Error fetching calendar:", error);
    return [];
  }
};
