import {
  Avatar,
  AvatarBadge,
  Flex,
  Text,
  Image,
  Stack,
  WrapItem,
  useColorModeValue,
  useColorMode
} from "@chakra-ui/react";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import userAtom from "../atoms/UserAtom";
import { selectedConversationAtom } from "../atoms/messagesAtom";

function Conversation({ conversation }) {
  const user = conversation.participants[0];
  const currentUser = useRecoilValue(userAtom);
  const lastMessage = conversation.lastMessage;
  const colorMode = useColorMode()
  const [selectedConversation, setSelectedConversation] = useRecoilState(selectedConversationAtom)
  console.log("selectedConversation", selectedConversation)
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
      onClick={()=> setSelectedConversation({
        _id: conversation._id,
        userId: user._id,
        username: user.username,
        profilePicture: user.profilePic
      })}
      bg={selectedConversation ?._id === conversation._id ?(colorMode === "light" ? "gray.400" : "gray.dark"): ""}
      borderRadius={"md"}
    >
      <WrapItem>
        <Avatar
          size={{
            base: "xs",
            sm: "sm",
            md: "md",
          }}
          src={user.profilePic}
        >
          <AvatarBadge boxSize="1em" bg="green.500" />
        </Avatar>
      </WrapItem>
      <Stack direction={"column"} fontSize={"sm"}>
        <Text fontWeight="700" display={"flex"} alignItems={"center"} gap={1}>
          {user.username} <Image src="/verified.png" w={5} h={4} ml={1} />
        </Text>
        <Text fontSize={"xs"} display={"flex"} alignItems={"center"} gap={1}>
          {currentUser._id === lastMessage.sender && (
            <IoCheckmarkDoneOutline size={16} />
          )}
        {lastMessage.text.length > 10
            ? lastMessage.text.substring(0, 15) + "..."
            : lastMessage.text}
        </Text>
      </Stack>
    </Flex>
  );
}

export default Conversation;
