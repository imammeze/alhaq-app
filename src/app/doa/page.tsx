import { getAllDoa } from "@/features/doa/services/doaService";
import DoaClientPage from "@/features/doa/components/DoaClientPage";

export default async function DoaPage() {
  const doas = await getAllDoa();

  return <DoaClientPage doas={doas} />;
}
