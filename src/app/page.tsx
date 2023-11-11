import ProductCards from "@/components/productCards";
import { GlobalContext } from "@/context";
import { useContext } from "react";

export default function Home() {
  // const { authUser } = useContext(GlobalContext);
  // console.log(authUser);

  return <ProductCards />;
}
