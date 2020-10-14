import React from 'react'
import { Box, Link } from '@material-ui/core'

export const BottomBarLink = ({
  url,
  children
}) => {
  return (
    <Box
      marginX={2}
    >
      <Link
        target="blank"
        rel="noopener"
        href={url}
      >
        {children}
      </Link>
    </Box>
    
  )
}
