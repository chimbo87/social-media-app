import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";

const UserPage = () => {
  return (
    <>
      <UserHeader />
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
