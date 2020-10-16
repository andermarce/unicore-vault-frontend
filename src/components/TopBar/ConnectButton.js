import React, { useEffect } from 'react'
import { Box, Button } from '@material-ui/core'
import { useWallet } from 'use-wallet'
import { useModal } from 'hooks/useModal'
import { ConnectModal } from './ConnectModal'
import { formatAddress } from 'utils/formatAddress'
import { useHistory, useLocation } from 'react-router-dom'

export const ConnectButton = () => {
  const history = useHistory()
  const location = useLocation()
  const [showConnectModal] = useModal(<ConnectModal />)
  const { account, ethereum, reset } = useWallet()

  useEffect(() => {
    if (!!account && ethereum) {
      // if we have a specified path, go there
      if (location.pathname !== '/') {
        history.push(location.pathname)
      } else {
        // else go to overview
        history.push('/overview')
      }
    } else {
      // go back to landing on logout
      history.push('/')
    }
  }, [account, ethereum, history, location.pathname])

  return (
    <Box marginY={1}>
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
    </Box>
    
  )
}
