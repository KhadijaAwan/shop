"use client";
import React, { FC, useContext, useState, useEffect } from "react";
import { CldImage } from "next-cloudinary";
import { CiDeliveryTruck } from "react-icons/ci";
import {
  Box,
  Flex,
  Heading,
  Text,
  HStack,
  Button,
  Center,
  Badge,
  Icon,
  Stack,
} from "@chakra-ui/react";
import { GlobalContext } from "@/context";
import SimpleLoader from "@/components/simpleLoader";
import Toast_Notification from "@/components/toastNotification";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useRouter } from "next/navigation";
import HashLoader from "react-spinners/HashLoader";

interface Product {
  onSale: "Yes" | "No";
  discount: number;
  sizes: any;
  _id: string;
  name: string;
  delivery: string;
  description: string;
  imageUrl: string;
  price: number;
}

interface ProductDetailsProps {
  productData: Product;
}

const ProductDetails: FC<ProductDetailsProps> = ({ productData }) => {
  const router = useRouter();
  const [productLoad, setProductLoad] = useState(false);
  const { itemsLoader, setItemsLoader, handleAddCartProduct } = useContext(GlobalContext);

  useEffect(() => {
    setProductLoad(true);
    setTimeout(() => {
      setProductLoad(false);
    }, 1500);
  }, []);

  return (
    <Flex
      pt={36}
      alignItems="center"
      px={{ base: "5", lg: "16", xl: "20" }}
      pb={12}
      direction={{ base: "column", md: "row" }}
      width="100%"
    >
      {productLoad ? (
          <Center height="60vh" width="100%">
            <HashLoader
              color="#9a6abf"
              loading={productLoad}
              size={60}
              aria-label="Loading Spinner"
            />
          </Center>
        ) : (
          <>
      <Box
        width={{ base: "100%", lg: "80%" }}
        my={{ base: "15px", lg: "none" }}
      >
            <Box display={{ base: "block", md: "none" }}>
              <Center>
                <CldImage
                  width="300"
                  height="100"
                  style={{
                    maxWidth:"480px",
                    maxHeight: "400px",
                    borderRadius: "10px",
                  }}
                  src={productData.imageUrl}
                  sizes="100vw"
                  alt="Product Image"
                />
              </Center>
            </Box>

            <Box display={{base:"none", md: "block", lg: "none" }} mr={{ md: "20px" }}>
              <Center>
                <CldImage
                  width="380"
                  height="100"
                  style={{
                    maxWidth:"480px",
                    maxHeight: "400px",
                    borderRadius: "10px",
                  }}
                  src={productData.imageUrl}
                  sizes="100vw"
                  alt="Product Image"
                />
              </Center>
            </Box>

            <Box display={{ base: "none", lg: "block" }} mr={{ lg: "20px" }}>
              <CldImage
                width="450"
                height="100"
                style={{
                  maxWidth:"480px",
                  maxHeight: "400px",
                  borderRadius: "10px",
                }}
                src={productData.imageUrl}
                sizes="100vw"
                alt="Product Image"
              />
            </Box>
      </Box>

      <Box width="100%" bg="purple.50">
        <Box p={8}>
          {productData.onSale === "Yes" ? (
            <Badge
              color="gray.100"
              fontSize="13px"
              textTransform="capitalize"
              bg="black"
              fontWeight="600"
              py={1}
              px={3}
              borderRadius="10px"
              mb={5}
            >
              {productData.discount}% Discount
            </Badge>
          ) : null}

          <Heading as="h2" fontSize="4xl">
            {productData.name}
          </Heading>
          <Text my={4} fontSize="sm" color="gray.600">
            {productData.description}
          </Text>

          <HStack>
            <Text fontWeight="semibold" mr="10px">
              Available Sizes
            </Text>
            {productData.sizes.map((s: any) => (
              <Badge
                bg="gray.500"
                color="white"
                py={1}
                px={2.5}
                borderRadius="5px"
                key={s}
              >
                {s}
              </Badge>
            ))}
          </HStack>

          <HStack my={6}>
            <Badge
              color="purple.600"
              border="purple"
              ml="10px"
              py={2}
              px={4}
              fontSize="14.5px"
              textDecoration={productData.discount > 0 ? "line-through" : ""}
            >
              {productData.price} PKR
            </Badge>

            {productData.discount > 0 ? (
              <Text fontSize="13.5px" fontWeight="500">{`${
                productData.price -
                productData.price * (productData.discount / 100)
              } PKR`}</Text>
            ) : null}
          </HStack>

          <Button
            bg="purple.500"
            color="white"
            leftIcon={<HiOutlineShoppingBag />}
            fontSize="14px"
            _hover={{
              bg: "purple.600",
            }}
            onClick={() => {
              handleAddCartProduct(productData);
              setTimeout(() => {
                router.push("/pages/cart");
              }, 1500);
            }}
          >
            {itemsLoader && itemsLoader.load && productData._id === itemsLoader.id ? (
              <SimpleLoader
                text="Adding to cart"
                color="white"
                loading={true}
              />
            ) : (
              "Add to cart"
            )}
          </Button>

          <HStack mt={5} px={2}>
            <Icon as={CiDeliveryTruck} color="gray.600" fontSize="18px" />
            <Badge
              ml="-6px"
              color="gray.600"
              fontSize="12.5px"
              textTransform="capitalize"
              bg="purple.50"
              fontWeight="normal"
            >
              {productData.delivery === "Free"
                ? "Free Delivery"
                : "300 PKR Delivery Charges"}
            </Badge>
          </HStack>
        </Box>
      </Box>
      <Toast_Notification />
      </>
      )}
    </Flex>
  );
};

export default ProductDetails;
