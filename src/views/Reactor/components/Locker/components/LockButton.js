import React from 'react'
import { Box, Button } from '@material-ui/core'
import { useModal } from 'hooks/useModal'
import { LockModal } from './LockModal'

export const LockButton = () => {
  const [showLockModal] = useModal(<LockModal />)

  return (
    <Box marginY={2}>
      <Button
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
