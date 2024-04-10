import { Flex, useColorMode } from "@chakra-ui/react";
import React from "react";
import { CiLight } from "react-icons/ci";
import { CiDark } from "react-icons/ci";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      justifyContent={"center"}
      mt={6}
      mb="12"
      bgColor={colorMode === "dark" ? "gray.800" : "gray.200"}
    >
      <button onClick={toggleColorMode} className="bg-transparent">
        {colorMode === "dark" ? <CiDark size={24} /> : <CiLight size={24} />}
      </button>
    </Flex>
  );
};

export default Header;
