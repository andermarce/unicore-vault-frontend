import React from 'react'
import { Balance, Flex } from 'components'
import { getDisplayBalance } from 'utils'
import { usePendingRewards } from 'hooks/usePendingRewards'
import { useStakedBalance } from 'hooks/useStakedBalance'

export const VaultDisplayRow = () => {
  const stakedBalance = useStakedBalance()
  const pendingRewards = usePendingRewards()

  return (
    <Flex justifyContent="space-evenly" width="100%">
      <Balance
        title="Pending UNICORE"
        value={getDisplayBalance(pendingRewards)}
      />
      <Balance
        title="Staked REACTOR"
        value={getDisplayBalance(stakedBalance)}
      />
    </Flex>
  )
}
