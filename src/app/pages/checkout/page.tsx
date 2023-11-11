"use client";
import {
  Box,
  Heading,
  Stack,
  Flex,
  Card,
  Text,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Center,
  Button,
} from "@chakra-ui/react";
import { GlobalContext } from "@/context";
import { useContext, useEffect, useState } from "react";
import { CldImage } from "next-cloudinary";
import { useSearchParams, useRouter } from "next/navigation";
import { addAddressInfo } from "@/theory";
import { loadStripe } from "@stripe/stripe-js";
import { stripeSession } from "@/services/stripe";
import { addingOrder } from "@/services/order/addOrder";
import { toast } from "react-toastify";
import Toast_Notification from "@/components/toastNotification";

export default function Checkout() {
  const router = useRouter();
  const params = useSearchParams();
  const [orderProcess, setOrderProcess] = useState(false);
  const [orderDone, setOrderDone] = useState(false);

  const {
    user,
    cartProducts,
    setCartProducts,
    checkoutData,
    setCheckoutData,
    selectAddress,
    setSelectAddress,
  } = useContext(GlobalContext);

  const publishKey =
    "pk_test_51O4pMoFTRXL8S9JE8JVcvvYPPYveZlXgf5aqm1rZYF2WWk0bx8T1xh2ZVrbf1v61pJlIweLsIndxRlSYyQWOFyx500RJwulY4I";
  const getStripe = loadStripe(publishKey);

  console.log(user);
  console.log(cartProducts);
  console.log(selectAddress);
  console.log(checkoutData);

  function calculateTotalPrice(product: any, quantity: any) {
    const price =
      product.discount > 0
        ? product.price - product.price * (product.discount / 100)
        : product.price;
    const deliveryCost = product.delivery !== "Free" ? 300 : 0;
    return `${price * quantity + deliveryCost} PKR`;
  }

  async function handleCheckout() {
    console.log("Checkout Button is clicked");
    const stripe = await getStripe;

    const createItems = cartProducts.map((c: any) => ({
      price_data: {
        currency: "pkr",
        product_data: {
          images: [
            "https://res.cloudinary.com/dyplje1rv/image/upload/v1697973479/" +
              c.productId.imageUrl,
          ],
          name: c.productId.name,
        },
        unit_amount:
          c.productId.discount > 0
            ? (c.productId.price -
                c.productId.price * (c.productId.discount / 100)) *
              100
            : c.productId.price * 100,
      },
      quantity: c.quantity,
      key: c.id,
    }));

    const response = await stripeSession(createItems);
    if (response.success) {
      setOrderProcess(true);
      localStorage.setItem("stripe", "true");

      const checkoutResult = await stripe?.redirectToCheckout({
        sessionId: response.id,
      });

      console.log(response);

      if (checkoutResult?.error) {
        console.error(checkoutResult.error);
      }
    }
  }

  useEffect(() => {
    async function orderFinalized() {
      const storedStripePayment = localStorage.getItem("stripe");

      if (storedStripePayment) {
        try {
          const stripePayment = JSON.parse(storedStripePayment);

          if (
            stripePayment &&
            cartProducts &&
            cartProducts.length > 0 &&
            params.get("status") === "success"
          ) {
            setOrderProcess(true);

            const checkOutFinal = {
              user: user?._id,
              orderProducts: cartProducts.map((c: any) => ({
                quantity: c.quantity,
                product: c.productId,
                key: c.productId._id,
              })),
              shippingAddress: checkoutData.shippingAddress,
              paymentMethod: "Stripe",
              totalPrice: cartProducts.reduce((total: any, c: any) => {
                const deliver = c.productId.delivery === "Free" ? 0 : 300;
                const productPrice = c.productId.discount > 0
                  ? (c.productId.price - c.productId.price * (c.productId.discount / 100) + deliver)
                  : c.productId.price + deliver;
                const itemTotal = productPrice * c.quantity;
                return total + itemTotal;
              }, 0),
              isPaid: true,
              paidAt: new Date(),
              isProcessing: true,
            };

            localStorage.removeItem("cart_Products");
            localStorage.removeItem("checkout_Data");
            localStorage.removeItem("deliveryAddress");

            const response = await addingOrder(checkOutFinal);

            setCartProducts([]);
            setCheckoutData({
              shippingAddress: {},
              paymentMethod: "",
              totalPrice: 0,
              isPaid: false,
              paidAt: new Date(),
              isProcessing: true,
            });
            setSelectAddress(null);

            if (response.success) {
              toast.success(response.message, {
                position: toast.POSITION.TOP_RIGHT,
              });
              setOrderDone(true);
              setOrderProcess(false);
            } else {
              setOrderDone(false);
              setOrderProcess(false);
              toast.error(response.message, {
                position: toast.POSITION.TOP_RIGHT,
              });
            }
          }
        } catch (error) {
          console.error("Error parsing stripe data:", error);
        }
      }
    }

    orderFinalized();
  }, [params.get("status"), cartProducts, user]);

  useEffect(() => {
    if (orderDone) {
      setTimeout(() => {
        router.push("/pages/orders");
      }, 1000);
    }
  }, [orderDone]);

  return (
    <Box width="100%">
      <Box width={{ base: "330px", md: "90%" }} py={32} mx="auto">
        <Stack spacing={6}>
          <Heading mb="36px" textAlign="center">
            Check Out
          </Heading>

          {cartProducts && cartProducts.length ? (
            <Flex direction={{ base: "column", md: "row" }} width="100%">
              {/* Address Details Section */}
              <Box
                width={{ base: "100%", md: "92%" }}
                mb={{ base: "60px", md: "0" }}
                mr={{ base: "0", md: "30px" }}
              >
                <Heading
                  fontSize="24px"
                  mb={8}
                  color="gray.500"
                  textAlign={{ base: "center", md: "start" }}
                >
                  Address Details
                </Heading>
                {addAddressInfo.map((a) => (
                  <FormControl key={a.id} isRequired mt={4}>
                    <FormLabel>{a.label}</FormLabel>
                    {a.componentType === "input" ? (
                      <Input
                        color="gray.500"
                        size="sm"
                        type={a.type}
                        placeholder={a.placeholder}
                        value={checkoutData.shippingAddress[a.id]}
                        isReadOnly
                      />
                    ) : (
                      <Textarea
                        isReadOnly
                        color="gray.500"
                        size="sm"
                        placeholder={a.placeholder}
                        value={checkoutData.shippingAddress[a.id]}
                      />
                    )}
                  </FormControl>
                ))}

                <Box width="100%">
                  <Button
                    mt="30px"
                    size="lg"
                    fontSize="16px"
                    colorScheme="purple"
                    variant="solid"
                    onClick={() => {
                      handleCheckout();
                    }}
                  >
                    Confirm Order
                  </Button>
                </Box>
              </Box>

              {/* Order Details Section */}
              <Flex direction={{ base: "column", md: "row" }} width="100%">
                <Box
                  width={{ base: "100%", md: "92%" }}
                  mb={{ base: "30px", md: "0" }}
                  mr={{ base: "0", md: "20px" }}
                >
                  <Stack spacing={4}>
                    <Heading
                      fontSize="24px"
                      mb={10}
                      color="gray.500"
                      textAlign={{ base: "center", md: "start" }}
                    >
                      Order Summary
                    </Heading>
                    {cartProducts.map((c: any) => (
                      <Box key={c && c._id} borderWidth="1px" p={4}>
                        <Flex
                          direction={{ base: "column", md: "row" }}
                          justifyContent="space-between"
                          alignItems={{ base: "start", md: "center" }}
                        >
                          <Flex
                            direction="row"
                            alignItems={{ base: "start", md: "center" }}
                          >
                            <Box minWidth="80px" mr={4}>
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
                            </Box>

                            <Box flex="1">
                              <Text fontWeight="semibold" fontSize="lg">
                                {c.productId.name}
                              </Text>
                              <Text color="gray.500" fontSize="sm">
                                Size: Medium
                              </Text>
                            </Box>
                          </Flex>

                          <Box
                            mt={{ base: "-16px", md: "0" }}
                            alignSelf={{ base: "end", md: "center" }}
                            textAlign="center"
                            color="gray.600"
                            fontSize={{ base: "sm", md: "md" }}
                            fontWeight="semibold"
                          >
                            {calculateTotalPrice(c.productId, c.quantity)}
                          </Box>
                        </Flex>
                      </Box>
                    ))}

                    <Flex
                      direction="column"
                      bg="gray.600"
                      borderRadius="10px"
                      color="gray.50"
                      p="20px"
                    >
                      <Flex
                        direction="row"
                        justifyContent="space-between"
                        mb={2}
                      >
                        <Text fontSize="14px">Subtotal</Text>
                        <Text fontSize="14px">
                          {cartProducts && cartProducts.length ? (
                            <>{cartProducts.length} items</>
                          ) : null}
                        </Text>
                      </Flex>

                      <Flex direction="row" justifyContent="space-between">
                        <Text fontSize="14px">Payment</Text>
                        <Text fontSize="14px">
                          {cartProducts.reduce((total: any, c: any) => {
                            return (
                              total +
                              (c.productId && c.productId.discount > 0
                                ? (c.productId.price -
                                    c.productId.price *
                                      (c.productId.discount / 100)) *
                                    c.quantity +
                                  (c.productId.delivery !== "Free" ? 300 : 0)
                                : c.productId &&
                                  c.productId.price * c.quantity) +
                              (c.productId.delivery !== "Free" ? 300 : 0)
                            );
                          }, 0)}{" "}
                          PKR
                        </Text>
                      </Flex>
                    </Flex>
                  </Stack>
                </Box>
              </Flex>
            </Flex>
          ) : orderDone ? (
            <Flex
              width={{ base: "94", md: "80%" }}
              bg="purple.500"
              color="white"
              borderRadius="lg"
              height={{ base: "60px", md: "250px" }}
              mx="auto"
              alignItems="center"
              justifyContent="center"
              direction="column"
              textAlign="center"
            >
              <Text mb={3}>Your Order is confirmed</Text>
              <Text>Your Payment is Successfull</Text>
            </Flex>
          ) : (
            <Flex
              width={{ base: "94", md: "80%" }}
              bg="purple.500"
              color="white"
              borderRadius="lg"
              height={{ base: "170px", md: "250px" }}
              mx="auto"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
            >
              Your basket is empty. Please order something.
            </Flex>
          )}
        </Stack>
      </Box>
      <Toast_Notification />
    </Box>
  );
}
