"use client";
import {
  Box,
  Flex,
  Text,
  Stack,
  Button,
  Heading,
  Card,
  Center,
} from "@chakra-ui/react";
import { GlobalContext } from "@/context";
import { useContext, useEffect, useState } from "react";
import { accountItems } from "@/theory";
import { useRouter } from "next/navigation";
import SimpleLoader from "@/components/simpleLoader";
import { toast } from "react-toastify";
import Toast_Notification from "@/components/toastNotification";
import { gettingAddress } from "@/services/address/get_Address";
import { deletingAddress } from "@/services/address/delete_Address";
import { gettingOrders } from "@/services/order/getOrders";
import HashLoader from "react-spinners/HashLoader";
export const dynamic = "force-dynamic";

export default function Profile() {
  const [addressLoad, setAddressLoad] = useState(false);

  const {
    user,
    userAddress,
    setUserAddress,
    cartProducts,
    userOrders,
    setUserOrders,
    itemsLoader,
    setItemsLoader,
    setUpdatedAddress,
    selectAddress,
    setSelectAddress,
    checkoutData,
    setCheckoutData,
  } = useContext(GlobalContext);

  const router = useRouter();
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [updateLoader, setUpdateLoader] = useState(false);
  const [proceedLoader, setProceedLoader] = useState(false);
  const [viewOrdersLoader, setViewOrdersLoader] = useState(false);

  const isButtonEnabled = cartProducts.length > 0 && selectAddress !== null;

  // Function to get Address
  async function handle_getAddress() {
    const response = await gettingAddress(user?._id);
    if (response.success) {
      await setUserAddress(response.data);
    }
  }

  // Function to delete Address
  async function handleAddressDelete(content: string) {
    setDeleteLoader(true);

    setTimeout(() => 1000);

    const data = await deletingAddress(content);

    if (data.success) {
      setItemsLoader({ load: false, id: "" });
      setDeleteLoader(false);
      toast.success(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      handle_getAddress();
    } else {
      setDeleteLoader(false);
      toast.error(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }

  // Function to Select Address
  function handleSelectAddress(choose_address: any) {
    console.log(choose_address);
    console.log(checkoutData);

    if (choose_address._id === selectAddress) {
      setSelectAddress(null);
      setCheckoutData({
        ...checkoutData,
        shippingAddress: {},
      });

      return;
    }

    setSelectAddress(choose_address?._id);

    setCheckoutData((prevData: any) => {
      const updatedData = {
        ...prevData,
        shippingAddress: {
          ...prevData.shippingAddress,
          clientName: choose_address.clientName,
          country: choose_address.country,
          city: choose_address.city,
          address: choose_address.address,
          postalCode: choose_address.postalCode,
        },
      };

      localStorage.setItem("checkout_Data", JSON.stringify(updatedData));
      localStorage.setItem("deliveryAddress", JSON.stringify(choose_address));
      return updatedData;
    });
  }

  async function retreiveOrders() {
    const response = await gettingOrders(user?._id);
    setUserOrders(response.data);
  }

  useEffect(() => {
    if (user !== null) {
      setUpdatedAddress(null);
      handle_getAddress();
      retreiveOrders();
      console.log(selectAddress);
      console.log(cartProducts);
      console.log(userOrders);
    }
  }, [user, selectAddress]);

  useEffect(() => {
    setAddressLoad(true);
    setTimeout(() => {
      setAddressLoad(false);
    }, 1500);
  }, []);

  return (
    <Box width="100%">

    {addressLoad ? (
        <Center height="80vh">
          <HashLoader
            color="#9a6abf"
            loading={addressLoad}
            size={60}
            aria-label="Loading Spinner"
          />
        </Center>
      ) : (
      <Box width={{ base: "330px", md: "90%" }} py={12} mx="auto">
        <Stack spacing={6} width="100%">
          <Heading mt={20} mb="36px" textAlign="center" fontFamily="poppins">
            Account Information
          </Heading>

          <Flex direction={{ base: "column", md: "row" }} width="100%">
            <Box
              width={{ base: "100%", md: "92%" }}
              mb={{ base: "45px", md: "0" }}
              mr={{ base: "0", md: "40px" }}
            >
              {accountItems.map((a) => (
                <Box key={a.id} mb={3}>
                  <Text color="gray.500" fontSize="14px" fontWeight="semibold">
                    {a.title}
                  </Text>
                  <Flex
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Text fontSize="14px">{user?.[a.link]}</Text>
                  </Flex>
                  <Box bg="gray.300" my={3} height="1px" width="100%"></Box>
                </Box>
              ))}

              {userOrders && userOrders.length > 0 ? (
                <Button
                  mt="20px"
                  size="sm"
                  color="gray.50"
                  bg="gray.900"
                  _hover={{ bg: "gray.600" }}
                  mr="20px"
                  onClick={() => {
                    setViewOrdersLoader(true);
                    router.push("/pages/orders");
                  }}
                >
                  {viewOrdersLoader ? (
                    <SimpleLoader
                      text="Loading Orders"
                      color="white"
                      loading={true}
                    />
                  ) : (
                    "View Orders"
                  )}
                </Button>
              ) : null}

              <Button
                isDisabled={!isButtonEnabled}
                mt="20px"
                size="sm"
                colorScheme="teal"
                variant="solid"
                opacity={
                  cartProducts &&
                  cartProducts.length > 0 &&
                  selectAddress !== null
                    ? 1
                    : 0.5
                }
                onClick={() => {
                  setProceedLoader(true);
                  router.push("/pages/checkout");
                }}
              >
                {proceedLoader ? (
                  <SimpleLoader
                    text="Proceeding"
                    color="white"
                    loading={true}
                  />
                ) : (
                  "Proceed To Checkout"
                )}
              </Button>
            </Box>

            <Box width="100%">
              <Flex
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                mb="15px"
                width="100%"
              >
                <Text fontSize="16px" fontWeight="semibold">
                  Address Details
                </Text>
                {userAddress && userAddress.length ? (
                  <Button
                    size="sm"
                    colorScheme="purple"
                    variant="solid"
                    onClick={() => {
                      setItemsLoader({ load: true, id: "" }),
                        router.push("/pages/address"),
                        setTimeout(() => {
                          setItemsLoader({ load: false, id: "" });
                        }, 2000);
                    }}
                  >
                    {itemsLoader &&
                    itemsLoader.load &&
                    deleteLoader === false ? (
                      <SimpleLoader
                        text="Loading Page"
                        color="white"
                        loading={true}
                      />
                    ) : (
                      "Add New Address"
                    )}
                  </Button>
                ) : null}
              </Flex>

              {userAddress && userAddress.length ? (
                userAddress.map((u: any) => (
                  <Card
                    key={u._id}
                    bg="purple.50"
                    p={6}
                    mb={6}
                    fontWeight="semibold"
                  >
                    <Text color="gray.700" mb={2}>
                      {u.clientName}
                    </Text>
                    <Text fontSize="xs" color="gray.500" mb={1.5}>
                      {u.country}
                    </Text>
                    <Text fontSize="xs" color="gray.500" mb={1.5}>
                      {u.city}
                    </Text>
                    <Text fontSize="xs" color="gray.500" mb={1.5}>
                      {u.address}
                    </Text>
                    <Text fontSize="xs" color="gray.500" mb={2}>
                      {u.postalCode}
                    </Text>

                    <Flex mt={2}>
                      <Button
                        size="sm"
                        colorScheme="green"
                        variant="solid"
                        fontSize="13px"
                        mr={3}
                        onClick={() => {
                          setUpdateLoader(true);
                          setUpdatedAddress(u);
                          router.push("/pages/address");
                        }}
                      >
                        {updateLoader ? (
                          <SimpleLoader
                            text="Loading Page"
                            color="white"
                            loading={true}
                          />
                        ) : (
                          "Update"
                        )}
                      </Button>
                      <Button
                        size="sm"
                        colorScheme="red"
                        variant="solid"
                        fontSize="13px"
                        mr={3}
                        onClick={() => {
                          setItemsLoader({ load: true, id: u._id }),
                            handleAddressDelete(u._id);
                        }}
                      >
                        {deleteLoader && itemsLoader.id === u._id ? (
                          <SimpleLoader
                            text="Deleting"
                            color="white"
                            loading={true}
                          />
                        ) : (
                          "Delete"
                        )}
                      </Button>
                      <Button
                        size="sm"
                        colorScheme={u._id === selectAddress ? "blue" : "gray"}
                        variant="solid"
                        fontSize="13px"
                        onClick={() => {
                          handleSelectAddress(u);
                        }}
                      >
                        {u._id === selectAddress ? "Selected" : "Select"}
                      </Button>
                    </Flex>
                  </Card>
                ))
              ) : (
                <Flex
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Text fontSize="14px" color="gray.500" mb="15px">
                    Please add your address
                  </Text>
                  <Button
                    size="sm"
                    colorScheme="purple"
                    variant="solid"
                    onClick={() => {
                      setItemsLoader({ load: true, id: "" }),
                        router.push("/pages/address"),
                        setTimeout(() => {
                          setItemsLoader({ load: false, id: "" });
                        }, 2000);
                    }}
                  >
                    {itemsLoader && itemsLoader.load ? (
                      <SimpleLoader
                        text="Loading Page"
                        color="white"
                        loading={true}
                      />
                    ) : (
                      "Add New Address"
                    )}
                  </Button>
                </Flex>
              )}
            </Box>
          </Flex>
        </Stack>
        <Toast_Notification />
      </Box>
      )}
    </Box>
  );
}
