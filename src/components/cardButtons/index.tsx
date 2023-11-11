"use client";
import { Button, ButtonGroup, Flex } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { usePathname, useRouter } from "next/navigation";
import { FC, useContext } from "react";
import { GlobalContext } from "@/context";
import { toast } from "react-toastify";
import { HiOutlineShoppingBag } from "react-icons/hi";
import SimpleLoader from "@/components/simpleLoader";
import Toast_Notification from "@/components/toastNotification";
import { deletingProduct } from "@/services/product/delete_product";

interface CardButtonsProps {
  items: any;
}

const CardButtons: FC<CardButtonsProps> = ({ items }) => {
  const router = useRouter();
  const pathUrl = usePathname();
  const isAdmin = pathUrl.includes("pages/adminPanel");
  const {
    setUpdatedProduct,
    itemsLoader,
    setItemsLoader,
    user,
    handleAddCartProduct,
  } = useContext(GlobalContext);

  async function handleProductDelete(content: string) {
    setItemsLoader({ load: true, id: content });
    const data = await deletingProduct(content);

    if (data.success) {
      setItemsLoader({ load: false, id: "" });
      toast.success(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      router.refresh();
    } else {
      setItemsLoader({ load: false, id: "" });
      toast.error(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }

  return (
    <>
      {isAdmin ? (
        // Admin View Buttons
        <ButtonGroup spacing="2" mx="auto" zIndex={4}>
          <Button
            bg="green"
            color="gray.200"
            _hover={{ bg: "green", color: "white" }}
            leftIcon={<EditIcon />}
            borderRadius="25px"
            fontSize="13px"
            onClick={() => {
              setUpdatedProduct(items);
              router.push("/pages/adminPanel/addProduct");
            }}
          >
            Update
          </Button>

          <Button
            bg="red"
            color="gray.200"
            _hover={{ bg: "red", color: "white" }}
            leftIcon={<DeleteIcon />}
            borderRadius="25px"
            fontSize="13px"
            onClick={() => {
              handleProductDelete(items._id);
            }}
          >
            {itemsLoader && itemsLoader.load && items._id === itemsLoader.id ? (
              <SimpleLoader text="Deleting" color="white" loading={true} />
            ) : (
              "Delete"
            )}
          </Button>
        </ButtonGroup>
      ) : (
        // Client View Buttons
        <Flex justifyItems="center" justifyContent="center" width="100%">
          <Button
            zIndex={4}
            bg="blue.600"
            color="gray.200"
            _hover={{ bg: "blue.600", color: "white" }}
            leftIcon={<HiOutlineShoppingBag />}
            borderRadius="25px"
            fontSize="14px"
            px="20px"
            onClick={() => {
              handleAddCartProduct(items);
            }}
          >
            {itemsLoader && itemsLoader.load && items._id === itemsLoader.id ? (
              <SimpleLoader
                text="Adding to cart"
                color="white"
                loading={true}
              />
            ) : (
              "Add to cart"
            )}
          </Button>
        </Flex>
      )}
      <Toast_Notification />
    </>
  );
};

export default CardButtons;
