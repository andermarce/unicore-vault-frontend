import React from 'react'
import { Button } from '@material-ui/core'
import { useWallet } from 'use-wallet'
import { useModal } from 'hooks/useModal'
import { ConnectModal } from './ConnectModal'
import { formatAddress } from 'utils/formatAddress'

export const ConnectButton = () => {
  const [showConnectModal] = useModal(<ConnectModal />)
  const { account, reset } = useWallet()

  return (
    <Button
      onClick={!!account 
        ? reset
        : showConnectModal
      }
    >
      {!!account 
        ? formatAddress(account)
        : "Connect Wallet"
      }
    </Button>
  )
}
