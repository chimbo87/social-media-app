import { Avatar, Box, Flex, Text, Image } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import Actions from "./Actions";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import { DeleteIcon } from "@chakra-ui/icons";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/UserAtom";

const Post = ({ post, postedBy }) => {
  const [user, setUser] = useState(null);
  const showToast = useShowToast();
  const navigate = useNavigate();
  const currentUser = useRecoilValue(userAtom);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/profile/${postedBy}`);

        const data = await res.json();

        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        // console.log(data)
        setUser(data);
      } catch (error) {
        showToast("Error", error.message, "error");
        setUser(null);
      }
    };

    getUser();
  }, [postedBy, showToast]);

  const handleDeletePost = async (e)=>{
    try{
      e.preventDefault();
      if(!window.confirm("Are you sure you want to delete this post ?")) return;
      const res = await fetch(`/api/posts/${post._id}`,{
        method: "DELETE",
      });
      const data = await res.json();
      if(data.erro){
        showToast("Error", data.error, "error");
        return
      }
      showToast("Success", "Post deleted", "success");

    }catch(error){
      showToast("Error", error.message, "error");
    }
  }
  if (!user) return null;
  return (
    <Link to={`/${user.username}/post/${post._id}`}>
      <Flex gap={3} mb={4} py={5}>
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Avatar
            size="md"
            name={user.name}
            src={user?.profilePic}
            onClick={(e) => {
              e.preventDefault();
              navigate(`/${user.username}`);
            }}
          />
          <Box w="1px" h={"full"} bg="gray.light" my={2}></Box>
          <Box position={"relative"} w={"full"}>
            {post.replies.length === 0 && (
              <Text textAlign={"center"}>&#128528;</Text>
            )}
            {post.replies[0] && (
              <Avatar
                size="xs"
                name="John Doe"
                src={post.replies[0].userProfilePic}
                position={"absolute"}
                bottom={"0px"}
                right={"-5px"}
                padding={"2px"}
              />
            )}

            {post.replies[1] && (
              <Avatar
                size="xs"
                name="John Doe"
                src={post.replies[1].userProfilePic}
                position={"absolute"}
                bottom={"0px"}
                left={"-4px"}
                padding={"2px"}
              />
            )}
            {post.replies[2] && (
              <Avatar
                size="xs"
                name="John Doe"
                src={post.replies[1].userProfilePic}
                position={"absolute"}
                top={"0px"}
                left={"15px"}
                padding={"2px"}
              />
            )}
          </Box>
        </Flex>
        <Flex flex={1} flexDirection={"column"} gap={2}>
          <Flex justifyContent={"space-between"} w={"full"}>
            <Flex w={"full"} alignItems={"center"}>
              <Text
                fontSize={"sm"}
                fontWeight="bold"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/${user.username}`);
                }}
              >
                {user?.name}
              </Text>
              <Image src="/verified.png" w={8} h={6} ml={1} />
            </Flex>
            <Flex gap={4} alignItems={"center"}>
              <Text
                fontSize={"sm"}
                width={36}
                color={"gray.light"}
                textAlign={"end"}
              >
                {formatDistanceToNow(new Date(post.createdAt))} ago
              </Text>
              {currentUser?._id === user._id && (
                <DeleteIcon size={20} onClick={handleDeletePost} />
              )}
            </Flex>
          </Flex>

          <Text fontSize={"sm"}>{post.text}</Text>
          {post.img && (
            <Box
              borderRadius={6}
              overflow={"hidden"}
              border={"1px solid"}
              borderColor={"gray.light"}
            >
              <Image src={post.img} w={"full"} />
            </Box>
          )}
          <Flex gap={3} my={1}>
            <Actions post={post} />
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
};

export default Post;
