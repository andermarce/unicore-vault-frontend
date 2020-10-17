import { useCallback, useEffect, useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { getStakedAmount } from 'UniCore/utils'
import { useBlock } from './useBlock'
import { getVaultContract } from 'UniCore'
import { useUniCore } from './useUniCore'

export const useStakedBalance = () => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const {
    account,
    ethereum,
  } = useWallet()
  const block = useBlock()
  const uniCore = useUniCore()
  const vaultContract = useMemo(() => {
    return getVaultContract(uniCore)
  })

  const fetchBalance = useCallback(async () => {
    const balance = await getStakedAmount(vaultContract, 0, account)
    setBalance(new BigNumber(balance))
  }, [account, ethereum, vaultContract])

  useEffect(() => {
    if (account && ethereum) {
      fetchBalance()
    }
  }, [account, ethereum, setBalance, block, vaultContract, fetchBalance])

  return balance
}