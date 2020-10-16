import React, { useMemo } from 'react'
import { Balance, Flex } from 'components'
import { useTokenBalance } from 'hooks/useTokenBalance'
import { useUniCore } from 'hooks/useUniCore'
import { getUniCoreAddress } from 'UniCore'
import { getDisplayBalance } from 'utils'

export const BalanceRow = () => {
  const uniCore = useUniCore()

  const uniCoreAddress = useMemo(() => {
    return getUniCoreAddress(uniCore)
  }, [uniCore])

  const wrappedAddress = useMemo(() => {
    return getUniCoreAddress(uniCore)
  }, [uniCore])

  const uniCoreBalance = useTokenBalance(uniCoreAddress)
  const wrappedBalance = useTokenBalance(wrappedAddress)

  return (
    <Flex justifyContent="space-evenly" width="100%">
      <Balance
        title="UNICORE"
        value={getDisplayBalance(uniCoreBalance)}
      />
      <Balance
        title="wUNIV2"
        value={getDisplayBalance(wrappedBalance)}
      />
    </Flex>
  )
}
