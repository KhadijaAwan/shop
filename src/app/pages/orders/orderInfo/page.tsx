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
  Button,
  HStack,
  IconButton,
  Badge,
} from "@chakra-ui/react";

import { GlobalContext } from "@/context";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { productOrdersTitles } from "@/theory";
import Toast_Notification from "@/components/toastNotification";
import { gettingUserOrder } from "@/services/order/getOrderInfo";
import SimpleLoader from "@/components/simpleLoader";
import { useParams, useRouter } from "next/navigation";
import HashLoader from "react-spinners/HashLoader";
import { CldImage } from "next-cloudinary";
export const dynamic = "force-dynamic";

export default function OrderInfo() {
  return (
    <Box width="100%" pt={10} px={{ base: "20px", lg: "40px" }}>
      Awan
    </Box>
  );
}
//   const params = useParams();
//   const router = useRouter();
//   const [userOrderLoad, setUserOrderLoad] = useState(false);
//   const [orderNowLoader, setOrderNowLoader] = useState(false);
//   const { user, itemsLoader, individualOrder, setIndividualOrder } =
//     useContext(GlobalContext);

//   console.log(params);

//   useEffect(() => {
//     setUserOrderLoad(true);
//     setTimeout(() => {
//       setUserOrderLoad(false);
//     }, 1800);
//   }, []);

//   async function retreiveOrder() {
//     const response = await gettingUserOrder(params["orderInfo"]);

//     if (response.success) {
//       console.log(response.data);
//       setIndividualOrder(response.data);
//       toast.success(response.message, {
//         position: toast.POSITION.TOP_RIGHT,
//       });
//     } else {
//       toast.error(response.message, {
//         position: toast.POSITION.TOP_RIGHT,
//       });
//     }
//   }

//   useEffect(() => {
//     retreiveOrder();
//   }, []);

  // return (
  //   <Box width="100%" pt={10} px={{ base: "20px", lg: "40px" }}>
//       {userOrderLoad ? (
//         <Center height="80vh">
//           <HashLoader
//             color="#9a6abf"
//             loading={userOrderLoad}
//             size={60}
//             aria-label="Loading Spinner"
//           />
//         </Center>
//       ) : (
//         <>
//           <Heading
//             mb={8}
//             pt={20}
//             textAlign="center"
//             color="gray.700"
//             fontFamily="poppins"
//           >
//             Order Details
//           </Heading>

//           <Center>
//             <Flex
//               width={{ base: "", md: "90%", xl: "85%" }}
//               alignItems="center"
//               py={8}
//               direction={{ base: "column", lg: "row" }}
//             >
//               <Card
//                 bg="gray.100"
//                 p={6}
//                 direction="column"
//                 width="100%"
//                 mr={{ base: "0", lg: "30px" }}
//                 mb={{ base: "30px", lg: "0" }}
//               >
//                 <Stack>
//                   <Text fontWeight="semibold" mb={2}>
//                     User: {user?.username}
//                   </Text>
//                   <Text color="gray.600" fontSize="xs">
//                     <Code fontWeight="semibold" color="gray.600">
//                       Email:
//                     </Code>{" "}
//                     {user?.email}
//                   </Text>
//                   <Text color="gray.600" fontSize="xs">
//                     <Code fontWeight="semibold" color="gray.600">
//                       City:
//                     </Code>{" "}
//                     {individualOrder &&
//                       individualOrder.shippingAddress &&
//                       individualOrder.shippingAddress.city}
//                   </Text>
//                   <Text color="gray.600" fontSize="xs">
//                     <Code fontWeight="semibold" color="gray.600">
//                       Country:
//                     </Code>{" "}
//                     {individualOrder &&
//                       individualOrder.shippingAddress &&
//                       individualOrder.shippingAddress.country}
//                   </Text>
//                   <Text color="gray.600" fontSize="xs">
//                     <Code fontWeight="semibold" color="gray.600">
//                       Address:
//                     </Code>{" "}
//                     {individualOrder &&
//                       individualOrder.shippingAddress &&
//                       individualOrder.shippingAddress.address}
//                   </Text>
//                   <Text color="gray.600" fontSize="xs">
//                     <Code fontWeight="semibold" color="gray.600">
//                       Postal Code:
//                     </Code>{" "}
//                     {individualOrder &&
//                       individualOrder.shippingAddress &&
//                       individualOrder.shippingAddress.postalCode}
//                   </Text>
//                 </Stack>
//               </Card>

