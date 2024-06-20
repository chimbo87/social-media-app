import { Avatar, Divider, Flex,Text,Image, useColorModeValue } from "@chakra-ui/react";
import React from "react";

function MessageContainer() {
  return (
    <Flex
      flex="70"
      bg={useColorModeValue("gray.200", "gray.dark")}
      borderRadius={"md"}
      flexDirection={"column"}
      p={2}
    >
      <Flex w={"full"} h={12} alignItems={"center"} gap={2}>
        <Avatar src="" size={"sm"} />
        <Text display={"flex"} alignItems={"center"}>
          johndoe <Image src="/verified.png" w={5} h={4} ml={1} />
        </Text>
      </Flex>
      <Divider/>
      <Flex flexDir={"column"} gap={4} my={4}
      height={"400px"} overflowY={"scroll"}>

      </Flex>
    </Flex>
  );
}

export default MessageContainer;
