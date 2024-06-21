import { Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import React from 'react'
import { VscSend } from "react-icons/vsc";

function MessageInput() {
  return (
    <form>
    <InputGroup>
      <Input
        w={"full"}
        placeholder='Type a message'
        borderColor="black"
      />
      <InputRightElement>
        <VscSend />
      </InputRightElement>
    </InputGroup>
  </form>
  
  )
}

export default MessageInput