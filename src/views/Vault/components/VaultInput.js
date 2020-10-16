import React from 'react'
import { TextField, InputAdornment } from '@material-ui/core'

export const VaultInput = () => {
  return (
    <TextField
      type="number"
      label="Stake REACTOR, Earn UNICORE"
      margin="normal"
      // value={}
      // onChange={(e) => {}}
      placeholder="Enter an amount..."
      variant="outlined"
      error={false}
      InputProps={{
        startAdornment: <InputAdornment position="start">🦄</InputAdornment>,
      }}
    />
  )
}
