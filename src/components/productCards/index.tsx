import CardContent from "@/components/cardContent";
import { gettingProduct } from "../../services/product/get_product/index";

export default async function ProductCards() {
  const adminProducts = await gettingProduct();
  return <CardContent data={adminProducts && adminProducts.data} />;
}
