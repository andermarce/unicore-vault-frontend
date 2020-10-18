import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { Flex, ManualButton, ViewWrapper } from 'components'

export const Main = () => {
  return (
    <ViewWrapper connected={false}>
      <Typography variant="h4">
        AWAITING LAUNCH 
        INSTRUCTIONS
      </Typography>
      <Box marginTop={4}>
        <ManualButton />
      </Box>
    </ViewWrapper>
  )
}