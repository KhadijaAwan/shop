import CardContent from "@/components/cardContent";
import { gettingCategory } from "../../../services/product/category_product/index";

export const getKidsProducts = async () => {
  const clientProducts = await gettingCategory("kids");
  return clientProducts;
};

const Kids = async () => {
  const client = await getKidsProducts();
  return <CardContent data={client && client.data} />;
};

export default Kids;
