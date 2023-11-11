"use client";
import { createContext, useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { usePathname, useRouter } from "next/navigation";
import { addingCartProduct } from "@/services/cart/add_cartProduct";

export const GlobalContext = createContext<any>(null);

export const initialCheckoutData = {
  shippingAddress: {},
  paymentMethod: "",
  totalPrice: 0,
  isPaid: false,
  paidAt: new Date(),
  isProcessing: true,
};

interface User {
  _id: string;
  role: string;
}

const authenticatedRoutes = [
  "/pages/address",
  "/pages/cart",
  "/pages/orders",
  "/pages/profile",
  "/pages/adminPanel",
  "/pages/adminPanel/addProduct",
  "/pages/adminPanel/createAdmin",
  "/pages/adminPanel/manageProducts",
];

const adminRoutes = [
  "/pages/adminPanel",
  "/pages/adminPanel/addProduct",
  "/pages/adminPanel/createAdmin",
  "/pages/adminPanel/manageProducts",
];

export default function GlobalState({ children }: any) {
  const [authUser, setAuthUser] = useState<boolean | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [itemsLoader, setItemsLoader] = useState({ load: false, id: "" });
  const [updatedProduct, setUpdatedProduct] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);
  const [userAddress, setUserAddress] = useState([]);
  const [selectAddress, setSelectAddress] = useState(null);
  const [updatedAddress, setUpdatedAddress] = useState(null);
  const [checkoutData, setCheckoutData] = useState(initialCheckoutData);
  const [userOrders, setUserOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [adminOrderView, setAdminOrderView] = useState([]);
  const [individualOrder, setIndividualOrder] = useState(null);
  const [addressData, setAddressData] = useState({
    clientName: "",
    country: "",
    city: "",
    address: "",
    postalCode: "",
  });

  const router = useRouter();
  const pathUrl = usePathname();

  useEffect(() => {
    console.log(Cookies.get("token"));

    if (Cookies.get("token") !== undefined) {
      setAuthUser(true);
      const userDetails = JSON.parse(localStorage.getItem("user") || "{}");
      const cartDetails = JSON.parse(
        localStorage.getItem("cart_Products") || "[]"
      );
      const getData = JSON.parse(localStorage.getItem("checkout_Data") || "{}");
      const selectedAddress = JSON.parse(
        localStorage.getItem("deliveryAddress") || "{}"
      );

      setUser(userDetails);
      setCartProducts(cartDetails);
      setSelectAddress(selectedAddress);
      setCheckoutData(getData);

      console.log(getData);
      console.log(checkoutData);
      console.log(selectAddress);
    } else {
      setAuthUser(false);
      setUser(null);
    }
  }, [Cookies]);

  // Function to add products to the cart as different components use it
  async function handleAddCartProduct(content: any) {
    setItemsLoader({ load: true, id: content._id });

    const data = await addingCartProduct({
      userId: user?._id,
      productId: content._id,
    });
    console.log(data);

    if (data.success) {
      setItemsLoader({ load: false, id: "" });
      toast.success(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      setItemsLoader({ load: false, id: "" });
      toast.error(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }

  // Routes Protection
  useEffect(() => {
    if (user === null && !authenticatedRoutes.includes(pathUrl)) {
      router.push(pathUrl);
    } else if (
      user === null ||
      (Object.keys(user).length === 0 && authenticatedRoutes.includes(pathUrl))
    ) {
      router.push("/pages/login");
    } else if (
      user &&
      Object.keys(user).length > 0 &&
      user?.role !== "admin" &&
      adminRoutes.includes(pathUrl)
    ) {
      router.push("/pages/simpleUser");
    }
  }, [user, pathUrl, authenticatedRoutes, adminRoutes]);

  return (
    <GlobalContext.Provider
      value={{
        authUser,
        setAuthUser,
        user,
        setUser,
        itemsLoader,
        setItemsLoader,
        updatedProduct,
        setUpdatedProduct,
        cartProducts,
        setCartProducts,
        userAddress,
        setUserAddress,
        addressData,
        setAddressData,
        updatedAddress,
        setUpdatedAddress,
        selectAddress,
        setSelectAddress,
        checkoutData,
        setCheckoutData,
        userOrders,
        setUserOrders,
        individualOrder,
        setIndividualOrder,
        allOrders,
        setAllOrders,
        adminOrderView,
        setAdminOrderView,
        handleAddCartProduct,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
