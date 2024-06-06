import { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const { username } = useParams();
  const showToast = useShowToast();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/profile/${username}`);
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setUser(data); // Update user state with the fetched data
      } catch (error) {
        showToast("Error", error, "error");
      }
    };

    getUser();
  }, [username, showToast]);

  if (!user) return null;
  return (
    <>
      <UserHeader user={user} />
      <UserPost
        like={1200}
        replies={481}
        postImg="xiosa02.jpeg"
        postTitle="Lets talk about threads"
      />
      <UserPost
        like={200}
        replies={81}
        postImg="banner.jpeg"
        postTitle="Power of Technology"
      />
      <UserPost like={400} replies={71} postTitle="Nice Day Developers" />
      <UserPost
        like={500}
        replies={48}
        postImg="truck.jpg"
        postTitle="Logistics way to go !"
      />
    </>
  );
};

export default UserPage;
