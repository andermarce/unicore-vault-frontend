import React, { useMemo } from 'react'
import { useUniCore } from 'hooks/useUniCore'
import { getUniCoreLpAddress } from 'UniCore'
import { useConverter } from 'hooks/useConverter'
import { ConverterButton } from './ConverterButton'
import { ConverterButtonGroup } from './ConverterButtonGroup'
import {
  FormGroup,
  InputAdornment,
  TextField,
} from '@material-ui/core'
import { ConverterAcceptance } from './ConverterAcceptance'
import { Balance } from 'components'
import { getDisplayBalance } from 'utils'
import { useTokenBalance } from 'hooks/useTokenBalance'


export const ConverterForm = () => {
  const { amount, error, setAmount } = useConverter()
  
  const uniCore = useUniCore()
  const uniCoreLpAddress = useMemo(() => {
    return getUniCoreLpAddress(uniCore)
  })
  const tokenBalance = useTokenBalance(uniCoreLpAddress)

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
        error={error}
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
