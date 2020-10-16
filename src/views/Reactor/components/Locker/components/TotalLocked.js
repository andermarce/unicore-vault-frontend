import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { useTotalLocked } from 'hooks/useTotalLocked'
import { useReactor } from 'hooks/useReactor'
import { getDisplayBalance } from 'utils'

export const TotalLocked = () => {
  const totalLocked = useTotalLocked()
  const { maxTotalCap } = useReactor()

  return (
    <Box marginY={1}>
      <Typography variant="h6">{getDisplayBalance(totalLocked)} / {getDisplayBalance(maxTotalCap)}</Typography>
      <Typography variant="subtitle2" color="textSecondary">TOTAL LOCKED ETH</Typography>
    </Box>
  )
}
