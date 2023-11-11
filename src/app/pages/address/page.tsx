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
  Heading,
  Card,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Center,
} from "@chakra-ui/react";
import { GlobalContext } from "@/context";
import { useContext, useEffect, useState } from "react";
import { addAddressInfo } from "@/theory";
import SimpleLoader from "@/components/simpleLoader";
import Toast_Notification from "@/components/toastNotification";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { updatingAddress } from "@/services/address/update_Address";
import { addingAddress } from "@/services/address/add_Address";
import { gettingAddress } from "@/services/address/get_Address";

export default function DeliveryAddress() {
  const {
    user,
    userAddress,
    setUserAddress,
    addressData,
    setAddressData,
    itemsLoader,
    setItemsLoader,
    updatedAddress,
    setUpdatedAddress,
  } = useContext(GlobalContext);

  const router = useRouter();
  const [update, setUpdate] = useState(null);

  console.log(updatedAddress);

  useEffect(() => {
    if (updatedAddress !== null) {
      setUpdate(updatedAddress);
      setAddressData(updatedAddress);
    } else {
      setUpdate(null);
    }
  }, [updatedAddress]);

  console.log(update);

  // Function to add new address and for updation
  async function handle_Address() {
    setItemsLoader({ load: true, id: "" });

    const data =
      update !== null
        ? await updatingAddress({ ...addressData, _id: update })
        : await addingAddress({ ...addressData, userId: user?._id });

    console.log(data);

    if (data.success) {
      toast.success(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });

      setItemsLoader({ load: false, id: "" });
      setUpdate(null);
      setAddressData({
        clientName: "",
        country: "",
        city: "",
        address: "",
        postalCode: "",
      });
      setUpdatedAddress(null);
      setTimeout(() => {
        router.push("/pages/profile");
      }, 1000);
    } else {
      setItemsLoader({ load: false, id: "" });
      toast.error(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setAddressData({
        clientName: "",
        country: "",
        city: "",
        address: "",
        postalCode: "",
      });
    }
  }

  return (
    <Box width={{ base: "330px", md: "500px" }} pt={36} pb={12} mx="auto">
      <Stack spacing={6}>
        <Heading mb="25px" textAlign="center">
          Address Details
        </Heading>

        <Box width="100%">
          {addAddressInfo.map((a) => (
            <FormControl key={a.id} isRequired mt={6}>
              <FormLabel>{a.label}</FormLabel>
              {a.componentType === "input" ? (
                <Input
                  type={a.type}
                  placeholder={a.placeholder}
                  value={addressData[a.id]}
                  onChange={(event) => {
                    setAddressData({
                      ...addressData,
                      [a.id]: event.target.value,
                    });
                  }}
                />
              ) : (
                <Textarea
                  placeholder={a.placeholder}
                  value={addressData[a.id]}
                  onChange={(event) => {
                    setAddressData({
                      ...addressData,
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
            onClick={handle_Address}
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
                text={update !== null ? "Updating Address" : "Adding Address"}
                color="white"
                loading={true}
              />
            ) : update !== null ? (
              "Update Address"
            ) : (
              "Add Address"
            )}
          </Button>
        </Center>
        
        <Toast_Notification />
      </Stack>
    </Box>
  );
}
