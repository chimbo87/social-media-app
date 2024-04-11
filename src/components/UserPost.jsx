import { Avatar, Box, Flex, Text, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { IoIosMore } from "react-icons/io";
import Actions from "./Actions";
const UserPost = ({postImg, postTitle, like, replies}) => {
  return (
    <Link to={"/archychimbo/post/1"}>
      <Flex gap={3} mb={4} py={5}>
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Avatar size="md" name="Archford Chimbo" src="/person.jpeg" />
          <Box w="1px" h={"full"} bg="gray.light" my={2}></Box>
          <Box position={"relative"} w={"full"}>
            <Avatar
              size="xs"
              name="John Doe"
              src="https://bit.ly/prosper-baba"
              position={"absolute"}
              bottom={"0px"}
              right={"-5px"}
              padding={"2px"}
            />
            <Avatar
              size="xs"
              name="John Doe"
              src="https://bit.ly/code-beast"
              position={"absolute"}
              bottom={"0px"}
              left={"-4px"}
              padding={"2px"}
            />
            <Avatar
              size="xs"
              name="John Doe"
              src="https://bit.ly/sage-adebayo"
              position={"absolute"}
              top={"0px"}
              left={"15px"}
              padding={"2px"}
            />
          </Box>
        </Flex>
        <Flex flex={1} flexDirection={"column"} gap={2}>
          <Flex justifyContent={"space-between"} w={"full"}>
            <Flex w={"full"} alignItems={"center"}>
              <Text fontSize={"sm"} fontWeight="bold">
                archychimbo
              </Text>
              <Image src="/verified.png" w={8} h={6} ml={1} />
            </Flex>
            <Flex gap={4} alignItems={"center"}>
              <Text fontStyle={"sm"} color={"gray.light"}>
                1d
              </Text>
              <IoIosMore />
            </Flex>
          </Flex>
          <Text>{postTitle}</Text>
          <Box
            borderRadius={6}
            overflow={"hidden"}
            border={"1px solid"}
            borderColor={"gray.light"}
          >
            <Image src={postImg} w={"full"} />
          </Box>
          <Flex gap={3} my={1}>
            <Actions />
          </Flex>
          <Flex gap={2} alignItems={"center"}>
            <Text color={"gray.light"} fontSize="sm">
             {replies} replies
            </Text>
            <Box w={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
            <Text color={"gray.light"} fontSize="sm">
              {like} likes
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
};

export default UserPost;
