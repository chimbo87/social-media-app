import { Avatar, Box, Flex, Text, Image, Skeleton } from "@chakra-ui/react";
import React, { useState } from "react";
import { selectedConversationAtom } from "../atoms/messagesAtom";
import { useRecoilValue } from "recoil";
import UserAtom from "../atoms/UserAtom";
import { BsCheck2All } from "react-icons/bs";

function Message({ ownMessage, message }) {
  const selectedConversation = useRecoilValue(selectedConversationAtom);
  const user = useRecoilValue(UserAtom);
  const [imgLoaded, setImgLoaded] = useState(false);
  return (
    <>
      {ownMessage ? (
        <Flex gap={2} alignSelf={"flex-end"}>
          {message.text && (
            <Flex bg={"green.800"} maxW={"350px"} p={1} borderRadius={"md"}>
              <Text color={"white"}>{message.text}</Text>
              <Box alignSelf={"flex-end"} ml={1} fontWeight={"bold"}>
                <BsCheck2All
                  size={16}
                  color={message.seen ? "blue" : "white"}
                />
              </Box>
            </Flex>
          )}
          {message.img && !imgLoaded && (
            <Flex mt={5} w={"200px"}>
              <Image
                src={message.img}
                hidden
                onLoad={() => setImgLoaded(true)}
                alt="message image"
                borderRadius={4}
              />
              <Skeleton width={"200px"} h={"200px"} />
            </Flex>
          )}
          {message.img && imgLoaded && (
            <Flex mt={5} w={"200px"}>
              <Image src={message.img} alt="message image" borderRadius={4} />
              <Text color={"white"}>{message.text}</Text>
              <Box alignSelf={"flex-end"} ml={1} fontWeight={"bold"}>
                <BsCheck2All
                  size={16}
                  color={message.seen ? "blue" : "gray"}
                />
              </Box>
            </Flex>
          )}

          <Avatar src={user.profilePic} w="7" h={7} />
        </Flex>
      ) : (
        <Flex gap={2}>
          <Avatar src={selectedConversation.profilePicture} w="7" h={7} />
          {message.text && (
            <Text maxW={"350px"} bg={"gray.400"} p={1} borderRadius={"md"}>
              {message.text}
            </Text>
          )}
          {message.img && !imgLoaded && (
            <Flex mt={5} w={"200px"}>
              <Image
                src={message.img}
                hidden
                onLoad={() => setImgLoaded(true)}
                alt="message image"
                borderRadius={4}
              />
              <Skeleton width={"200px"} h={"200px"} />
            </Flex>
          )}
          {message.img && imgLoaded && (
            <Flex mt={5} w={"200px"}>
              <Image src={message.img} alt="message image" borderRadius={4} />
        
            </Flex>
          )}
        </Flex>
      )}
    </>
  );
}

export default Message;
