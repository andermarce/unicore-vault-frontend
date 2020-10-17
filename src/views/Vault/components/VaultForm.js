import React, { useMemo } from 'react'
import { FormGroup, Box } from '@material-ui/core'
import { VaultButtonRow } from './VaultButtonRow'
import { VaultButtonGroup } from './VaultButtonGroup'
import { VaultInput } from './VaultInput'
import { Balance } from 'components'
import { useUniCore } from 'hooks/useUniCore'
import { getWrappedAddress } from 'UniCore'
import { getDisplayBalance } from 'utils'
import { useTokenBalance } from 'hooks/useTokenBalance'
import { VaultSwitch } from './VaultSwitch'
import { VaultClaimButton } from './VaultClaimButton'

export const VaultForm = () => {
  const uniCore = useUniCore()
  const wrappedAddress = useMemo(() => {
    return getWrappedAddress(uniCore)
  }, [uniCore])

  const tokenBalance = useTokenBalance(wrappedAddress)

  return (
    <FormGroup>
      <VaultSwitch />
      <VaultInput />
      <VaultButtonGroup />
      <VaultButtonRow />
      <VaultClaimButton />
      <Balance title="REACTOR BALANCE" value={getDisplayBalance(tokenBalance)} />
    </FormGroup>
  )
}
