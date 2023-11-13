import CardContent from "@/components/cardContent";
import { gettingCategory } from "../../../services/product/category_product/index";

export const dynamic = "force-dynamic";

export default async function Kids() {
  const clientProducts = await gettingCategory("kids");
  return <CardContent data={clientProducts && clientProducts.data} />;
}
