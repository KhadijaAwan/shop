import CardContent from "@/components/cardContent";
import { gettingCategory } from "../../../services/product/category_product/index";

export const getMenProducts = async () => {
  const clientProducts = await gettingCategory("men");
  return clientProducts;
};

const Men = async () => {
  const client = await getMenProducts();
  return <CardContent data={client && client.data} />;
};

export default Men;
