export const getNextPrayer = (timings: any) => {
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();

  const prayerMap = [
    { name: "Subuh", time: timings.Fajr },
    { name: "Dzuhur", time: timings.Dhuhr },
    { name: "Ashar", time: timings.Asr },
    { name: "Maghrib", time: timings.Maghrib },
    { name: "Isya", time: timings.Isha },
  ];

  for (let prayer of prayerMap) {
    const [hours, minutes] = prayer.time.split(":").map(Number);
    const prayerTimeMinutes = hours * 60 + minutes;

    if (prayerTimeMinutes > currentTime) {
      return {
        nextPrayerName: prayer.name,
        nextPrayerTime: prayer.time,
        targetDate: new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          hours,
          minutes
        ),
      };
    }
  }

  const [fajrHours, fajrMinutes] = timings.Fajr.split(":").map(Number);
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(fajrHours, fajrMinutes, 0, 0);

  return {
    nextPrayerName: "Subuh",
    nextPrayerTime: timings.Fajr,
    targetDate: tomorrow,
  };
};
