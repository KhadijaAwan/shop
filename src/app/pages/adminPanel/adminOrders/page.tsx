"use client";

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
  HStack,
  Badge,
} from "@chakra-ui/react";

import { GlobalContext } from "@/context";
import { useContext, useState } from "react";
import { productOrdersTitles } from "@/theory";
import Toast_Notification from "@/components/toastNotification";
import { CldImage } from "next-cloudinary";
export const dynamic = "force-dynamic";

export default function OrderInfo() {
  const { adminOrderView } = useContext(GlobalContext);

  return (
    <Box width="100%" pt={10} px={{ base: "20px", lg: "40px" }}>
      <Heading
        mt={20}
        mb={8}
        textAlign="center"
        color="gray.700"
        fontFamily="poppins"
      >
        Order Details
      </Heading>

      <Center>
        <Flex
          width={{ base: "", md: "", lg: "90%", xl: "85%" }}
          alignItems="center"
          py={8}
          direction={{ base: "column", md: "row" }}
        >
          <Card
            bg="gray.100"
            p={6}
            direction="column"
            width={{ base: "100%", md: "95%", lg: "100%" }}
            mr={{ base: "0", md: "30px" }}
            mb={{ base: "30px", md: "0" }}
          >
            <Stack>
              <Text fontWeight="semibold" mb={2}>
                Username:{" "}
                {adminOrderView &&
                  adminOrderView.user &&
                  adminOrderView.user.username}
              </Text>
              <Text color="gray.600" fontSize="xs">
                <Code fontWeight="semibold" color="gray.600">
                  Email:
                </Code>{" "}
                {adminOrderView &&
                  adminOrderView.user &&
                  adminOrderView.user.email}
              </Text>
              <Text color="gray.600" fontSize="xs">
                <Code fontWeight="semibold" color="gray.600">
                  City:
                </Code>{" "}
                {adminOrderView &&
                  adminOrderView.shippingAddress &&
                  adminOrderView.shippingAddress.city}
              </Text>
              <Text color="gray.600" fontSize="xs">
                <Code fontWeight="semibold" color="gray.600">
                  Country:
                </Code>{" "}
                {adminOrderView &&
                  adminOrderView.shippingAddress &&
                  adminOrderView.shippingAddress.country}
              </Text>
              <Text color="gray.600" fontSize="xs">
                <Code fontWeight="semibold" color="gray.600">
                  Address:
                </Code>{" "}
                {adminOrderView &&
                  adminOrderView.shippingAddress &&
                  adminOrderView.shippingAddress.address}
              </Text>
              <Text color="gray.600" fontSize="xs">
                <Code fontWeight="semibold" color="gray.600">
                  Postal Code:
                </Code>{" "}
                {adminOrderView &&
                  adminOrderView.shippingAddress &&
                  adminOrderView.shippingAddress.postalCode}
              </Text>
            </Stack>
          </Card>

          <Card
            key={adminOrderView && adminOrderView._id}
            bg="gray.100"
            p={6}
            direction="column"
            width={{ base: "100%", md: "95%", lg: "100%" }}
          >
            <Stack>
              <Text fontWeight="semibold" mb={2}>
                Order no: {adminOrderView && adminOrderView._id}
              </Text>
              <Text color="gray.600" fontSize="xs">
                <Code fontWeight="semibold" color="gray.600">
                  Placed on
                </Code>{" "}
                {adminOrderView && adminOrderView.createdAt.split("T")[0]} |{" "}
                {adminOrderView &&
                  adminOrderView.createdAt.split("T")[1].split(".")[0]}
              </Text>
              <Text color="gray.600" fontSize="xs">
                <Code fontWeight="semibold" color="gray.600">
                  Order:
                </Code>{" "}
                {adminOrderView && adminOrderView.isProcessing
                  ? "In progress"
                  : "Delivered"}
              </Text>
              <Text color="gray.600" fontSize="xs">
                <Code fontWeight="semibold" color="gray.600">
                  Payment:
                </Code>{" "}
                {adminOrderView && adminOrderView.isPaid ? "Done" : "Required"}
              </Text>
              <Text color="gray.600" fontSize="xs">
                <Code fontWeight="semibold" color="gray.600">
                  Delivered:
                </Code>{" "}
                {adminOrderView && adminOrderView.isProcessing ? "No" : "Yes"}
              </Text>
              <Text color="gray.600" fontSize="xs">
                <Code fontWeight="semibold" color="gray.600">
                  Total:
                </Code>{" "}
                {adminOrderView && adminOrderView.totalPrice} PKR
              </Text>
            </Stack>
          </Card>
        </Flex>
      </Center>

      {/* Mobile Section */}

      {adminOrderView &&
      adminOrderView.orderProducts &&
      adminOrderView.orderProducts.length ? (
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
          mb="20px"
        >
          All Order Items
        </Badge>
      ) : null}

      <SimpleGrid columns={1} width="100%" spacingY="20px">
        {adminOrderView &&
        adminOrderView.orderProducts &&
        adminOrderView.orderProducts.length ? (
          <>
            {adminOrderView.orderProducts.map((i: any) => (
              <Flex
                key={i._id}
                display={{ base: "flex", md: "none" }}
                direction="row"
                bg="orange.50"
                width="100%"
                alignItems="center"
                borderRadius="lg"
                p={3}
              >
                <Stack>
                  {productOrdersTitles.map((p: any) => (
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
                              src={i && i.product && i.product.imageUrl}
                              sizes="100vw"
                              alt="Product Image"
                              style={{
                                borderRadius: "5px",
                              }}
                            />
                            <Stack fontWeight="semibold" pl="15px">
                              <Text color="gray.900" fontSize="14px">
                                {i && i.product && i.product.name}
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
                            {i && i.product && i.product.discount > 0
                              ? i.product.price -
                                i.product.price * (i.product.discount / 100)
                              : i && i.product && i.product.price}{" "}
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
                            {i && i.quantity > 0 ? i.quantity : ""}
                          </Box>
                        ) : p.label === "Shipping" ? (
                          <Box
                            pl="10px"
                            textAlign="center"
                            color="gray.500"
                            fontSize="14px"
                          >
                            {i && i.product && i.product.delivery === "Free"
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
                            {i && i.product && i.product.discount > 0
                              ? (i.product.price -
                                  i.product.price *
                                    (i.product.discount / 100)) *
                                  i.quantity +
                                (i.product.delivery !== "Free" ? 300 : 0)
                              : i &&
                                i.product &&
                                i.product.price * i.quantity +
                                  (i && i.product.delivery !== "Free"
                                    ? 300
                                    : 0)}{" "}
                            PKR
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

      <Center mb="30px">
        <Flex
          display={{ base: "none", md: "flex" }}
          alignItems="center"
          bg="gray.100"
          direction="column"
          borderBottomRadius="lg"
          width={{ md: "95%", lg: "90%" }}
        >
          <Flex
            bg="gray.900"
            color="gray.50"
            width="100%"
            height="60px"
            alignItems="center"
            borderTopRadius="lg"
            justifyContent="space-between"
            pr={{ md: "8", lg: "14" }}
            pl={{ md: "2", lg: "12" }}
          >
            {productOrdersTitles.map((p: any) => (
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
            pr={{ md: "8", lg: "14" }}
            pl={{ md: "4", lg: "12" }}
          >
            <SimpleGrid columns={1} width="100%">
              {adminOrderView &&
              adminOrderView.orderProducts &&
              adminOrderView.orderProducts.length ? (
                <>
                  {adminOrderView.orderProducts.map((i: any) => (
                    <Flex direction="column" width="100%" key={i && i._id}>
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
                              src={i && i.product && i.product.imageUrl}
                              sizes="100vw"
                              alt="Product Image"
                              style={{
                                borderRadius: "5px",
                              }}
                            />
                            <Stack fontWeight="semibold" pl="15px">
                              <Text color="gray.900" fontSize="14px">
                                {i && i.product && i.product.name}
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
                          {i && i.product && i.product.discount > 0
                            ? i.product.price -
                              i.product.price * (i.product.discount / 100)
                            : i && i.product && i.product.price}{" "}
                          PKR
                        </Box>

                        <Box
                          minWidth="60px"
                          textAlign="center"
                          color="gray.700"
                          fontSize="14px"
                          fontWeight="semibold"
                        >
                          {i && i.quantity > 0 ? i.quantity : ""}
                        </Box>

                        <Box
                          minWidth="60px"
                          textAlign="center"
                          color="gray.500"
                          fontSize="14px"
                        >
                          {i.product && i.product.delivery === "Free"
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
                          {i && i.product && i.product.discount > 0
                            ? (i.product.price -
                                i.product.price * (i.product.discount / 100)) *
                                i.quantity +
                              (i.product.delivery !== "Free" ? 300 : 0)
                            : i &&
                              i.product &&
                              i.product.price * i.quantity +
                                (i.product.delivery !== "Free" ? 300 : 0)}{" "}
                          PKR
                        </Box>
                      </Flex>
                      <Box bg="gray.300" my={6} height="1px" width="100%"></Box>
                    </Flex>
                  ))}
                </>
              ) : null}
            </SimpleGrid>
          </Flex>
        </Flex>
      </Center>

      {adminOrderView &&
      adminOrderView.orderProducts &&
      adminOrderView.orderProducts.length ? (
        <Flex
          mx="auto"
          width="95%"
          direction="column"
          bg="gray.100"
          mt="25px"
          mb="45px"
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
              {adminOrderView.orderProducts.reduce((total: any, i: any) => {
                return (
                  total +
                  (i && i.product && i.product.discount > 0
                    ? (i.product.price -
                        i.product.price * (i.product.discount / 100)) *
                        i.quantity +
                      (i && i.product && i.product.delivery !== "Free"
                        ? 300
                        : 0)
                    : i && i.product && i.product.price * i.quantity) +
                  (i && i.product && i.product.delivery !== "Free" ? 300 : 0)
                );
              }, 0)}{" "}
              PKR
            </Box>
          </Flex>
        </Flex>
      ) : null}

      <Toast_Notification />
    </Box>
  );
}
