import {
  Avatar,
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";
import { useToast } from "@chakra-ui/react";
const UserHeader = () => {
  const toast = useToast();
  const copyURL = () => {
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL).then(() => {
      toast({
        description: "Link Copied !",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    });
  };
  return (
    <VStack gap={4} alignItems={"start"}>
      <Flex justifyContent={"space-between"} w={"full"}>
        <Box>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            Archford Chimbo
          </Text>
          <Flex gap={2} alignItems={"center"}>
            <Text fontSize={"sm"}>archychimbo</Text>
            <Text
              fontSize={"xs"}
              bg={"gray.dark"}
              color={"gray.light"}
              pl={2}
              pr={2}
              pt={1}
              pb={1}
              borderRadius={"full"}
            >
              threads.net
            </Text>
          </Flex>
        </Box>
        <Box>
          <Avatar name="Achy Chimbo" src="/person.jpeg" size={"xl"} />
        </Box>
      </Flex>
      <Text>Co-found, execute chairman and CEO of Meta Platforms</Text>
      <Flex w={"full"} justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text color={"gray.light"}>3.5 followers</Text>
          <Box w="1" h="1" bg={"gray.light"} borderRadius={"full"}></Box>
          <Link color={"gray.light"}>Instagram.com</Link>
        </Flex>
        <Flex>
          <Box className="icon-container">
            <FaInstagram size={24} cursor={"pointer"} />
          </Box>
          <Menu>
            <MenuButton>
              <Box className="icon-container">
                <IoIosMore size={24} cursor={"pointer"} />
              </Box>
            </MenuButton>
            <Portal>
              <MenuList bg={"gray.dark"} >
                <MenuItem bg={"gray.dark" } onClick={copyURL}>
                  Copy link
                </MenuItem>
              </MenuList>
            </Portal>
          </Menu>
        </Flex>
      </Flex>

      <Flex w={"full"}>
        <Flex
          flex={1}
          borderBottom={"1.5px solid white"}
          justifyContent={"center"}
          pb="3"
          cursor={"pointer"}
        >
          <Text fontWeight={"bold"}>Threads</Text>
        </Flex>
        <Flex
          flex={1}
          borderBottom={"1px solid gray"}
          justifyContent={"center"}
          color={"gray.light"}
          pb="3"
          cursor={"pointer"}
        >
          <Text fontWeight={"bold"}>Replies</Text>
        </Flex>
      </Flex>
    </VStack>
  );
};

export default UserHeader;
