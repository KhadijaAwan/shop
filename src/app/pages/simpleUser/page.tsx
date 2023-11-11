"use client";

import { Flex, Text } from "@chakra-ui/react";

export default function SimpleUser() {
  return (
    <Flex width="100%" height="70vh" alignItems="center">
      <Flex
        width={{ base: "90%", md: "75%" }}
        borderRadius="20px"
        bg="purple.400"
        color="gray.50"
        alignItems="center"
        justifyContent="center"
        justifySelf="center"
        direction="column"
        py="40px"
        mx="auto"
        fontWeight="medium"
      >
        <Text mb={3}>These routes requires Admin permissions</Text>
        <Text>You are not an Admin of the website</Text>
      </Flex>
    </Flex>
  );
}
