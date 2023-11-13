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
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { GlobalContext } from "@/context";
import { useContext, useEffect, useState } from "react";
import SimpleLoader from "@/components/simpleLoader";
import { toast } from "react-toastify";
import { gettingAdminOrders } from "@/services/order/adminOrders";
import { updatingAdminOrders } from "@/services/order/updateOrders";
import Toast_Notification from "@/components/toastNotification";
import HashLoader from "react-spinners/HashLoader";

interface OrdersLoaders {
  [orderId: string]: boolean;
}
export const dynamic = "force-dynamic";

export default function AdminPanel() {
  const router = useRouter();
  const [adminLoad, setAdminLoad] = useState(false);
  const [ordersLoaders, setOrdersLoaders] = useState<OrdersLoaders>({});
  const [userAllOrders, setUserAllOrders] = useState(null);
  const [viewordersLoaders, setViewOrdersLoaders] = useState<OrdersLoaders>({});
  const {
    user,
    allOrders,
    setAllOrders,
    adminOrderView,
    setAdminOrderView,
  } = useContext(GlobalContext);

  useEffect(() => {
    setAdminLoad(true);
    setTimeout(() => {
      setAdminLoad(false);
    }, 1500);
  }, []);

  async function getAllOrdersDetails() {
    const response = await gettingAdminOrders();

    console.log(response);

    if (response.success) {
      setAllOrders(
        response.data && response.data.length
          ? response.data.filter((r: any) => r.user._id !== user._id)
          : []
      );
      toast.success(response.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.log(allOrders);
    } else {
      toast.error(response.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }

  async function handleUpdateOrderDetails(updateOrder: any) {
    setOrdersLoaders({ ...ordersLoaders, [updateOrder._id]: true });
    const response = await updatingAdminOrders({
      ...updateOrder,
      isProcessing: false,
    });
    console.log(response);

    if (response?.success) {
      setTimeout(() => {
        setOrdersLoaders({ ...ordersLoaders, [updateOrder._id]: false });
      }, 1700);
      getAllOrdersDetails();
      toast.success(response.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      setOrdersLoaders({ ...ordersLoaders, [updateOrder._id]: false });
      toast.error(response.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }

  function handleViewOrdersDetails(orderId: any) {
    setAdminOrderView(orderId);
    console.log(adminOrderView);
    setViewOrdersLoaders({ ...viewordersLoaders, [orderId._id]: true });
    router.push(`/pages/adminPanel/adminOrders`);
    setTimeout(() => {
      setViewOrdersLoaders({ ...viewordersLoaders, [orderId._id]: false });
    }, 2000);
  }

  useEffect(() => {
    if (user !== null) {
      getAllOrdersDetails();
    }
  }, [user]);

  return (
    <Box width="100%" pt={10}>
      <Heading mt={20} mb={4} textAlign="center" color="gray.700" fontFamily="poppins">
        All Orders Details
      </Heading>

      {adminLoad ? (
        <Center height="60vh">
          <HashLoader
            color="#9a6abf"
            loading={adminLoad}
            size={60}
            aria-label="Loading Spinner"
          />
        </Center>
      ) : (
      <Center>
        <SimpleGrid spacingY="34px" width="100%" mx="auto" columns={1}>
          <Flex
            width={{ base: "", md: "90%", xl: "85%" }}
            alignItems="center"
            py={16}
            direction="column"
            mx="auto"
          >
            {allOrders && allOrders.length ? (
              allOrders.map((a: any) => (
                <Card
                  key={a._id}
                  bg="gray.100"
                  p={6}
                  direction="column"
                  mb={4}
                  width={{base:"94%", md:"100%"}}
                >
                  <Stack>
                    <Text fontWeight="semibold" mb={2}>
                      Order no: {a._id}
                    </Text>
                    <Flex direction={{base:"column", md:"row"}} justifyContent="space-between" mb={1}>
                      <Box>
                        <Text color="gray.500" fontSize="xs" mb={1}>
                          <Code fontWeight="semibold" color="gray.600">
                            Order Date:
                          </Code>{" "}
                          {a.createdAt.split("T")[0]} |{" "}
                          {a.createdAt.split("T")[1].split(".")[0]}
                        </Text>
                        <Text color="gray.500" fontSize="xs">
                          <Code fontWeight="semibold" color="gray.600">
                            Order Status:
                          </Code>{" "}
                          {a.isProcessing ? "In progress" : "Delivered"}
                        </Text>
                      </Box>
                      <Box mt={{base:"1", md:"0"}}>
                        <Text color="gray.500" fontSize="xs" mb={1}>
                          <Code fontWeight="semibold" color="gray.600">
                            Delivered:
                          </Code>{" "}
                          {a.isProcessing ? "No" : "Yes"}
                        </Text>
                        <Text color="gray.500" fontSize="xs">
                          <Code fontWeight="semibold" color="gray.600">
                            Total Price:
                          </Code>{" "}
                          {a.totalPrice}
                        </Text>
                      </Box>
                    </Flex>
                    <Flex
                      direction="row"
                      justifyContent="space-between"
                      mb={2}
                      px={2}
                    >
                      <Button
                        mt={{base:"12px", md:"20px"}}
                        size="sm"
                        fontSize="14px"
                        colorScheme="green"
                        variant="solid"
                        onClick={() => {
                          handleUpdateOrderDetails(a);
                        }}
                      >
                        {ordersLoaders[a._id] ? (
                          <SimpleLoader
                            text="Updating"
                            color="white"
                            loading={true}
                          />
                        ) : (
                          "Update Status"
                        )}
                      </Button>
                      <Button
                        mt={{base:"12px", md:"20px"}}
                        size="sm"
                        fontSize="14px"
                        colorScheme="purple"
                        variant="solid"
                        onClick={() => {
                          handleViewOrdersDetails(a);
                        }}
                      >
                        {viewordersLoaders[a._id] ? (
                          <SimpleLoader
                            text="Loading Page"
                            color="white"
                            loading={true}
                          />
                        ) : (
                          "View Details"
                        )}
                      </Button>
                    </Flex>
                  </Stack>
                </Card>
              ))
            ) : (
              <Box>No order Found</Box>
            )}
          </Flex>
        </SimpleGrid>
      </Center>
      )}
      <Toast_Notification />
    </Box>
  );
}
