import CardContent from "@/components/cardContent";
import { gettingCategory } from "../../../services/product/category_product/index";

const getProducts = async () => {
  const response = await gettingCategory("men");
  const getData = response.data;
  return getData;
};

export default async function Men() {
  const clientProducts = await getProducts();
  return <CardContent data={clientProducts} />;
}
