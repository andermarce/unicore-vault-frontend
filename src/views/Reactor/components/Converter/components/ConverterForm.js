import React, { useEffect, useMemo } from 'react'
import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { useConverter } from 'hooks/useConverter'
import { useUniCore } from 'hooks/useUniCore'
import { getUniCoreContract } from 'UniCore'
import { ConverterButton } from './ConverterButton'
import { ConverterButtonGroup } from './ConverterButtonGroup'
import { 
  Button,
  FormGroup,
  InputAdornment,
  TextField,
} from '@material-ui/core'
import { ConverterAcceptance } from './ConverterAcceptance'
import { Balance } from 'components'
import { getDisplayBalance } from 'utils'
import { useTokenBalance } from 'hooks/useTokenBalance'


export const ConverterForm = () => {
  const { address, amount, setAmount } = useConverter()
  const tokenBalance = useTokenBalance(address)

  return (
    <FormGroup>
      <TextField
        type="number"
        label="Convert UNICORE UNI-V2"
        margin="normal"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter an amount..."
        variant="outlined"
        error={false}
        InputProps={{
          startAdornment: <InputAdornment position="start">🦄</InputAdornment>,
        }}
      />
      <ConverterButtonGroup />
      <ConverterAcceptance />
      
      <ConverterButton />
      <Balance title="UNICORE UNI-V2" value={getDisplayBalance(tokenBalance)} />
    </FormGroup>
  )
}
