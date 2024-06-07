import { Button, useColorModeValue } from "@chakra-ui/react";
import { GoPlus } from "react-icons/go";

function CreatePost() {
  return (
    <>
      <Button
        position={"fixed"}
        bottom={10}
        right={10}
        bg={useColorModeValue("gray.300", "gray.dark")}
      >
        <GoPlus />  Post
      </Button>
    </>
  );
}

export default CreatePost;
