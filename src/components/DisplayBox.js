import React from 'react'
import { Box } from '@material-ui/core'

export const DisplayBox = ({ children }) => {
  return (
    <Box
      height="100%"
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      {children}
    </Box>
  )
}