import { Box, Flex, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import Post from "../components/Post";
import SuggestedUsers from "../components/SuggestedUsers";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const showToast = useShowToast();

  useEffect(() => {
    const getFeedPosts = async () => {
      setLoading(true);
      setPosts([]);
      try {
        const res = await fetch("/api/posts/feed");
        const data = await res.json();
      
        // console.log("Fetched Data:", data); 

        if ( data.error) {
          showToast("Error",  data.error, "error");
          return;
        }

        if (Array.isArray( data)) {
          setPosts( data);
        } else {
          showToast("Error", "Invalid data format", "error");
        }
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setLoading(false);
      }
    };

    getFeedPosts();
  },[showToast]);

  return (
    <Flex gap={"10"} alignItems={"flex-start"}>
      <Box flex={70}>
      {!loading && posts.length === 0 && <h1>Follow some users to see feed</h1>}
      {loading && (
        <Flex justify="center">
          <Spinner size="xl" />
        </Flex>
      )}
      {!loading && posts.length > 0 && (
        <div>
          {posts.map((post) => (
            <Post key={post._id} post={post} postedBy={post.postedBy} />
          ))}
        </div>
      )}
      </Box>
      <Box flex={30}
      display={{
        base: "none",
        md: "block",
      }}
      >
        <SuggestedUsers/>
      </Box>
    </Flex>
  );
};

export default HomePage;
