import { Avatar, Flex ,Divider,Text} from "@chakra-ui/react";
import { useState } from "react";
import { PiDotsThreeBold } from "react-icons/pi";
import Actions from "./Actions";


export const Comment = ({userAvatar, createdAt, comment, username, likes}) => {
  const [liked, setLiked] = useState(false);
  return (
    <>
      <Flex gap={4} py={2} my={2} w={"full"}>
        <Avatar src={userAvatar}/>
        <Flex gap={1} w={"full"} flexDirection={"column"}>
          <Flex
            w={"full"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text fontSize="sm" fontWeight="bold">
             {username}
            </Text>
            <Flex gap={2} alignItems={"center"}>
              <Text fontSize="sm" color={"gray.light"}>
                {createdAt}
              </Text>
              <PiDotsThreeBold />
            </Flex>
          </Flex>
          <Text>{comment}</Text>
          <Actions liked={liked} setLiked={setLiked} />
          <Text fontSize={"sm"} color={"gray.light"}>
            {likes + (liked ? 1 : 0)} likes
          </Text>
        </Flex>
      </Flex>
      <Divider my={4}/>
    </>
  );
};
