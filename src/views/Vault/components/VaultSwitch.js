import React from 'react'
import { Typography, Grid, Switch } from '@material-ui/core'
import { useVault } from 'hooks/useVault'

export const VaultSwitch = () => {
  const { onSwitch, vaultMethod } = useVault()

  return (
    <Typography component="div">
      <Grid component="label" container alignItems="center" justify="center" spacing={1}>
        <Grid item>Deposit</Grid>
        <Grid item>
          <Switch
            checked={vaultMethod === 'withdraw'}
            onChange={onSwitch}
          />
        </Grid>
        <Grid item>Withdraw</Grid>
      </Grid>
    </Typography>
  )
}
