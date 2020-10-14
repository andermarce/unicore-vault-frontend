import React from 'react'
import { Box } from '@material-ui/core'

export const Flex = ({children, ...props}) => {
  return (
    <Box
      display="flex"
      {...props}
    >
      {children}
    </Box>
  )
}
