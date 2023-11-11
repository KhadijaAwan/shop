"use client";

import {
  Flex,
  Box,
  Stack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Button,
  InputRightElement,
  Center,
} from "@chakra-ui/react";
import { registerAdminForm } from "@/theory";
import { useContext, useState, useEffect } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { registerAdmin } from "@/services/admin";
import { useRouter } from "next/navigation";
import SimpleLoader from "@/components/simpleLoader";
import { GlobalContext } from "@/context";
import { toast } from "react-toastify";
import Toast_Notification from "@/components/toastNotification";

const initial_Values = {
  username: "",
  email: "",
  password: "",
  role: "admin",
};

interface RegisterData {
  username: string;
  email: string;
  password: string;
  role: string;
  [key: string]: string;
}

export default function RegisterAdmin() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { itemsLoader, setItemsLoader, authUser } = useContext(GlobalContext);
  const [registerData, setRegisterData] =
    useState<RegisterData>(initial_Values);

  console.log(registerData);

  function formEmpty() {
    return registerData &&
      registerData.username &&
      registerData.username.trim() !== "" &&
      registerData.email &&
      registerData.email.trim() !== "" &&
      registerData.password &&
      registerData.password.trim() !== ""
      ? true
      : false;
  }

  async function handleAdminRegister() {
    setItemsLoader({ load: true, id: "" });
    const data = await registerAdmin(registerData);
    if (data.success) {
      toast.success(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setItemsLoader({ load: false, id: "" });
      setTimeout(() => {
        router.push("/pages/adminPanel");
      }, 1000);
      setRegisterData(initial_Values);
    } else {
      setItemsLoader({ load: false, id: "" });
      toast.error(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setRegisterData(initial_Values);
    }
  }

  return (
    <Flex direction={{ base: "column", md: "row" }} pt={32} pb={20}>
      {/* The Content Section */}
      <Box width={{ base: "90%", md: "80%", lg: "60%" }} mx="auto">
        <Stack py={10} px={{ base: "10", lg: "20" }}>
          <Heading fontSize="4xl" mb={16} textAlign="center">
            Admin Registration
          </Heading>

          {registerAdminForm.map((r) => (
            <FormControl mb={3} key={r.id} isRequired>
              <FormLabel color="gray.600">{r.label}</FormLabel>
              {r.type === "password" ? (
                <InputGroup>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    onChange={(event) => {
                      setRegisterData({
                        ...registerData,
                        [r.id]: event.target.value,
                      });
                    }}
                    value={registerData.password}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              ) : (
                <Input
                  type={r.type}
                  onChange={(event) => {
                    setRegisterData({
                      ...registerData,
                      [r.id]: event.target.value,
                    });
                  }}
                  value={registerData[r.id]}
                />
              )}
            </FormControl>
          ))}
        </Stack>

        <Center>
          <Button
            disabled={!formEmpty}
            onClick={handleAdminRegister}
            width="150px"
            bg="purple.500"
            color="gray.50"
            borderRadius="30px"
            _hover={{ color: "white", bg: "purple.600" }}
          >
            {itemsLoader && itemsLoader.load ? (
              <SimpleLoader text="Registering" color="white" loading={true} />
            ) : (
              "Add Admin"
            )}
          </Button>
        </Center>
        <Toast_Notification />
      </Box>
    </Flex>
  );
}
