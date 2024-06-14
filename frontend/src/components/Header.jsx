import { Flex, useColorMode, Button, Link } from "@chakra-ui/react";
import React from "react";
import { CiLight } from "react-icons/ci";
import { CiDark } from "react-icons/ci";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/UserAtom";
import { TbHomeStar } from "react-icons/tb";
import {Link as RouterLink} from 'react-router-dom';
import { FiUser } from "react-icons/fi";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useRecoilValue(userAtom);

  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      mt={6}
      mb="12"
      bgColor={colorMode === "dark" ? "gray.800" : "gray.200"}
    >
      {user && (<Link as={RouterLink} to="/">
        <TbHomeStar size={24}/>
      </Link>)}
      <Button onClick={toggleColorMode} bg={"transparent"}>
        {colorMode === "dark" ? <CiDark size={24} /> : <CiLight size={24} />}
      </Button>
      {user && (<Link as={RouterLink} to={`/${user.username}`}>
        
        <FiUser  size={24}/>
      </Link>)}
    </Flex>
  );
};

export default Header;
