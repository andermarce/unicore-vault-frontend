import React from 'react'
import { Box } from '@material-ui/core'
import { IndividualLock } from '../../IndividualLock'
import { ClaimButton } from '../../ClaimButton'

export const ClaimSection = () => {
  return (
    <Box>
      <IndividualLock />
      <ClaimButton />
    </Box>
  )
}
