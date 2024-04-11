import React, { useState } from "react";
import { Flex } from "@chakra-ui/react";
import { AiOutlineRetweet } from "react-icons/ai";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io"; // Import the filled heart icon
import { BsChat } from "react-icons/bs";
import { BsSend } from "react-icons/bs";

const Actions = () => {
  const [liked, setLiked] = useState(false); // State to track if the heart is liked

  const toggleLike = () => {
    setLiked(!liked); // Toggle the liked state
  };

  return (
    <Flex gap={3} my={2} onClick={(e) => e.preventDefault()}>
      {liked ? (
        <IoMdHeart color="red" onClick={toggleLike} />
      ) : (
        <IoMdHeartEmpty onClick={toggleLike} />
      )}
      <BsChat />
      <AiOutlineRetweet />
      <BsSend />
    </Flex>
  );
};

export default Actions;
