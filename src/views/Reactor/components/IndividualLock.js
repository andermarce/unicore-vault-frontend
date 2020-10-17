import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { useAddressLocked } from 'hooks/useAddressLocked'
import { useReactor } from 'hooks/useReactor'
import { getDisplayBalance } from 'utils' 
import BigNumber from 'bignumber.js'

export const IndividualLock = ({ showLimit=false }) => {
  const addressLocked = useAddressLocked()
  const { maxIndividualCap, lpUnits } = useReactor()

  return (
    <Box marginY={1}>
      <Typography variant="h6">
        {showLimit 
          ? `${getDisplayBalance(addressLocked)} / ${getDisplayBalance(maxIndividualCap)}`
          : getDisplayBalance(addressLocked.times(lpUnits).div(new BigNumber(10).pow(18)))
        }
      </Typography>
        {showLimit ? (
          <Typography variant="subtitle2" color="textSecondary">
            MY LOCKED ETH
          </Typography> 
        ) : (
          <Typography variant="subtitle2" color="textSecondary">
            CLAIMABLE REACTOR
          </Typography> 
        )}
    </Box>
  )
}
