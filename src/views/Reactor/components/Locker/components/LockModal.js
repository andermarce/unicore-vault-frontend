import React, { useMemo } from 'react'
import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { useLocker } from 'hooks/useLocker'
import { useUniCore } from 'hooks/useUniCore'
import { getUniCoreContract } from 'UniCore'
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
    formState,
    setAmount,
    lockEthereum
  } = useLocker()
  
  return (
    <>
      <DialogTitle>Reactor Deposit</DialogTitle>
      <DialogContent>
        <FormGroup>
          <TextField
            type="number"
            label="Lock Ethereum"
            value={formState.amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter an amount..."
            variant="outlined"
            error={formState.error}
            //helperText={formState.helperText}
            InputProps={{
              startAdornment: <InputAdornment position="start">Ξ</InputAdornment>,
            }}
          />
          <LockButtonGroup />
          <LockAcceptance />
          
          <Button
            onClick={lockEthereum}
            disabled={!formState.checked || formState.error}
            variant="contained" 
            color="secondary"
          >
            Deposit Liquidity
          </Button>
        </FormGroup>
      </DialogContent>
    </>
  )
}
