import React from 'react'
import { Box } from '@material-ui/core'

export const FlexCenter = ({ children, ...props}) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      {...props}
    >
      {children}
    </Box>
  )
}
