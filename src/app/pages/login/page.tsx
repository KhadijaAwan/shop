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
import Cookies from "js-cookie";
import { signin } from "../../../../public/export";
import { loginForm } from "@/theory";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useContext, useEffect, useState } from "react";
import FormElements from "@/components/formElements";
import { loginUser } from "@/services/login";
import { GlobalContext } from "@/context";
import { useRouter } from "next/navigation";
import SimpleLoader from "@/components/simpleLoader";
import { toast } from "react-toastify";
import Toast_Notification from "@/components/toastNotification";

const initial_Values = {
  email: "",
  password: "",
};

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState(initial_Values);
  const { authUser, setAuthUser, user, setUser, itemsLoader, setItemsLoader } =
    useContext(GlobalContext);

  console.log(loginData);

  function formEmpty() {
    return loginData &&
      loginData.email &&
      loginData.email.trim() !== "" &&
      loginData.password &&
      loginData.password.trim() !== ""
      ? true
      : false;
  }

  async function handleLogin() {
    setItemsLoader({ load: true, id: "" });
    const data = await loginUser(loginData);
    if (data.success) {
      toast.success(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setAuthUser(true);
      setUser(data?.userData?.user);
      setLoginData(initial_Values);
      Cookies.set("token", data?.userData?.token);
      localStorage.setItem("user", JSON.stringify(data?.userData?.user));
      setItemsLoader({ load: false, id: "" });
    } else {
      setAuthUser(false);
      setItemsLoader({ load: false, id: "" });
      toast.error(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }

  console.log(authUser, user);

  useEffect(() => {
    if (authUser) {
      router.push("/");
    }
  }, [authUser]);

  return (
    <Flex direction={{ base: "column", md: "row" }} pt={20}>
      {/* The Image Section */}
      <Box
        display={{ base: "none", md: "flex" }}
        width={{ md: "80%", xl: "100%" }}
      >
        <Image src={signin} alt="Signup Picture" />
      </Box>

      <Box width="100%">
        <Stack py={10} px={{ base: "10", md: "20" }}>
          <Heading fontSize="4xl" mb={8}>
            Sign In
          </Heading>
          {loginForm.map((l) => (
            <FormControl mb={3} key={l.id} isRequired>
              <FormLabel color="gray.600">{l.label}</FormLabel>
              {l.type === "password" ? (
                <InputGroup>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    onChange={(event) => {
                      setLoginData({
                        ...loginData,
                        [l.id]: event.target.value,
                      });
                    }}
                    value={loginData.password}
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
                  type={l.type}
                  onChange={(event) => {
                    setLoginData({
                      ...loginData,
                      [l.id]: event.target.value,
                    });
                  }}
                  value={loginData.email}
                />
              )}
            </FormControl>
          ))}
          <FormElements
            disabled={!formEmpty}
            onClick={handleLogin}
            pageName={
              itemsLoader && itemsLoader.load ? (
                <SimpleLoader text="Login" color="white" loading={true} />
              ) : (
                "Sign In"
              )
            }
            pageLinkName="Don't have an account?"
            pageDestinationName="/pages/register"
            pageDestination="Sign up"
          />
        </Stack>
        <Toast_Notification />
      </Box>
    </Flex>
  );
}
