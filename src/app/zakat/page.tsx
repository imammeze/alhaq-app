import { getGoldPrice } from "@/features/zakat/services/pluangService";
import ZakatClientPage from "@/features/zakat/components/ZakatClientPage";

export default async function ZakatPage() {
  const goldPrice = await getGoldPrice();

  return <ZakatClientPage goldPrice={goldPrice} />;
}
