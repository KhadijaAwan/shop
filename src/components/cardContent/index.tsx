"use client";
import { CldImage } from "next-cloudinary";
import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Badge,
  Flex,
  Text,
  Box,
  Center,
  SimpleGrid,
} from "@chakra-ui/react";
import CardButtons from "../cardButtons";
import { FC, useEffect } from "react";
import { useRouter } from "next/navigation";

const CardContent: FC<{ data: any[] }> = ({ data }) => {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, []);

  return (
    <Center>
      <Flex
        width={{ base: "", md: "", lg: "95%", xl: "90%" }}
        alignItems="center"
        py={16}
        mt={20}
      >
        <SimpleGrid
          spacingY="34px"
          spacingX="25px"
          width="100%"
          mx="auto"
          columns={{ base: 1, md: 2, lg: 3, xl: 4 }}
        >
          {data && data.length ? (
            data.map((a: any) => (
              <Card
                key={a._id}
                cursor="pointer"
                width="280px"
                maxH="sm"
                position="relative"
                bg="orange.100"
                borderRadius="10px"
              >
                <CardHeader
                // onClick={() => router.push(`/pages/productInfo/${a._id}`)}
                >
                  <Box
                    width="200px"
                    height="200px"
                    position="absolute"
                    top="0"
                    left="0"
                  >
                    <CldImage
                      width="280"
                      height="100"
                      style={{
                        maxWidth: "280px",
                        maxHeight: "200px",
                        borderTopLeftRadius: "10px",
                        borderTopRightRadius: "10px",
                      }}
                      src={a.imageUrl}
                      sizes="100vw"
                      alt="Product Image"
                    />
                  </Box>
                  {a.onSale === "Yes" ? (
                    <Badge
                      textTransform="capitalize"
                      fontWeight="normal"
                      colorScheme="green"
                      position="absolute"
                      top="10px"
                      left="10px"
                      borderRadius="30px"
                      bg="black"
                      color="white"
                      px={3}
                      py={2}
                    >
                      Sale
                    </Badge>
                  ) : null}

                  <Badge
                    textTransform="capitalize"
                    colorScheme="green"
                    position="absolute"
                    top="10px"
                    right="10px"
                    borderRadius="30px"
                    bg="purple.600"
                    color="gray.200"
                    px={3}
                    py={2}
                  >
                    {a.price} PKR
                  </Badge>
                  <CardBody mt="180px">
                    <Heading size="md" textAlign="center">
                      {a.name}
                    </Heading>
                  </CardBody>
                </CardHeader>
                <Box mt="-18px" mb="20px" mx="auto">
                  <CardButtons items={a} />
                </Box>
              </Card>
            ))
          ) : (
            <Text>No Product is added yet</Text>
          )}
        </SimpleGrid>
      </Flex>
    </Center>
  );
};

export default CardContent;
