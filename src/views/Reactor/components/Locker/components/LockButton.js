import React from 'react'
import { Box, Button } from '@material-ui/core'
import { useModal } from 'hooks/useModal'
import { useReactor } from 'hooks/useReactor'
import { LockModal } from './LockModal'

export const LockButton = () => {
  const [showLockModal] = useModal(<LockModal />)
  const { contractStart, contributionPhase } = useReactor()

  return (
    <Box marginY={2}>
      <Button
        disabled={contractStart + contributionPhase < Date.now()}
        onClick={showLockModal}
        color="primary"
        variant="outlined"
        fullWidth
      >
        LOCK ETH
      </Button>
    </Box>
  )
}
