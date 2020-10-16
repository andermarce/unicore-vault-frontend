import React from 'react'
import { Box, Typography } from '@material-ui/core'

export const Balance = ({ title, value }) => {
  return (
    <Box marginY={1}>
      <Typography variant="h6">{value}</Typography>
      <Typography variant="subtitle2" color="textSecondary">{title}</Typography>
    </Box>
  )
}