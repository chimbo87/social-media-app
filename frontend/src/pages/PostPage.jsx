import React, { useState } from "react";
import { Avatar, Flex, Text, Image, Box, Divider, Button } from "@chakra-ui/react";
import { PiDotsThreeBold } from "react-icons/pi";
import Actions from "../components/Actions";
import { Comment } from "../components/Comment";

const PostPage = () => {
  const [liked, setLiked] = useState(false); // State to track if the post is liked

  const toggleLike = () => {
    setLiked(!liked); // Toggle the liked state
  };
  const likesCount = liked ? 201 : 200;
  return (
    <>
      <Flex>
        <Flex w={"full"} alignItems={"center"} gap={3}>
          <Avatar src="/person.jpeg" size={"md"} name="Archford Chimbo" />
          <Flex>
            <Text fontSize={"sm"} fontWeight={"bold"}>
              archychimbo
            </Text>
            <Image src="/verified.png" w="6" h={5} ml={2} />
          </Flex>
        </Flex>
        <Flex gap={4} alignItems={"center"}>
          <Text fontSize={"sm"} color={"gray.light"}>
            1d
          </Text>
          <PiDotsThreeBold />
        </Flex>
      </Flex>
      <Text my={3}>Let's talk about threads</Text>
      <Box
        borderRadius={6}
        overflow={"hidden"}
        border={"1px solid"}
        borderColor={"gray.light"}
      >
        <Image src="/truck.jpg" w={"full"} />
      </Box>

      <Flex gap={3} my={3}>
        <Actions liked={liked} toggleLike={toggleLike}/>
      </Flex>

      <Flex>
        <Text color={"gray.light"} fontSize={"sm"}>
          233 replies
        </Text>
        <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
        <Text color={"gray.light"} fontSize={"sm"}>
          {likesCount} likes
        </Text>
      </Flex>
      <Divider my={4} />

      <Flex justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text fontSize={"2xl"}>😊</Text>
          <Text color={"gray.light"}>Get the app to like, reply and reply</Text>
        </Flex>
        <Button>
          Get
        </Button>
      </Flex>
      <Divider my={4} />
     <Comment
     comment="looks really good !"
     createdAt ="2d"
     likes={450}
     username="johndoe"
     userAvatar="https://bit.ly/kent-c-dodds"
     />
     <Comment
     comment="This is nice !"
     createdAt ="2d"
     likes={100}
     username="janedoe"
     userAvatar="https://bit.ly/ryan-florence"
     />
      <Comment
     comment="  Amaizing !"
     createdAt ="2d"
     likes={70}
     username="peterdoe"
     userAvatar="https://bit.ly/prosper-baba"
     />

    </>
  );
};

export default PostPage;
