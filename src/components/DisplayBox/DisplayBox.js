import React from 'react'
import { Box } from '@material-ui/core'

export const DisplayBox = ({ children, ...props }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
      height="100%"
      width="100%"
      textAlign="center"
      {...props}
    >
      {children}
    </Box>
  )
}