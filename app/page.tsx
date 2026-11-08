import { ElectricalHomepage } from "@/components/electrical-homepage";
import { getSiteContent } from "@/lib/admin-data";

export default async function Page() {
  try {
    const content = await getSiteContent();
    return <ElectricalHomepage serviceItems={content.services} projectItems={content.projects} />;
  } catch {
    return <ElectricalHomepage />;
  }
}
