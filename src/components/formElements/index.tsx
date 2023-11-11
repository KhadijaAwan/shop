"use client";

import { Text, Button, Link } from "@chakra-ui/react";
import { NextPage } from "next";
import NextLink from "next/link";

interface Props {
  disabled: boolean;
  onClick: any;
  pageName: any;
  pageLinkName: string;
  pageDestination: string;
  pageDestinationName: string;
}

const FormElements: NextPage<Props> = ({
  onClick,
  disabled,
  pageName,
  pageLinkName,
  pageDestination,
  pageDestinationName,
}) => {
  return (
    <>
      <Button
        fontWeight="semibold"
        mt={7}
        width="160px"
        style={{ opacity: disabled ? 0.3 : 1 }}
        fontSize="16px"
        size="lg"
        bg={"purple.500"}
        color={"white"}
        onClick={onClick}
        isDisabled={disabled}
        _hover={{
          bg: "purple.600",
        }}
        _disabled={{
          opacity: 0.3,
          cursor: "not-allowed",
        }}
      >
        {pageName}
      </Button>
      <Text color="gray.500" fontSize="14px">
        {pageLinkName}
        <Link
          pl="5px"
          color="purple.400"
          as={NextLink}
          href={pageDestinationName}
          _hover={{ textTransform: "none", color: "purple.600" }}
        >
          {pageDestination}
        </Link>
      </Text>
    </>
  );
};

export default FormElements;
