"use client";
import { Flex, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import { PulseLoader } from "react-spinners";

interface Props {
  text: string;
  color: string;
  loading: boolean;
}

const SimpleLoader: NextPage<Props> = ({ text, color, loading }) => {
  return (
    <Flex alignItems="center">
      <Text mr="5px">{text}</Text>
      <PulseLoader
        color={color}
        loading={loading}
        size={4}
        data-testid="loader"
      />
    </Flex>
  );
};

export default SimpleLoader;
