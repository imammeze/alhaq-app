export interface JuzAyah {
  number: number;
  text: string;
  translation: string;
  surah: {
    number: number;
    name: string;
    englishName: string;
  };
  numberInSurah: number;
}

export const getJuzDetail = async (juzId: string): Promise<JuzAyah[]> => {
  try {
    const [arabRes, indoRes] = await Promise.all([
      fetch(`https://api.alquran.cloud/v1/juz/${juzId}/quran-uthmani`, {
        cache: "force-cache",
      }),
      fetch(`https://api.alquran.cloud/v1/juz/${juzId}/id.indonesian`, {
        cache: "force-cache",
      }),
    ]);

    if (!arabRes.ok || !indoRes.ok) throw new Error("Gagal mengambil data juz");

    const arabData = await arabRes.json();
    const indoData = await indoRes.json();

    const ayahs: JuzAyah[] = arabData.data.ayahs.map(
      (ayah: any, index: number) => ({
        number: ayah.number,
        text: ayah.text,
        translation: indoData.data.ayahs[index].text,
        surah: ayah.surah,
        numberInSurah: ayah.numberInSurah,
      })
    );

    return ayahs;
  } catch (error) {
    console.error(error);
    return [];
  }
};
