import WorshipClientPage from "@/features/worship/components/WorshipClientPage";
import { getPrayerGuides } from "@/features/worship/services/guideService";

export default async function WorshipPage() {
  const { niat, bacaan } = await getPrayerGuides();

  return <WorshipClientPage niatList={niat} bacaanList={bacaan} />;
}
