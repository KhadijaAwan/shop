"use client";
import {
  Box,
  Flex,
  Text,
  IconButton,
  HStack,
  Stack,
  Button,
  Badge,
  SimpleGrid,
  Center,
} from "@chakra-ui/react";
import { CldImage } from "next-cloudinary";
import { productDetailsTitles } from "@/theory";
import { GlobalContext } from "@/context";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Toast_Notification from "@/components/toastNotification";
import { gettingCartProduct } from "@/services/cart/get_cartProducts";
import { AddIcon, MinusIcon, DeleteIcon } from "@chakra-ui/icons";
import { deletingCartProduct } from "@/services/cart/delete_cartProduct";
import { updateCartProduct } from "@/services/cart/update_cartProduct";
import { addingCartProduct } from "@/services/cart/add_cartProduct";
import SimpleLoader from "@/components/simpleLoader";
import HashLoader from "react-spinners/HashLoader";
import { useRouter } from "next/navigation";

export default function Cart() {
  const router = useRouter();
  const [cartLoad, setCartLoad] = useState(false);

  const {
    user,
    cartProducts,
    setCartProducts,
    itemsLoader,
    setItemsLoader,
    handleAddCartProduct,
  } = useContext(GlobalContext);

  async function handleDeleteProductCart(cartItems: any) {
    const data = await deletingCartProduct(cartItems);
    if (data.success) {
      getCartItems();
      toast.success(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      toast.error(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }

  async function handleUpdateProductCart(content: any) {
    if (content.quantity === 1) {
      handleDeleteProductCart(content._id);
      getCartItems();
    } else {
      const data = await updateCartProduct({
        userId: user._id,
        productId: content.productId._id,
      });
      console.log(data);
      if (data.success) {
        getCartItems();
        toast.success(data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.error(data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  }

  async function getCartItems() {
    const response = await gettingCartProduct(user?._id);
    if (response?.success) {
      setCartProducts(response.data);
      localStorage.setItem("cart_Products", JSON.stringify(response.data));
    }
    console.log(user?._id);
    console.log(response?.data);
  }

  useEffect(() => {
    if (user !== null) getCartItems();
  }, [user, cartProducts]);

  useEffect(() => {
    setCartLoad(true);
    setTimeout(() => {
      setCartLoad(false);
    }, 1500);
  }, []);

  return (
    <Box
      width="100%"
      px={{ base: "5", md: "2", lg: "14", xl: "20" }}
      pb={{ base: "10", md: "16" }}
      pt={{ base: "20", md: "36" }}
    >
      {cartLoad ? (
        <Center height="60vh">
          <HashLoader
            color="#9a6abf"
            loading={cartLoad}
            size={60}
            aria-label="Loading Spinner"
          />
        </Center>
      ) : (
        <Box>
          <Flex
            display={{ base: "none", md: "flex" }}
            alignItems="center"
            bg="gray.100"
            direction="column"
            borderBottomRadius="lg"
          >
            <Flex
              bg="gray.900"
              color="gray.50"
              width="100%"
              height="60px"
              alignItems="center"
              borderTopRadius="lg"
              justifyContent="space-between"
              pr={{ md: "8", lg: "20" }}
              pl={{ md: "2", lg: "12" }}
            >
              {productDetailsTitles.map((p: any) => (
                <Text
                  fontSize="sm"
                  textTransform="uppercase"
                  key={p.id}
                  textAlign="center"
                  minWidth={p.width}
                >
                  {p.label}
                </Text>
              ))}
            </Flex>

            <Flex
              bg="purple.50"
              py={10}
              px={3}
              width="100%"
              alignItems="center"
              borderBottomRadius="lg"
              justifyContent="space-between"
              pr={{ md: "8", lg: "20" }}
              pl={{ md: "4", lg: "12" }}
            >
              <SimpleGrid columns={1} width="100%">
                {cartProducts && cartProducts.length ? (
                  <>
                    {cartProducts.map((c: any) => (
                      <Flex direction="column" width="100%" key={c && c._id}>
                        <Flex
                          direction="row"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Box minWidth="230px">
                            <HStack>
                              <CldImage
                                width="80"
                                height="80"
                                src={c && c.productId && c.productId.imageUrl}
                                sizes="100vw"
                                alt="Product Image"
                                style={{
                                  borderRadius: "5px",
                                }}
                              />

                              <Stack fontWeight="semibold" pl="15px">
                                <Text color="gray.900" fontSize="14px">
                                  {c && c.productId && c.productId.name}
                                </Text>
                                <Text color="gray.500" fontSize="13px">
                                  Size: Medium
                                </Text>
                              </Stack>
                            </HStack>
                          </Box>

                          <Box
                            minWidth="75px"
                            textAlign="center"
                            color="gray.700"
                            fontSize="14px"
                            fontWeight="semibold"
                          >
                            {c && c.productId && c.productId.discount > 0
                              ? c.productId.price -
                                c.productId.price * (c.productId.discount / 100)
                              : c && c.productId && c.productId.price}{" "}
                            PKR
                          </Box>

                          <Box
                            minWidth="80px"
                            textAlign="center"
                            color="gray.700"
                            fontSize="14px"
                            fontWeight="semibold"
                          >
                            <IconButton
                              aria-label="Increase"
                              icon={<AddIcon />}
                              color="purple.500"
                              fontSize="10.5px"
                              cursor="pointer"
                              fontWeight="bold"
                              width="10px"
                              height="22px"
                              mr="6px"
                              onClick={() => {
                                handleAddCartProduct(c && c.productId);
                              }}
                            />
                            {c && c.quantity > 0 ? c.quantity : ""}
                            <IconButton
                              aria-label="Decrease"
                              icon={<MinusIcon />}
                              color="purple.500"
                              fontSize="10.5px"
                              fontWeight="bold"
                              width="10px"
                              height="22px"
                              cursor="pointer"
                              ml="6px"
                              onClick={() => {
                                handleUpdateProductCart(c);
                              }}
                            />
                          </Box>

                          <Box
                            minWidth="60px"
                            textAlign="center"
                            color="gray.500"
                            fontSize="14px"
                          >
                            {c && c.productId && c.productId.delivery === "Free"
                              ? "Free"
                              : "300"}
                          </Box>

                          <Box
                            minWidth="70px"
                            textAlign="center"
                            color="gray.700"
                            fontSize="14px"
                            fontWeight="semibold"
                          >
                            {c && c.productId && c.productId.discount > 0
                              ? (c.productId.price -
                                  c.productId.price *
                                    (c.productId.discount / 100)) *
                                  c.quantity +
                                (c.productId.delivery !== "Free" ? 300 : 0)
                              : c &&
                                c.productId &&
                                c.productId.price * c.quantity +
                                  (c.productId.delivery !== "Free"
                                    ? 300
                                    : 0)}{" "}
                            PKR
                          </Box>

                          <Box minWidth="50px" textAlign="center">
                            <IconButton
                              onClick={() => handleDeleteProductCart(c._id)}
                              aria-label="Delete Button"
                              icon={<DeleteIcon />}
                              color="red"
                              fontSize="20px"
                              cursor="pointer"
                              bg="purple.50"
                              _hover={{ bg: "purple.50" }}
                            />
                          </Box>
                        </Flex>

                        <Box
                          bg="gray.300"
                          my={6}
                          height="1px"
                          width="100%"
                        ></Box>
                      </Flex>
                    ))}
                  </>
                ) : (
                  <Text mx="auto" py={{ base: "15px", md: "70px" }}>
                    Your basket is empty please order Something
                  </Text>
                )}
              </SimpleGrid>
            </Flex>
          </Flex>

          {/* Mobile Section */}

          {cartProducts && cartProducts.length ? (
            <Badge
              textAlign="center"
              display={{ base: "block", md: "none" }}
              borderRadius="10px"
              bg="purple.500"
              color="gray.50"
              textTransform="capitalize"
              fontWeight="semibold"
              fontSize="xl"
              py="3"
              px="6"
              my="20px"
            >
              All Cart Items
            </Badge>
          ) : (
            <Flex
              mt={26}
              alignItems="center"
              p={10}
              bg="red.200"
              borderRadius="20px"
              mx="auto"
              width={{ base: "90%", md: "100%" }}
              display={{base:"flex", md:"none"}}
            >
              <Text textAlign="center" fontSize="14px" color="gray.900">
                Your basket is empty please order Something.
              </Text>
            </Flex>
          )}

          <SimpleGrid columns={1} width="100%" spacingY="20px">
            {cartProducts && cartProducts.length ? (
              <>
                {cartProducts.map((c: any) => (
                  <Flex
                    key={c && c._id}
                    display={{ base: "flex", md: "none" }}
                    direction="row"
                    bg="orange.50"
                    width="100%"
                    alignItems="center"
                    borderRadius="lg"
                    p={3}
                  >
                    <Stack>
                      {productDetailsTitles.map((p: any) => (
                        <HStack key={p.id}>
                          <Box width="120px" pl="5px">
                            <Text
                              color="gray.50"
                              fontSize="15px"
                              bg="gray.500"
                              borderRadius="5px"
                              py="6px"
                              px="10px"
                              textAlign="center"
                            >
                              {p.label}
                            </Text>
                          </Box>

                          <Flex
                            color="gray.700"
                            px={3}
                            width="100%"
                            alignItems="center"
                            py={3}
                          >
                            {p.label === "Product Details" ? (
                              <HStack borderTopRadius="lg">
                                <CldImage
                                  width="80"
                                  height="80"
                                  src={c && c.productId && c.productId.imageUrl}
                                  sizes="100vw"
                                  alt="Product Image"
                                  style={{
                                    borderRadius: "5px",
                                  }}
                                />
                                <Stack fontWeight="semibold" pl="15px">
                                  <Text color="gray.900" fontSize="14px">
                                    {c && c.productId && c.productId.name}
                                  </Text>
                                  <Text color="gray.500" fontSize="13px">
                                    Size: Medium
                                  </Text>
                                </Stack>
                              </HStack>
                            ) : p.label === "Price" ? (
                              <Box
                                pl="10px"
                                textAlign="center"
                                color="gray.700"
                                fontSize="14px"
                                fontWeight="semibold"
                              >
                                {c && c.productId && c.productId.discount > 0
                                  ? c.productId.price -
                                    c.productId.price *
                                      (c.productId.discount / 100)
                                  : c && c.productId && c.productId.price}{" "}
                                PKR
                              </Box>
                            ) : p.label === "Quantity" ? (
                              <Box
                                pl="10px"
                                textAlign="center"
                                color="gray.700"
                                fontSize="14px"
                                fontWeight="semibold"
                              >
                                <IconButton
                                  aria-label="Increase"
                                  icon={<AddIcon />}
                                  color="purple.500"
                                  fontSize="10.5px"
                                  cursor="pointer"
                                  fontWeight="bold"
                                  width="10px"
                                  height="22px"
                                  mr="6px"
                                  onClick={() => {
                                    handleAddCartProduct(c);
                                  }}
                                />
                                {c && c.quantity > 0 ? c.quantity : ""}
                                <IconButton
                                  aria-label="Decrease"
                                  icon={<MinusIcon />}
                                  color="purple.500"
                                  fontSize="10.5px"
                                  fontWeight="bold"
                                  width="10px"
                                  height="22px"
                                  cursor="pointer"
                                  ml="6px"
                                  onClick={() => {
                                    handleUpdateProductCart(c);
                                  }}
                                />
                              </Box>
                            ) : p.label === "Shipping" ? (
                              <Box
                                pl="10px"
                                textAlign="center"
                                color="gray.500"
                                fontSize="14px"
                              >
                                {c &&
                                c.productId &&
                                c.productId.delivery === "Free"
                                  ? "Free"
                                  : "300"}
                              </Box>
                            ) : p.label === "Subtotal" ? (
                              <Box
                                pl="10px"
                                textAlign="center"
                                color="gray.700"
                                fontSize="14px"
                                fontWeight="semibold"
                              >
                                {c && c.productId && c.productId.discount > 0
                                  ? (c.productId.price -
                                      c.productId.price *
                                        (c.productId.discount / 100)) *
                                      c.quantity +
                                    (c.productId.delivery !== "Free" ? 300 : 0)
                                  : c &&
                                    c.productId &&
                                    c.productId.price * c.quantity +
                                      (c && c.productId.delivery !== "Free"
                                        ? 300
                                        : 0)}{" "}
                                PKR
                              </Box>
                            ) : p.label === "Action" ? (
                              <Box
                                textAlign="center"
                                pl="10px"
                                borderBottomRadius="lg"
                              >
                                <IconButton
                                  onClick={() => handleDeleteProductCart(c._id)}
                                  aria-label="Delete Button"
                                  icon={<DeleteIcon />}
                                  color="red"
                                  fontSize="18px"
                                  cursor="pointer"
                                  bg="orange.50"
                                  _hover={{ bg: "orange.100" }}
                                />
                              </Box>
                            ) : null}
                          </Flex>
                        </HStack>
                      ))}
                    </Stack>
                  </Flex>
                ))}
              </>
            ) : null}
          </SimpleGrid>

          {cartProducts && cartProducts.length ? (
            <Flex
              width="100%"
              direction="column"
              bg="gray.100"
              my="25px"
              py="25px"
              borderRadius="10px"
              alignItems="center"
            >
              <Flex
                width={{ base: "300px", lg: "200px" }}
                direction="column"
                alignItems="center"
              >
                <Box
                  textAlign="center"
                  color="gray.900"
                  fontSize={{ base: "17px", md: "14px" }}
                  fontWeight="semibold"
                >
                  Grand Total {" = "}
                  {cartProducts.reduce((total: any, c: any) => {
                    return (
                      total +
                      (c && c.productId && c.productId.discount > 0
                        ? (c.productId.price -
                            c.productId.price * (c.productId.discount / 100)) *
                            c.quantity +
                          (c && c.productId && c.productId.delivery !== "Free"
                            ? 300
                            : 0)
                        : c && c.productId && c.productId.price * c.quantity) +
                      (c && c.productId && c.productId.delivery !== "Free"
                        ? 300
                        : 0)
                    );
                  }, 0)}{" "}
                  PKR
                </Box>

                <Button
                  mt="28px"
                  bg="purple.500"
                  color="gray.100"
                  _hover={{ bg: "purple.700", color: "white" }}
                  borderRadius="25px"
                  fontSize={{ base: "17px", md: "14px" }}
                  p="25px"
                  onClick={() => router.push("/pages/profile")}
                >
                  Proceed
                </Button>
              </Flex>
            </Flex>
          ) : null}
        </Box>
      )}

      <Toast_Notification />
    </Box>
  );
}
