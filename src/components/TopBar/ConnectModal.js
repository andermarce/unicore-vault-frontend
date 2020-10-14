import React, { useEffect } from 'react'
import { Box, Button, DialogContent, DialogTitle } from '@material-ui/core'
import { useWallet } from 'use-wallet'


export const ConnectModal = ({ onDismiss }) => {
  const { account, connect } = useWallet();

  useEffect(() => {
    if (account) {
      onDismiss()
    }
  }, [account, onDismiss])

  return (
    <>
      <DialogTitle>Connect Your Wallet</DialogTitle>
      <DialogContent>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Button
            onClick={() => connect('injected')}
            variant="outlined" 
            color="primary" 
            fullWidth
          >
            MetaMask
          </Button>
          <Button 
            onClick={() => connect('walletconnect')}
            variant="outlined"
            color="primary"
            fullWidth
          >
            WalletConnect
          </Button>
        </Box>
      </DialogContent>
    </>
  )
}
