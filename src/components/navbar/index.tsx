"use client";
import {
  Box,
  Flex,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Spacer,
  useDisclosure,
  IconButton,
  Collapse,
  Button,
} from "@chakra-ui/react";
import NextLink from "next/link";
import Cookies from "js-cookie";
import { MdAccountCircle } from "react-icons/md";
import { CgSearch } from "react-icons/cg";
import { BsCart } from "react-icons/bs";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { AdminNavItems, UserNavItems, authItems } from "./../../theory/index";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@/context";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const [scrollY, setScrollY] = useState(0);
  const [bgColor, setBgColor] = useState("transparent");
  const router = useRouter();
  const pathUrl = usePathname();
  const { isOpen, onToggle } = useDisclosure();
  const {
    user,
    authUser,
    setUser,
    setAuthUser,
    updatedProduct,
    setUpdatedProduct,
  } = useContext(GlobalContext);

  console.log(pathUrl);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (scrollY > 100) {
      setBgColor("purple.100");
    } else {
      setBgColor("gray.100");
    }
  }, [scrollY]);

  useEffect(() => {
    if (pathUrl !== "pages/adminPanel/addProduct" && updatedProduct !== null) {
      setUpdatedProduct(null);
    }
  }, [pathUrl]);

  function handleLogout() {
    setAuthUser(false);
    setUser(null);
    Cookies.remove("token");
    localStorage.clear();
    router.push("/pages/login");
  }

  const isAdmin = pathUrl.includes("pages/adminPanel");

  return (
    <Box width="100%" position="fixed" zIndex={8}>
      <Box
        width="100%"
        px={{ md: "10px", lg: "20px", xl: "90px" }}
        py="20px"
        bg={bgColor}
        position="relative"
      >
        {/* Large Screen Header */}
        <Flex display={{ base: "none", lg: "flex" }} alignItems="center">
          <Link as={NextLink} href="/" _hover={{ textTransform: "none" }}>
            <Text fontSize={{ lg: "16px", xl: "lg" }} fontWeight="bold" mr={3}>
              Shopping Corner
            </Text>
          </Link>
          <Spacer />

          <Flex alignItems="center">
            <Flex minWidth="290px">
              {isAdmin
                ? AdminNavItems.map((a) => (
                    <Link
                      key={a.id}
                      id={a.id}
                      as={NextLink}
                      href={a.link}
                      mr={{ md: "25px", xl: "30px" }}
                      _hover={{
                        textTransform: "none",
                        fontWeight: "500",
                        transition: "all",
                        transitionDuration: "0.2s",
                      }}
                    >
                      {a.title}
                    </Link>
                  ))
                : UserNavItems.map((u) => (
                    <Link
                      key={u.id}
                      id={u.id}
                      as={NextLink}
                      href={u.link}
                      mr={{ md: "35px", xl: "50px" }}
                      _hover={{
                        textTransform: "none",
                        fontWeight: "500",
                        transition: "all",
                        transitionDuration: "0.2s",
                      }}
                    >
                      {u.title}
                    </Link>
                  ))}
            </Flex>

            <Spacer />

            {user?.role === "admin" ? (
              isAdmin ? (
                <Link
                  as={NextLink}
                  href="/"
                  ml="40px"
                  mr="15px"
                  bg="gray.800"
                  color="gray.100"
                  borderRadius="15px"
                  px="20px"
                  py="8px"
                  _hover={{
                    textTransform: "none",
                    fontWeight: "500",
                    transition: "all",
                    transitionDuration: "0.2s",
                    color: "white",
                  }}
                >
                  Client
                </Link>
              ) : (
                <Link
                  as={NextLink}
                  href="/pages/adminPanel"
                  ml="40px"
                  mr="15px"
                  bg="gray.800"
                  color="gray.100"
                  borderRadius="15px"
                  px="20px"
                  py="8px"
                  _hover={{
                    color: "white",
                    textTransform: "none",
                    fontWeight: "500",
                    transition: "all",
                    transitionDuration: "0.2s",
                  }}
                >
                  Admin
                </Link>
              )
            ) : null}

            {authUser ? (
              <>
                <Button
                  fontWeight="normal"
                  mr="20px"
                  bg="purple.500"
                  color="gray.100"
                  borderRadius="15px"
                  px="20px"
                  py="8px"
                  onClick={handleLogout}
                  _hover={{
                    bg: "purple.600",
                    color: "white",
                    textTransform: "none",
                    fontWeight: "500",
                    transition: "all",
                    transitionDuration: "0.2s",
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              authItems.map((a) => (
                <Link
                  key={a.id}
                  as={NextLink}
                  href={a.link}
                  mr="20px"
                  bg="purple.500"
                  color="gray.100"
                  borderRadius="15px"
                  px="20px"
                  py="8px"
                  _hover={{
                    bg: "purple.600",
                    color: "white",
                    textTransform: "none",
                    fontWeight: "500",
                    transition: "all",
                    transitionDuration: "0.2s",
                  }}
                >
                  {a.title}
                </Link>
              ))
            )}
          </Flex>

          <Spacer />

          <Link
            as={NextLink}
            href="/pages/profile"
            mr="12px"
            h="22px"
            p="3px"
            w="22px"
          >
            <MdAccountCircle />
          </Link>
          <Link
            as={NextLink}
            href="/pages/cart"
            mr="15px"
            h="22px"
            p="3px"
            w="20px"
          >
            <BsCart />
          </Link>
        </Flex>

        {/* Mobile Screen Header */}
        <Flex display={{ base: "flex", lg: "none" }} alignItems="center" px={4}>
          <Link as={NextLink} href="/" _hover={{ textTransform: "none" }}>
            <Text fontSize="md" fontWeight="bold" mr={3}>
              Shopping Corner
            </Text>
          </Link>

          <Spacer />
          <Link
            as={NextLink}
            href="/pages/profile"
            mr="8px"
            h="22px"
            p="3px"
            w="22px"
          >
            <MdAccountCircle />
          </Link>
          <Link as={NextLink} href="/pages/cart" h="22px" p="3px" w="20px">
            <BsCart />
          </Link>

          <IconButton
            aria-label="Toggle Menu"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            onClick={onToggle}
            bg={bgColor}
            _hover={{
              bg: bgColor,
            }}
          />
          <Collapse in={isOpen}>
            <Flex
              direction="column"
              w="full"
              position="absolute"
              top="100%"
              left="0"
              maxHeight="270px"
              bg="gray.200"
              p={5}
              color="black"
              boxShadow="md"
              borderBottomRadius="md"
              textAlign="center"
            >
              {isAdmin
                ? AdminNavItems.map((a) => (
                    <Link
                      key={a.id}
                      as={NextLink}
                      href={a.link}
                      mb="10px"
                      _hover={{
                        textTransform: "none",
                        fontWeight: "500",
                        transition: "all",
                        transitionDuration: "0.2s",
                      }}
                      fontSize="14px"
                    >
                      {a.title}
                    </Link>
                  ))
                : UserNavItems.map((u) => (
                    <Link
                      key={u.id}
                      as={NextLink}
                      href={u.link}
                      mb="10px"
                      _hover={{ textTransform: "none", fontWeight: "semibold" }}
                      fontSize="14px"
                    >
                      {u.title}
                    </Link>
                  ))}

              <Box width="300px" mx="auto">
                <Box my="20px">
                  {user?.role === "admin" ? (
                    isAdmin ? (
                      <Link
                        as={NextLink}
                        href="/"
                        mx="40px"
                        bg="gray.800"
                        color="gray.100"
                        borderRadius="8px"
                        px="20px"
                        py="10px"
                        _hover={{
                          textTransform: "none",
                          fontWeight: "500",
                          transition: "all",
                          transitionDuration: "0.2s",
                          color: "white",
                        }}
                      >
                        Client
                      </Link>
                    ) : (
                      <Link
                        as={NextLink}
                        href="/pages/adminPanel"
                        mx="40px"
                        bg="gray.800"
                        color="gray.100"
                        borderRadius="8px"
                        px="20px"
                        py="10px"
                        _hover={{
                          color: "white",
                          textTransform: "none",
                          fontWeight: "500",
                          transition: "all",
                          transitionDuration: "0.2s",
                        }}
                      >
                        Admin
                      </Link>
                    )
                  ) : null}
                </Box>

                {authUser ? (
                  <>
                    <Button
                      fontWeight="normal"
                      mx="20px"
                      bg="purple.500"
                      color="gray.100"
                      borderRadius="10px"
                      px="20px"
                      py="10px"
                      onClick={handleLogout}
                      _hover={{
                        bg: "purple.600",
                        color: "white",
                        textTransform: "none",
                        fontWeight: "500",
                        transition: "all",
                        transitionDuration: "0.2s",
                      }}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  authItems.map((a) => (
                    <Link
                      key={a.id}
                      as={NextLink}
                      href={a.link}
                      mr="20px"
                      bg="purple.500"
                      color="gray.100"
                      borderRadius="10px"
                      px="20px"
                      py="10px"
                      _hover={{
                        bg: "purple.600",
                        color: "white",
                        textTransform: "none",
                        fontWeight: "500",
                        transition: "all",
                        transitionDuration: "0.2s",
                      }}
                    >
                      {a.title}
                    </Link>
                  ))
                )}
              </Box>
            </Flex>
          </Collapse>
        </Flex>
      </Box>
    </Box>
  );
}
