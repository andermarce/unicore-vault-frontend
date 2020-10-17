import { useCallback, useEffect, useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { useBlock } from './useBlock'
import { useUniCore } from './useUniCore'
import { getPendingRewards } from 'UniCore/utils'
import { getVaultContract } from 'UniCore'

export const usePendingRewards = () => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const {
    account,
    ethereum,
  } = useWallet()
  const block = useBlock()
  const uniCore = useUniCore()

  const vaultContract = useMemo(() => {
    return getVaultContract(uniCore)
  }, [uniCore])

  const fetchBalance = useCallback(async () => {
    const balance = await getPendingRewards(vaultContract, 0, account)
    setBalance(new BigNumber(balance))
  }, [account, ethereum, vaultContract])

  useEffect(() => {
    if (account && ethereum) {
      fetchBalance()
    }
  }, [account, ethereum, setBalance, block, fetchBalance])

  return balance
}