import React from 'react'
import { Typography } from '@material-ui/core'
import { useWallet } from 'use-wallet'
import { ViewWrapper, ManualButton } from 'components'
import { BalanceRow } from './components/BalanceRow'

export const Overview = () => {

  return (
    <ViewWrapper>
      <img src={require('assets/img/unicore-icon.png')} height="100px" alt="unicore-icon" />
      <Typography variant="h4">Welcome to UniCore</Typography>
      <Typography variant="subtitle1" color="secondary">Constant Liquidity Provider Protocol</Typography>
      <ManualButton />
      <BalanceRow />
    </ViewWrapper>
  )
}
