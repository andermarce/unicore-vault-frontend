import React from 'react'
import { TextField, InputAdornment } from '@material-ui/core'
import { useVault } from 'hooks/useVault'

export const VaultInput = () => {
  const { amount, error, setAmount } = useVault()

  return (
    <TextField
      type="number"
      label="Stake REACTOR"
      margin="normal"
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
      placeholder="Enter an amount..."
      variant="outlined"
      error={error}
      InputProps={{
        startAdornment: <InputAdornment position="start">
          <img src={require('assets/img/unicore-icon.png')} height={14} alt="unicore-icon" />
        </InputAdornment>,
      }}
    />
  )
}
