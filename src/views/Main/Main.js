import React from 'react'
import { Typography } from '@material-ui/core'
import { ManualButton, ViewWrapper } from 'components'

export const Main = () => {
  return (
    <ViewWrapper connected={false}>
      <Typography variant="h4">
        AWAITING LAUNCH 
        INSTRUCTIONS
      </Typography>
      <ManualButton />
    </ViewWrapper>
  )
}