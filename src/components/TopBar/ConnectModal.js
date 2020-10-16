import React, { useEffect } from 'react'
import { Box, DialogContent, DialogTitle } from '@material-ui/core'
import { useWallet } from 'use-wallet'
import { ProviderButton } from './ProviderButton'

export const ConnectModal = ({ onDismiss }) => {
  const { account } = useWallet();

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
          <ProviderButton title="Metamask" provider="injected" />
          <ProviderButton title="Frame" provider="frame" />
          <ProviderButton title="Authereum" provider="authereum" />
          <ProviderButton title="Walletconnect" provider="walletconnect" />
        </Box>
      </DialogContent>
    </>
  )
}
