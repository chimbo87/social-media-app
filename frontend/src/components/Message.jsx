import { Avatar, Flex, Text } from "@chakra-ui/react";
import React from "react";

function Message({ ownMessage }) {
  return (
    <>
      {ownMessage ? (
        <Flex gap={2} alignSelf={"flex-end"}>
          <Text maxW={"350px"} bg={"blue.400"} p={1} borderRadius={"md"}>
            It is a long established fact that a reader will be distracted by
            the readable
          </Text>
          <Avatar src="" w="7" h={7} />
        </Flex>
      ) : (
        <Flex gap={2}>
             <Avatar src="" w="7" h={7} />
          <Text maxW={"350px"} bg={"gray.400"} p={1} borderRadius={"md"}>
            It is a long established fact that a reader will be distracted by
            the readable content
          </Text>
         
        </Flex>
      )}
    </>
  );
}

export default Message;
