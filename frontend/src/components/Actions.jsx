import React, { useState, useEffect } from "react";
import {
  Flex,
  Text,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  Input,
  ModalFooter,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { AiOutlineRetweet } from "react-icons/ai";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { BsChat } from "react-icons/bs";
import { BsSend } from "react-icons/bs";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/UserAtom";
import useShowToast from "../hooks/useShowToast";

const Actions = ({ post }) => {
  const user = useRecoilValue(userAtom);
  const [liked, setLiked] = useState(post.likes.includes(user?._id)); // State to track if the heart is liked
  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [isLiking, setIsLiking] = useState(false);
  const showToast = useShowToast();
  const {isOpen, onOpen, onClose} = useDisclosure()

  const handleLikeAndUnlike = async () => {
    if (!user)
      return showToast("Error", "You must login to like a post", "error");
    if (isLiking) return;
    setIsLiking(true);
    try {
      const res = await fetch("/api/posts/like/" + post._id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.error) return showToast("Error", data.error, "error");
      console.log(data);
      setLiked(!liked);
      setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <Flex flexDirection="column">
      <Flex gap={3} my={2} onClick={(e) => e.preventDefault()}>
        {liked ? (
          <GoHeartFill color="red" onClick={handleLikeAndUnlike} />
        ) : (
          <GoHeart onClick={handleLikeAndUnlike} />
        )}
        <BsChat onClick={onOpen}/>
        <AiOutlineRetweet />
        <BsSend />
      </Flex>
      <Flex gap={2} alignItems={"center"}>
        <Text color={"gray.light"} fontSize="sm">
          {post.replies.length} replies
        </Text>
        <Box w={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
        <Text color={"gray.light"} fontSize="sm">
          {likeCount} likes
        </Text>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Reply</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Input placeholder="Reply goes here..." />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" size={"sm"} mr={3}>
              Reply
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Actions;