//               <Card
//                 key={individualOrder && individualOrder._id}
//                 bg="gray.100"
//                 p={6}
//                 direction="column"
//                 width="100%"
//               >
//                 <Stack>
//                   <Text fontWeight="semibold" mb={2}>
//                     Order no: {individualOrder && individualOrder._id}
//                   </Text>
//                   <Text color="gray.600" fontSize="xs">
//                     <Code fontWeight="semibold" color="gray.600">
//                       Placed on
//                     </Code>{" "}
//                     {individualOrder && individualOrder.createdAt.split("T")[0]}{" "}
//                     |{" "}
//                     {individualOrder &&
//                       individualOrder.createdAt.split("T")[1].split(".")[0]}
//                   </Text>
//                   <Text color="gray.600" fontSize="xs">
//                     <Code fontWeight="semibold" color="gray.600">
//                       Order:
//                     </Code>{" "}
//                     {individualOrder && individualOrder.isProcessing
//                       ? "In progress"
//                       : "Delivered"}
//                   </Text>
//                   <Text color="gray.600" fontSize="xs">
//                     <Code fontWeight="semibold" color="gray.600">
//                       Payment:
//                     </Code>{" "}
//                     {individualOrder && individualOrder.isPaid
//                       ? "Done"
//                       : "Required"}
//                   </Text>
//                   <Text color="gray.600" fontSize="xs">
//                     <Code fontWeight="semibold" color="gray.600">
//                       Delivery:
//                     </Code>{" "}
//                     {individualOrder && individualOrder.isProcessing
//                       ? "No"
//                       : "Yes"}
//                   </Text>
//                   <Text color="gray.600" fontSize="xs">
//                     <Code fontWeight="semibold" color="gray.600">
//                       Total:
//                     </Code>{" "}
//                     {individualOrder && individualOrder.totalPrice} PKR
//                   </Text>
//                 </Stack>
//               </Card>
//             </Flex>
//           </Center>

//           <Center>
//             <Flex
//               display={{ base: "none", md: "flex" }}
//               alignItems="center"
//               bg="gray.100"
//               direction="column"
//               borderBottomRadius="lg"
//               width="90%"
//             >
//               <Flex
//                 bg="gray.900"
//                 color="gray.50"
//                 width="100%"
//                 height="60px"
//                 alignItems="center"
//                 borderTopRadius="lg"
//                 justifyContent="space-between"
//                 pr={{ md: "8", lg: "14" }}
//                 pl={{ md: "2", lg: "12" }}
//               >
//                 {productOrdersTitles.map((p: any) => (
//                   <Text
//                     fontSize="sm"
//                     textTransform="uppercase"
//                     key={p.id}
//                     textAlign="center"
//                     minWidth={p.width}
//                   >
//                     {p.label}
//                   </Text>
//                 ))}
//               </Flex>

//               <Flex
//                 bg="purple.50"
//                 py={10}
//                 px={3}
//                 width="100%"
//                 alignItems="center"
//                 borderBottomRadius="lg"
//                 justifyContent="space-between"
//                 pr={{ md: "8", lg: "14" }}
//                 pl={{ md: "4", lg: "12" }}
//               >
//                 <SimpleGrid columns={1} width="100%">
//                   {individualOrder &&
//                   individualOrder.orderProducts &&
//                   individualOrder.orderProducts.length ? (
//                     <>
//                       {individualOrder.orderProducts.map((i: any) => (
//                         <Flex direction="column" width="100%" key={i && i._id}>
//                           <Flex
//                             direction="row"
//                             alignItems="center"
//                             justifyContent="space-between"
//                           >
//                             <Box minWidth="230px">
//                               <HStack>
//                                 <CldImage
//                                   width="80"
//                                   height="80"
//                                   src={i && i.product && i.product.imageUrl}
//                                   sizes="100vw"
//                                   alt="Product Image"
//                                   style={{
//                                     borderRadius: "5px",
//                                   }}
//                                 />
//                                 <Stack fontWeight="semibold" pl="15px">
//                                   <Text color="gray.900" fontSize="14px">
//                                     {i && i.product && i.product.name}
//                                   </Text>
//                                   <Text color="gray.500" fontSize="13px">
//                                     Size: Medium
//                                   </Text>
//                                 </Stack>
//                               </HStack>
//                             </Box>

