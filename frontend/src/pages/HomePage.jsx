import { Button, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/UserAtom"; // Ensure this path is correct

const HomePage = () => {
  const currentUser = useRecoilValue(userAtom);

  // Check if currentUser is available
  if (!currentUser) {
    return <div>Loading...</div>; // Or some other loading indicator
  }

  return (
    <Link to={`/${currentUser.username}`}>
      <Flex w={"full"} justifyContent={"center"}>
        <Button mx={"auto"}>Visit Profile Page</Button>
      </Flex>
    </Link>
  );
};

export default HomePage;
