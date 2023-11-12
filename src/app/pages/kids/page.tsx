import CardContent from "@/components/cardContent";
import { gettingCategory } from "../../../services/product/category_product/index";

export const getKidsProducts = async () => {
  const clientProducts = await gettingCategory("kids");
  return clientProducts;
};

let client: any;
const page = () => {
  getKidsProducts().then((products) => {
    client = products;
  });
  return <CardContent data={client && client.data} />;
};

export default page;
