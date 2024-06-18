import React, { useState } from "react";
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
  const [liked, setLiked] = useState(post.likes.includes(user?._id));
  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [isLiking, setIsLiking] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [postState, setPostState] = useState(post); // Changed to postState to avoid conflict with prop
  const [reply, setReply] = useState("");
  const showToast = useShowToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLikeAndUnlike = async () => {
    if (!user) {
      return showToast("Error", "You must login to like a post", "error");
    }
    if (isLiking) return;
    setIsLiking(true);
    try {
      const res = await fetch("/api/posts/like/" + postState._id, {
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

  const handleReply = async () => {
    if (!user) {
      return showToast(
        "Error",
        "You must be logged in to reply to a post",
        "error"
      );
    }
    if (isReplying) return;
    setIsReplying(true);
    try {
      const res = await fetch("/api/posts/reply/" + postState._id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: reply }),
      });

      const data = await res.json();
      if (data.error) {
        return showToast("Error", data.error, "error");
      }
      setPostState({
        ...postState,
        replies: [...postState.replies, data.reply],
      });
      showToast("Success", "Reply posted successfully", "success");
      setReply(""); // Clear the reply input after successful reply
      onClose(); // Close the modal after reply
      console.log(data);
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsReplying(false);
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
        <BsChat onClick={onOpen} />
        <AiOutlineRetweet />
        <BsSend />
      </Flex>
      <Flex gap={2} alignItems={"center"}>
        <Text color={"gray.light"} fontSize="sm">
          {postState.replies.length} replies
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
              <Input
                placeholder="Reply goes here..."
                value={reply}
                onChange={(e) => setReply(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" size={"sm"} mr={3}
            isLoading={isReplying}
             onClick={handleReply}>
              Reply
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Actions;
