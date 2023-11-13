"use client";

import { GlobalContext } from "@/context";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Toast_Notification from "@/components/toastNotification";
import { gettingOrders } from "@/services/order/getOrders";
import {
  Box,
  Center,
  Flex,
  Heading,
  Text,
  SimpleGrid,
  Card,
  Stack,
  Code,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { CldImage } from "next-cloudinary";

interface OrderLoaders {
  [orderId: string]: boolean;
}

export const dynamic = "force-dynamic";

export default function Orders() {
  const router = useRouter();
  const [orderLoaders, setOrderLoaders] = useState<OrderLoaders>({});
  const { user, userOrders, setUserOrders } = useContext(GlobalContext);

  async function retreiveOrders() {
    const response = await gettingOrders(user?._id);

    if (response.success) {
      setUserOrders(response.data);
      toast.success(response.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      toast.error(response.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }

  useEffect(() => {
    if (user !== null) {
      retreiveOrders();
    }
  }, [user]);

  // function handleViewDetails(orderId: any) {
  //   setOrderLoaders({ ...orderLoaders, [orderId]: true });
  //   router.push(`/pages/orders/${orderId}`);
  //   setTimeout(() => {
  //     setOrderLoaders({ ...orderLoaders, [orderId]: false });
  //   }, 2000);
  // }

  console.log(userOrders);

  return (
    <Box width="100%" pt={28}>
      <Heading mb={4} textAlign="center" color="gray.700" fontFamily="poppins">
        My Orders
      </Heading>
      <SimpleGrid spacingY="34px" width="100%" mx="auto" columns={1}>
        <Flex
          width={{ base: "", md: "90%", xl: "85%" }}
          alignItems="center"
          py={16}
          direction="column"
          mx="auto"
        >
          {userOrders && userOrders.length ? (
            userOrders.map((u: any) => (
              <Box key={u._id} width={{ base: "96%", md: "100%" }}>
                <Card
                  bg="gray.100"
                  p={6}
                  direction="column"
                  mb={4}
                  width="100%"
                >
                  <Stack>
                    <Text fontWeight="semibold" mb={2}>
                      Order no: {u._id}
                    </Text>
                    <Flex
                      direction={{ base: "column", md: "row" }}
                      justifyContent="space-between"
                    >
                      <Text
                        color="gray.500"
                        fontSize="xs"
                        mb={{ base: "5px", md: "0" }}
                      >
                        <Code fontWeight="semibold" color="gray.600">
                          Order Date:
                        </Code>{" "}
                        {u.createdAt.split("T")[0]} |{" "}
                        {u.createdAt.split("T")[1].split(".")[0]}
                      </Text>
                      <Text color="gray.500" fontSize="xs">
                        <Code fontWeight="semibold" color="gray.600">
                          Order Status:
                        </Code>{" "}
                        {u.isProcessing ? "In progress" : "Delivered"}
                      </Text>
                    </Flex>
                  </Stack>
                </Card>

                <Card
                  key={u.createdAt}
                  bg="white"
                  p={6}
                  direction="column"
                  mb={4}
                  shadow="white"
                  width={{ base: "96%", md: "100%" }}
                >
                  <Stack>
                    <Flex
                      width="100%"
                      direction={{ base: "column", md: "row" }}
                      justifyContent={{ base: "center", md: "space-between" }}
                      alignItems="center"
                    >
                      <Flex
                        direction={{ base: "column", md: "row" }}
                        width="100%"
                      >
                        <Flex
                          direction="row"
                          justifyContent={{
                            base: "center",
                            md: "space-between",
                          }}
                          alignItems="center"
                        >
                          {u.orderProducts.map((order: any) => (
                            <Flex mr="10px" direction="row" key={order._id}>
                              <CldImage
                                width="60"
                                height="60"
                                src={
                                  order &&
                                  order.product &&
                                  order.product.imageUrl
                                }
                                sizes="100vw"
                                alt="Product Image"
                                style={{
                                  borderRadius: "5px",
                                }}
                              />
                            </Flex>
                          ))}
                        </Flex>

                        <Flex
                          direction="column"
                          pl={{ base: "0", md: "15px" }}
                          mt={{ base: "20px", md: "0" }}
                          alignItems={{ base: "center", md: "space-between" }}
                        >
                          <Text
                            color="gray.600"
                            textAlign="start"
                            fontSize="13px"
                          >
                            <Code
                              fontWeight="semibold"
                              bg="white"
                              color="gray.600"
                            >
                              Total{" "}
                              {u.orderProducts.length > 1 ? "Items:" : "Item:"}
                            </Code>{" "}
                            {u.orderProducts.length}{" "}
                            {u.orderProducts.length > 1
                              ? "products"
                              : "product"}
                          </Text>

                          <Text
                            color="gray.600"
                            textAlign="start"
                            fontSize="13px"
                          >
                            <Code
                              fontWeight="semibold"
                              bg="white"
                              mr="4px"
                              color="gray.600"
                            >
                              Total Bill:
                            </Code>{" "}
                            {u.totalPrice}
                          </Text>
                        </Flex>
                      </Flex>

                      {/* <Button
                        mt={{ base: "20px", md: "0" }}
                        size={{ base: "lg", md: "md" }}
                        colorScheme="purple"
                        variant="solid"
                        onClick={() => handleViewDetails(u._id)}
                      >
                        {orderLoaders[u._id] ? (
                          <SimpleLoader
                            text="Loading Page"
                            color="white"
                            loading={true}
                          />
                        ) : (
                          "View Details"
                        )}
                      </Button> */}
                    </Flex>
                  </Stack>
                </Card>
              </Box>
            ))
          ) : (
            <Flex
              alignItems="center"
              p={10}
              bg="red.200"
              borderRadius="20px"
              mt="-10px"
              width={{ base: "90%", md: "100%" }}
              justifyContent="center"
            >
              <Text textAlign="center" fontSize="14px" color="gray.900">
                Your basket is empty please order Something.
              </Text>
            </Flex>
          )}
        </Flex>
      </SimpleGrid>
      <Toast_Notification />
    </Box>
  );
}
