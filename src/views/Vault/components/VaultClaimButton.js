import React from 'react'
import { Button } from '@material-ui/core'
import { useVault } from 'hooks/useVault'
import { usePendingRewards } from 'hooks/usePendingRewards'

export const VaultClaimButton = () => {
  const pendingRewards = usePendingRewards(0)
  const { onClaim } = useVault()

  return (
    <Button
      disabled={pendingRewards.eq(0)}
      onClick={onClaim}
      variant="contained" 
      color="secondary"
      fullWidth
    >
      Claim  
    </Button>
  )
}