//                             <Box
//                               minWidth="75px"
//                               textAlign="center"
//                               color="gray.700"
//                               fontSize="14px"
//                               fontWeight="semibold"
//                             >
//                               {i && i.product && i.product.discount > 0
//                                 ? i.product.price -
//                                   i.product.price * (i.product.discount / 100)
//                                 : i && i.product && i.product.price}{" "}
//                               PKR
//                             </Box>

//                             <Box
//                               minWidth="60px"
//                               textAlign="center"
//                               color="gray.700"
//                               fontSize="14px"
//                               fontWeight="semibold"
//                             >
//                               {i && i.quantity > 0 ? i.quantity : ""}
//                             </Box>

//                             <Box
//                               minWidth="60px"
//                               textAlign="center"
//                               color="gray.500"
//                               fontSize="14px"
//                             >
//                               {i.product && i.product.delivery === "Free"
//                                 ? "Free"
//                                 : "300"}
//                             </Box>

//                             <Box
//                               minWidth="70px"
//                               textAlign="center"
//                               color="gray.700"
//                               fontSize="14px"
//                               fontWeight="semibold"
//                             >
//                               {i && i.product && i.product.discount > 0
//                                 ? (i.product.price -
//                                     i.product.price *
//                                       (i.product.discount / 100)) *
//                                     i.quantity +
//                                   (i.product.delivery !== "Free" ? 300 : 0)
//                                 : i &&
//                                   i.product &&
//                                   i.product.price * i.quantity +
//                                     (i.product.delivery !== "Free"
//                                       ? 300
//                                       : 0)}{" "}
//                               PKR
//                             </Box>
//                           </Flex>
//                           <Box
//                             bg="gray.300"
//                             my={6}
//                             height="1px"
//                             width="100%"
//                           ></Box>
//                         </Flex>
//                       ))}
//                     </>
//                   ) : null}
//                 </SimpleGrid>
//               </Flex>
//             </Flex>
//           </Center>

//           {/* Mobile Section */}

//           {individualOrder &&
//           individualOrder.orderProducts &&
//           individualOrder.orderProducts.length ? (
//             <Badge
//               textAlign="center"
//               display={{ base: "block", md: "none" }}
//               borderRadius="10px"
//               bg="purple.500"
//               color="gray.50"
//               textTransform="capitalize"
//               fontWeight="semibold"
//               fontSize="xl"
//               py="3"
//               px="6"
//               mb="20px"
//             >
//               All Order Items
//             </Badge>
//           ) : null}

//           <SimpleGrid columns={1} width="100%" spacingY="20px">
//             {individualOrder &&
//             individualOrder.orderProducts &&
//             individualOrder.orderProducts.length ? (
//               <>
//                 {individualOrder.orderProducts.map((i: any) => (
//                   <Flex
//                     display={{ base: "flex", md: "none" }}
//                     direction="row"
//                     bg="orange.50"
//                     width="100%"
//                     alignItems="center"
//                     borderRadius="lg"
//                     p={3}
//                   >
//                     <Stack>
//                       {productOrdersTitles.map((p: any) => (
//                         <HStack key={p.id}>
//                           <Box width="120px" pl="5px">
//                             <Text
//                               color="gray.50"
//                               fontSize="15px"
//                               bg="gray.500"
//                               borderRadius="5px"
//                               py="6px"
//                               px="10px"
//                               textAlign="center"
//                             >
//                               {p.label}
//                             </Text>
//                           </Box>

