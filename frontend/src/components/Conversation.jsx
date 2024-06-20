import {
  Avatar,
  AvatarBadge,
  Flex,
  Text,
  Image,
  Stack,
  WrapItem,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

function Conversation() {
  return (
    <Flex
      gap={4}
      alignItems={"center"}
      p={"1"}
      _hover={{
        cursor: "pointer",
        bg: useColorModeValue("gray.600", "gray.dark"),
        color: "white",
      }}
      borderRadius={"md"}
    >
      <WrapItem>
        <Avatar
          size={{
            base: "xs",
            sm: "sm",
            md: "md",
          }}
          src="http://bit.ly/broken-link"
        >
        <AvatarBadge boxSize="1em" bg="green.500" />
        </Avatar>
      </WrapItem>
      <Stack direction={"column"} fontSize={"sm"}>
        <Text fontWeight="700" display={"flex"} alignItems={"center"}>
            johndoe <Image src="/verified.png" w={5} h={4} ml={1}/>
        </Text>
        <Text fontSize={"xs"} display={"flex"} alignItems={"center"} gap={1}>
            Hello test message...
        </Text>
      </Stack>
    </Flex>
  );
}

export default Conversation;
