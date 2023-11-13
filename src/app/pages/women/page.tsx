import CardContent from "@/components/cardContent";
import { gettingCategory } from "../../../services/product/category_product/index";

const getProducts = async () => {
  const response = await gettingCategory("women");
  const getData = response.data;
  return getData;
};

export default async function Women() {
  const clientProducts = await getProducts();
  return <CardContent data={clientProducts} />;
}
