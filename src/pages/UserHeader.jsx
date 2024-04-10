import { Box, VStack } from "@chakra-ui/react"


const UserHeader = () => {
  return (
   <VStack gap={4} alignItems={"start"}>
    <Box>box1</Box>
    <Box>box2</Box>
    <Box>box3</Box>
   </VStack>
  )
}

export default UserHeader