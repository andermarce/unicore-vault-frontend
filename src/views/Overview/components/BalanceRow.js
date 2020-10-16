import React from 'react'
import { Balance, Column, Flex } from 'components'

export const BalanceRow = () => {
  return (
    <Flex justifyContent="space-around" width="100%">
      <Balance
        title="UNICORE"
        value={100}
      />
      <Balance
        title="wUNIV2"
        value={100}
      />
    </Flex>
  )
}
