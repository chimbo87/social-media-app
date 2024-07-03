import {
  Avatar,
  AvatarBadge,
  Flex,
  Text,
  Image,
  Stack,
  WrapItem,
  useColorModeValue,
  useColorMode,
  Box,
  Img
} from "@chakra-ui/react";
import { CiImageOn } from "react-icons/ci";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import userAtom from "../atoms/UserAtom";
import { selectedConversationAtom } from "../atoms/messagesAtom";

function Conversation({ conversation, isOnLine}) {
  const user = conversation.participants && conversation.participants[0];
  const currentUser = useRecoilValue(userAtom);
  const lastMessage = conversation.lastMessage || {};
  const { colorMode } = useColorMode();
  const [selectedConversation, setSelectedConversation] = useRecoilState(selectedConversationAtom);

  if (!user) {
    return null; // Or you can return a placeholder if user data is missing
  }

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
      onClick={() => setSelectedConversation({
        _id: conversation._id,
        userId: user._id,
        username: user.username,
        profilePicture: user.profilePic,
        mock: conversation.mock
      })}
      bg={selectedConversation && selectedConversation._id === conversation._id ? (colorMode === "light" ? "gray.400" : "gray.dark") : ""}
      borderRadius={"md"}
    >
      <WrapItem>
        <Avatar
          size={{
            base: "xs",
            sm: "sm",
            md: "md",
          }}
          src={user.profilePic || ""}
        >
         {isOnLine ?  <AvatarBadge boxSize="1em" bg="green.500" />: ""}
        </Avatar>
      </WrapItem>
      <Stack direction={"column"} fontSize={"sm"}>
        <Text fontWeight="700" display={"flex"} alignItems={"center"} gap={1}>
          {user.username} <Image src="/verified.png" w={5} h={4} ml={1} />
        </Text>
        <Text fontSize={"xs"} display={"flex"} alignItems={"center"} gap={1}>
          {currentUser._id === lastMessage.sender ? (
            <Box color={lastMessage.seen ? "blue.400" : ""}>
              <IoCheckmarkDoneOutline size={16} />
            </Box>
          ): ""}
          {lastMessage.text && lastMessage.text.length > 10
            ? lastMessage.text.substring(0, 15) + "..."
            : lastMessage.text || <CiImageOn size={16} />}
        </Text>
      </Stack>
    </Flex>
  );
}

export default Conversation;
