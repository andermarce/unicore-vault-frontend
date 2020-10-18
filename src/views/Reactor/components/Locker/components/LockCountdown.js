import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { useReactor } from 'hooks/useReactor'
import { useTimeRemaining } from 'hooks/useTimeRemaining'
import { useTotalLocked } from 'hooks/useTotalLocked'
import { LiquidityButton } from './LiquidityButton'

export const LockCountdown = () => {
  const { contractStart, contributionPhase, maxTotalCap } = useReactor()
  const totalLocked = useTotalLocked()
  const timeRemaining = useTimeRemaining(contractStart + contributionPhase)


  const showCountdown = () => {
    if (Date.now() < contractStart + contributionPhase && totalLocked.lt(maxTotalCap.times(0.99))) {
      return true
    }
    return false
  } 

  return (
    <>
      <Box marginY={1}>
        <Typography variant="h4" color="textPrimary">Reactor Fusion</Typography>
        <Typography variant="h5" color="secondary">In Progress</Typography>
      </Box>
      {contractStart === 0 ? (
        <Typography variant="h3">Awaiting Startup</Typography>
      ) : (
        <>
           {showCountdown() ? (
            <>
              <Typography variant="h3">
                {timeRemaining}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">Until Liquidity Generation Or Cap is Reached</Typography>
            </>
          ) : (
            <LiquidityButton />
          )}
        </>
      )}
    </>
  )
}
