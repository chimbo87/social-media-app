import React from "react";
import {
  Flex,
  useColorMode,
  Button,
  Link,
  Text,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  DrawerFooter,
} from "@chakra-ui/react";
import { CiLight, CiDark } from "react-icons/ci";
import { useRecoilValue } from "recoil";
import { Link as RouterLink } from "react-router-dom";
import { TbHomeStar } from "react-icons/tb";
import { FiUser, FiLogOut } from "react-icons/fi";
import { GrMoreVertical } from "react-icons/gr";
import { RiSearchLine } from "react-icons/ri";
import userAtom from "../atoms/UserAtom";
import useLogout from "../hooks/useLogout";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useRecoilValue(userAtom);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const logout = useLogout(onClose); // Pass the onClose function to useLogout

  const btnRef = React.useRef();

  return (
    <>
      <Flex alignItems={"center"} justifyContent={user ? "space-between" : "center"} mt={5}>
        <Text fontWeight={"bold"} color={"blue"} padding={2} borderRadius={5} fontSize={25}>
          AFC Church
        </Text>
        {user && (
          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <Text
              bgColor={colorMode === "dark" ? "gray.800" : "gray.200"}
              marginRight={5}
              padding={2}
              borderRadius={5}
              cursor={"pointer"}
            >
              <RiSearchLine size={20} />
            </Text>
            <Text
              bgColor={colorMode === "dark" ? "gray.800" : "gray.200"}
              padding={2}
              borderRadius={5}
              cursor={"pointer"}
              ref={btnRef}
              colorScheme="teal"
              onClick={onOpen}
            >
              <GrMoreVertical size={20} />
            </Text>
          </Flex>
        )}
      </Flex>
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        mt={6}
        mb="12"
        bgColor={colorMode === "dark" ? "gray.800" : "gray.200"}
        paddingLeft={2}
        paddingRight={2}
        borderRadius={4}
      >
        {user && (
          <Link as={RouterLink} to="/">
            <TbHomeStar size={24} />
          </Link>
        )}
        <Button onClick={toggleColorMode} bg={"transparent"}>
          {colorMode === "dark" ? <CiDark size={24} /> : <CiLight size={24} />}
        </Button>
        {user && (
          <Flex alignContent={"center"} gap={4}>
            <Link as={RouterLink} to={`/${user.username}`}>
              <FiUser size={24} />
            </Link>
          </Flex>
        )}
      </Flex>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton
            bgColor={colorMode === "dark" ? "gray.800" : "gray.200"}
          />
          <DrawerBody>
            <Flex
              flexDirection={"column"}
              justifyContent={"space-between"}
              h={"full"}
            >
              <Flex flexDirection={"column"} mt={10}>
                <Text mt={5}>Profile</Text>
                <Text mt={5}>Payments</Text>
                <Text mt={5}>Church Events</Text>
                <Text mt={5}>Create Church Page</Text>
                <Text mt={5}>Notifications</Text>
                <Text mt={5}>Support</Text>
                <Text mt={5}>Settings and Privacy</Text>
              </Flex>
              <Flex>
                <Button size={"xl"} onClick={logout}>
                  <FiLogOut size={20} />
                </Button>
              </Flex>
            </Flex>
          </DrawerBody>

          <DrawerFooter>
            {/* <Button variant="outline" mr={3} onClick={onClose}>
              Close
            </Button> */}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;
