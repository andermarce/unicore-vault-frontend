import React from 'react'
import { Flex } from '../Flex'

export const FlexCenter = ({ children, ...props}) => {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      {...props}
    >
      {children}
    </Flex>
  )
}
