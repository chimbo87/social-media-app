import { Button, Flex, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import Post from "../components/Post";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const showToast = useShowToast();

  useEffect(() => {
    const getFeedPosts = async () => {
      setLoading(true);
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
    <>
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
    </>
  );
};

export default HomePage;
