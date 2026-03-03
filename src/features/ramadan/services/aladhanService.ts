export interface RamadanDay {
  date: {
    readable: string;
    gregorian: { date: string; month: { en: string } };
    hijri: { day: string; month: { en: string }; year: string };
  };
  timings: {
    Imsak: string;
    Fajr: string;
    Maghrib: string;
    Isha: string;
  };
}

export const getRamadanCalendar = async (
  city = "Purwokerto",
  country = "Indonesia",
  hijriYear = 1446
): Promise<RamadanDay[]> => {
  try {
    const res = await fetch(
      `https://api.aladhan.com/v1/hijriCalendarByCity/${hijriYear}/9?city=${city}&country=${country}&method=11`,
      { cache: "force-cache" }
    );
    if (!res.ok) throw new Error("Gagal mengambil data Ramadan");
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("Error fetching Ramadan calendar:", error);
    return [];
  }
};
