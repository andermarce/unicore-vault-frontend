import React from 'react'
import { Button } from '@material-ui/core'
import { useWallet } from 'use-wallet'

export const ProviderButton = ({
  title,
  provider,
  img
}) => {
  const { connect } = useWallet()

  return (
    <Button
      onClick={() => connect(provider)}
      variant="outlined" 
      color="primary" 
      fullWidth
    >
      {title}
    </Button>
  )
}
