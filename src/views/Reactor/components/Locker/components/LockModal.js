import React, { useMemo } from 'react'
import { useLocker } from 'hooks/useLocker'
import { LockAcceptance } from './LockAcceptance'
import { LockButtonGroup } from './LockButtonGroup'
import { 
  Button,
  DialogTitle, 
  DialogContent,
  FormGroup,
  InputAdornment,
  TextField,
} from '@material-ui/core'

export const LockModal = ({ onDismiss }) => {
  const {
    amount,
    checked,
    error,
    errorMessage,
    setAmount,
    lockEthereum
  } = useLocker()

  const handleClick = async () => {
    // const tx = await lockEthereum()
    lockEthereum()
    onDismiss()
  }
  
  return (
    <>
      <DialogTitle>Reactor Deposit</DialogTitle>
      <DialogContent>
        <FormGroup>
          <TextField
            type="number"
            label="Lock Ethereum"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter an amount..."
            variant="outlined"
            error={error}
            //helperText={formState.helperText}
            InputProps={{
              startAdornment: <InputAdornment position="start">Ξ</InputAdornment>,
            }}
          />
          <LockButtonGroup />
          <LockAcceptance />
          
          <Button
            onClick={handleClick}
            disabled={error || !checked || isNaN(amount) || amount === '0' || amount === ''}
            variant="contained" 
            color="secondary"
          >
            {!error
              ? "Deposit Liquidity"
              : errorMessage
            }
          </Button>
        </FormGroup>
      </DialogContent>
    </>
  )
}
