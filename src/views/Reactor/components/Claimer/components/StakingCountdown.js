import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { useReactor } from 'hooks/useReactor'
import { useTimeRemaining } from 'hooks/useTimeRemaining'

export const StakingCountdown = () => {
  const { contractEnd, stakingPhase } = useReactor()
  const timeRemaining = useTimeRemaining(contractEnd + stakingPhase)

  return (
    <>
      <Box marginY={1}>
        <Typography variant="h4" color="textPrimary">
          Reactor Cooldown
        </Typography>
        <Typography variant="h5" color="secondary">
          Sequence Initiating
        </Typography>
      </Box>
      
      <Typography variant="h3">
        {timeRemaining}
      </Typography>
      <Typography variant="subtitle2" color="textSecondary">
        Until Trading Begins
      </Typography>
    </>
  )
}
