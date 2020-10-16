import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { useReactor } from 'hooks/useReactor'
import { useTimeRemaining } from 'hooks/useTimeRemaining'

export const LockCountdown = () => {
  const { contractStart, contributionPhase } = useReactor()
  const timeRemaining = useTimeRemaining(contractStart + contributionPhase)

  return (
    <>
      <Box marginY={1}>
        <Typography variant="h4" color="textPrimary">Reactor Meltdown</Typography>
        <Typography variant="h5" color="secondary">In Progress</Typography>
      </Box>
      
      <Typography variant="h3">
        {timeRemaining}
      </Typography>
      <Typography variant="subtitle2" color="textSecondary">Until Liquidity Generation</Typography>
    </>
  )
}
