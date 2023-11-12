import CardContent from "@/components/cardContent";
import { gettingCategory } from "../../../services/product/category_product/index";

export const getWomenProducts = async () => {
  const clientProducts = await gettingCategory("women");
  return clientProducts;
};

const Women = async () => {
  const client = await getWomenProducts();
  return <CardContent data={client && client.data} />;
};

export default Women;