//                           <Flex
//                             color="gray.700"
//                             px={3}
//                             width="100%"
//                             alignItems="center"
//                             py={3}
//                           >
//                             {p.label === "Product Details" ? (
//                               <HStack borderTopRadius="lg">
//                                 <CldImage
//                                   width="80"
//                                   height="80"
//                                   src={i && i.product && i.product.imageUrl}
//                                   sizes="100vw"
//                                   alt="Product Image"
//                                   style={{
//                                     borderRadius: "5px",
//                                   }}
//                                 />
//                                 <Stack fontWeight="semibold" pl="15px">
//                                   <Text color="gray.900" fontSize="14px">
//                                     {i && i.product && i.product.name}
//                                   </Text>
//                                   <Text color="gray.500" fontSize="13px">
//                                     Size: Medium
//                                   </Text>
//                                 </Stack>
//                               </HStack>
//                             ) : p.label === "Price" ? (
//                               <Box
//                                 pl="10px"
//                                 textAlign="center"
//                                 color="gray.700"
//                                 fontSize="14px"
//                                 fontWeight="semibold"
//                               >
//                                 {i && i.product && i.product.discount > 0
//                                   ? i.product.price -
//                                     i.product.price * (i.product.discount / 100)
//                                   : i && i.product && i.product.price}{" "}
//                                 PKR
//                               </Box>
//                             ) : p.label === "Quantity" ? (
//                               <Box
//                                 pl="10px"
//                                 textAlign="center"
//                                 color="gray.700"
//                                 fontSize="14px"
//                                 fontWeight="semibold"
//                               >
//                                 {i && i.quantity > 0 ? i.quantity : ""}
//                               </Box>
//                             ) : p.label === "Shipping" ? (
//                               <Box
//                                 pl="10px"
//                                 textAlign="center"
//                                 color="gray.500"
//                                 fontSize="14px"
//                               >
//                                 {i && i.product && i.product.delivery === "Free"
//                                   ? "Free"
//                                   : "300"}
//                               </Box>
//                             ) : p.label === "Subtotal" ? (
//                               <Box
//                                 pl="10px"
//                                 textAlign="center"
//                                 color="gray.700"
//                                 fontSize="14px"
//                                 fontWeight="semibold"
//                               >
//                                 {i && i.product && i.product.discount > 0
//                                   ? (i.product.price -
//                                       i.product.price *
//                                         (i.product.discount / 100)) *
//                                       i.quantity +
//                                     (i.product.delivery !== "Free" ? 300 : 0)
//                                   : i &&
//                                     i.product &&
//                                     i.product.price * i.quantity +
//                                       (i && i.product.delivery !== "Free"
//                                         ? 300
//                                         : 0)}{" "}
//                                 PKR
//                               </Box>
//                             ) : null}
//                           </Flex>
//                         </HStack>
//                       ))}
//                     </Stack>
//                   </Flex>
//                 ))}
//               </>
//             ) : null}
//           </SimpleGrid>

//           {individualOrder &&
//             individualOrder.orderProducts &&
//             individualOrder.orderProducts.length ? (
//             <Flex
//               mx="auto"
//               width="90%"
//               direction="column"
//               bg="gray.100"
//               mt="25px"
//               mb="15px"
//               py="25px"
//               borderRadius="10px"
//               alignItems="center"
//             >
//               <Flex
//                 width={{ base: "300px", lg: "200px" }}
//                 direction="column"
//                 alignItems="center"
//               >
//                 <Box
//                   textAlign="center"
//                   color="gray.900"
//                   fontSize={{ base: "17px", md: "14px" }}
//                   fontWeight="semibold"
//                 >
//                   Grand Total {" = "}
//                   {individualOrder.orderProducts.reduce((total: any, i: any) => {
//                     return (
//                       total +
//                       (i && i.product && i.product.discount > 0
//                         ? (i.product.price -
//                             i.product.price * (i.product.discount / 100)) *
//                             i.quantity +
//                           (i && i.product && i.product.delivery !== "Free"
//                             ? 300
//                             : 0)
//                         : i && i.product && i.product.price * i.quantity) +
//                       (i && i.product && i.product.delivery !== "Free"
//                         ? 300
//                         : 0)
//                     );
//                   }, 0)}{" "}
//                   PKR
//                 </Box>
//               </Flex>
//             </Flex>
//           ) : null}

//           <Center mb="40px">
//             <Button
//               fontWeight="semibold"
//               mt={7}
//               width="160px"
//               height="50px"
//               justifySelf="center"
//               fontSize="16px"
//               size="md"
//               borderRadius="30px"
//               bg={"purple.500"}
//               color={"white"}
//               _hover={{
//                 bg: "purple.600",
//               }}
//               onClick={() => {
//                 setOrderNowLoader(true);
//                 router.push("/");
//               }}
//             >
//               {orderNowLoader ? (
//                 <SimpleLoader
//                   text="Loading Page"
//                   color="white"
//                   loading={true}
//                 />
//               ) : (
//                 "Order Now"
//               )}
//             </Button>
//           </Center>
//         </>
//       )}
//       <Toast_Notification />
//     </Box>
//   );
// }
