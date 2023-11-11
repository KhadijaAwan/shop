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
} from "@chakra-ui/react";
import Image from "next/image";
import { signup } from "../../../../public/export";
import { registerForm } from "@/theory";
import { useContext, useState, useEffect } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import FormElements from "@/components/formElements";
import { registerUser } from "@/services/register";
import { useRouter } from "next/navigation";
import SimpleLoader from "@/components/simpleLoader";
import { GlobalContext } from "@/context";
import { toast } from "react-toastify";
import Toast_Notification from "@/components/toastNotification";

const initial_Values = {
  username: "",
  email: "",
  password: "",
  role: "user",
};

interface RegisterData {
  username: string;
  email: string;
  password: string;
  role: string;
  [key: string]: string;
}

export default function Register() {
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

  async function handleRegister() {
    setItemsLoader({ load: true, id: "" });
    const data = await registerUser(registerData);
    if (data.success) {
      toast.success(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setItemsLoader({ load: false, id: "" });
      router.push("/pages/login");
      setRegisterData(initial_Values);
    } else {
      setItemsLoader({ load: false, id: "" });
      toast.error(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setRegisterData(initial_Values);
    }
  }

  useEffect(() => {
    if (authUser) {
      router.push("/");
    }
  }, [authUser]);

  return (
    <Flex direction={{ base: "column", md: "row" }} pt={20}>
      {/* The Image Section */}
      <Box display={{ base: "none", md: "flex" }} width={{md:"80%", xl:"100%"}}>
        <Image src={signup} alt="Signup Picture" />
      </Box>

      {/* The Content Section */}
      <Box width="100%">
        <Stack py={10} px={{ base: "10", md: "20" }}>
          <Heading fontSize="4xl" mb={8}>
            Sign Up
          </Heading>

          {registerForm.map((r) => (
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
          <FormElements
            disabled={!formEmpty}
            onClick={handleRegister}
            pageName={
              itemsLoader && itemsLoader.load ? (
                <SimpleLoader text="Sign Up" color="white" loading={true} />
              ) : (
                "Sign Up"
              )
            }
            pageLinkName="Already have an account?"
            pageDestinationName="/pages/login"
            pageDestination="Login"
          />
        </Stack>
        <Toast_Notification />
      </Box>
    </Flex>
  );
}
