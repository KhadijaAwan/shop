"use client";
import { productSizes, addProductInfo } from "@/theory";
import {
  Input,
  Box,
  FormControl,
  FormLabel,
  HStack,
  Button,
  Select,
  Center,
  Flex,
  Heading,
  Textarea,
} from "@chakra-ui/react";
import { useState, useContext, useEffect } from "react";
import { CldUploadButton, CldImage } from "next-cloudinary";
import { addingProduct } from "@/services/product/add_product";
import SimpleLoader from "@/components/simpleLoader";
import { GlobalContext } from "@/context";
import { toast } from "react-toastify";
import Toast_Notification from "@/components/toastNotification";
import { useRouter } from "next/navigation";
import { updatingProduct } from "@/services/product/update_product";

const initialProductData: AddData = {
  name: "",
  price: 0,
  description: "",
  category: "men",
  sizes: [],
  delivery: "",
  onSale: "no",
  imageUrl: "",
  discount: 0,
};

interface AddData {
  name: string;
  price: number;
  description: string;
  category: string;
  sizes: string[];
  delivery: string;
  onSale: "yes" | "no";
  imageUrl: string;
  discount: number;
}

type UploadGet = {
  info: {
    public_id: string;
  };
  event: "success";
};

export default function AddProduct() {
  const [image, setImage] = useState("");
  const [update, setUpdate] = useState(false);
  const router = useRouter();
  const [productData, setProductData] = useState<AddData>(initialProductData);
  const { itemsLoader, setItemsLoader, updatedProduct, setUpdatedProduct } =
    useContext(GlobalContext);

  console.log(updatedProduct);

  useEffect(() => {
    if (updatedProduct !== null) {
      setUpdate(true);
      setProductData(updatedProduct);
    }
  }, [updatedProduct]);

  console.log(update);

  // Function to handle Product Image
  const handleImageUpload = (result: UploadGet) => {
    setImage(result.info.public_id);
    setProductData({
      ...productData,
      imageUrl: result.info.public_id,
    });
  };

  // Function to handle Different Categiries of Product
  function handleProductSize(getItem: any) {
    let sizesCopy = [...productData.sizes];
    const index = sizesCopy.findIndex((item) => item === getItem);

    index === -1 ? sizesCopy.push(getItem) : sizesCopy.splice(index, 1);

    setProductData({
      ...productData,
      sizes: sizesCopy,
    });
  }

  // Function to add new product
  async function handle_AddProduct() {
    setItemsLoader({ load: true, id: "" });

    const data = update
      ? await updatingProduct(productData)
      : await addingProduct(productData);

    console.log(data);

    if (data.success) {
      toast.success(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });

      setItemsLoader({ load: false, id: "" });
      setUpdate(false);
      setProductData(initialProductData);
      setUpdatedProduct(null);
      setTimeout(() => {
        router.push("/pages/adminPanel/manageProducts");
      }, 1000);
    } else {
      setItemsLoader({ load: false, id: "" });
      toast.error(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });

      setProductData(initialProductData);
    }
  }

  return (
    <Box pt={32} pb={10} px={{ base: "10", lg: "24" }}>
      <Heading
        color="gray.900"
        fontSize={{ base: "3xl", lg: "4xl" }}
        mb={16}
        textAlign="center"
      >
        Add New Product
      </Heading>
      <FormControl id="product-image">
        <FormLabel>Product Image</FormLabel>
        <Flex
          p={3}
          direction={{ base: "column", lg: "row" }}
          alignItems="center"
          justifyContent={{ base: "center", lg: "start" }}
        >
          <Box
            py={2}
            px={4}
            mr={{ base: "0", lg: "40px" }}
            mb={{ base: "30px", lg: "0" }}
            bg="purple.500"
            color="white"
            borderRadius="30px"
            _hover={{ bg: "purple", color: "white" }}
          >
            <CldUploadButton
              uploadPreset="shopping"
              onUpload={handleImageUpload as any}
            />
          </Box>

          {image && (
            <CldImage
              width="200"
              height="200"
              src={image}
              sizes="100vw"
              alt="Product Image"
            />
          )}
        </Flex>
      </FormControl>

      <Box py={2}>
        <FormLabel my={2}>Available Sizes</FormLabel>
        <HStack>
          {productSizes.map((p) => (
            <Button
              key={p.id}
              bg={productData.sizes.includes(p.label) ? "black" : "gray.100"}
              color={productData.sizes.includes(p.label) ? "white" : "black"}
              size="sm"
              _hover={{
                bg: productData.sizes.includes(p.label) ? "black" : "gray.100",
                color: productData.sizes.includes(p.label) ? "white" : "black",
              }}
              onClick={() => handleProductSize(p.label)}
            >
              {p.label}
            </Button>
          ))}
        </HStack>

        {addProductInfo.map((a) => (
          <FormControl key={a.id} isRequired mt={6}>
            <FormLabel>{a.label}</FormLabel>
            {a.componentType === "input" ? (
              <Input
                type={a.type}
                placeholder={a.placeholder}
                value={productData[a.id as keyof AddData]}
                onChange={(event) => {
                  setProductData({
                    ...productData,
                    [a.id]: event.target.value,
                  });
                }}
              />
            ) : a.componentType === "select" ? (
              <Select
                placeholder="Select option"
                value={productData[a.id as keyof AddData]}
                onChange={(event) => {
                  setProductData({
                    ...productData,
                    [a.id]: event.target.value,
                  });
                }}
              >
                {a.options?.map((option) => (
                  <option key={option.id} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </Select>
            ) : (
              <Textarea
                placeholder={a.placeholder}
                value={productData[a.id as keyof AddData]}
                onChange={(event) => {
                  setProductData({
                    ...productData,
                    [a.id]: event.target.value,
                  });
                }}
              />
            )}
          </FormControl>
        ))}
      </Box>

      <Center>
        <Button
          fontWeight="semibold"
          mt={7}
          py={2}
          justifySelf="center"
          width={{ base: "250px", lg: "480" }}
          fontSize="16px"
          size="lg"
          borderRadius="30px"
          bg={"purple.500"}
          color={"white"}
          onClick={handle_AddProduct}
          _hover={{
            bg: "purple.600",
          }}
          _disabled={{
            opacity: 0.3,
            cursor: "not-allowed",
          }}
        >
          {itemsLoader && itemsLoader.load ? (
            <SimpleLoader
              text={update ? "Updating Product" : "Adding Product"}
              color="white"
              loading={true}
            />
          ) : update ? (
            "Update Product"
          ) : (
            "Add Product"
          )}
        </Button>
      </Center>
      <Toast_Notification />
    </Box>
  );
}
