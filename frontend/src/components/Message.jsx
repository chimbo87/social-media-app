import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { selectedConversationAtom } from "../atoms/messagesAtom";
import { useRecoilValue } from "recoil";
import UserAtom from "../atoms/UserAtom";
import { BsCheck2All } from "react-icons/bs";

function Message({ ownMessage, message }) {
  const selectedConversation = useRecoilValue(selectedConversationAtom);
  const user = useRecoilValue(UserAtom);
  return (
    <>
      {ownMessage ? (
        <Flex gap={2} alignSelf={"flex-end"}>
          <Flex bg={"green.800"} maxW={"350px"} p={1} borderRadius={"md"}>
            <Text color={"white"}>{message.text}</Text>
            <Box alignSelf={"flex-end"} ml={1} fontWeight={"bold"}>
              <BsCheck2All size={16} color={message.seen ? "blue" : "white"} />
            </Box>
          </Flex>
          <Avatar src={user.profilePic} w="7" h={7} />
        </Flex>
      ) : (
        <Flex gap={2}>
          <Avatar src={selectedConversation.profilePicture} w="7" h={7} />
          <Text maxW={"350px"} bg={"gray.400"} p={1} borderRadius={"md"}>
            {message.text}
          </Text>
        </Flex>
      )}
    </>
  );
}

export default Message;
