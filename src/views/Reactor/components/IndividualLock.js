import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { useAddressLocked } from 'hooks/useAddressLocked'
import { useReactor } from 'hooks/useReactor'
import { getDisplayBalance } from 'utils' 


export const IndividualLock = ({ showLimit=false }) => {
  const addressLocked = useAddressLocked()
  const { maxIndividualCap } = useReactor()
  return (
    <Box marginY={1}>
      <Typography variant="h6">
        {showLimit 
          ? `${getDisplayBalance(addressLocked)} / ${getDisplayBalance(maxIndividualCap)}`
          : getDisplayBalance(addressLocked)
        }
      </Typography>
      <Typography variant="subtitle2" color="textSecondary">MY LOCKED ETH</Typography>
    </Box>
  )
}
