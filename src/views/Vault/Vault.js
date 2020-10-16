import React from 'react'
import { Typography } from '@material-ui/core'
import { ViewWrapper } from 'components'
import { VaultDisplayRow } from './components/VaultDisplayRow'


export const Vault = () => {
  return (
    <ViewWrapper>
      <Typography variant="h5">UniCore Vault</Typography>
      <Typography variant="subtitle2" color="textSecondary">Deflationary Yield Generator</Typography>
      <VaultDisplayRow />
      
    </ViewWrapper>
  )
}
