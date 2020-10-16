import React from 'react'
import { Flex } from '../Flex'

export const Column = ({ children }) => {
  return (
    <Flex
      flexDirection="column"
      height="100%"
    >
      {children}
    </Flex>
  )
}
