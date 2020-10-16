import { useCallback, useEffect, useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useBlock } from 'hooks/useBlock'
import { useWallet } from 'use-wallet'
import { useUniCore } from 'hooks/useUniCore'
import { getUniCoreContract } from 'UniCore'
import { getTotalEthContributed } from 'UniCore/utils'

export const useTotalLocked = () => {
  const [totalLocked, setTotalLocked] = useState(new BigNumber(0))
  const { ethereum } = useWallet()
  const block = useBlock()
  const uniCore = useUniCore()

  const uniCoreContract = useMemo(() => {
    return getUniCoreContract(uniCore)
  }, [uniCore])

  const fetchLocked = useCallback(async () => {
    const locked = await getTotalEthContributed(uniCoreContract)
    setTotalLocked(new BigNumber(locked))
  }, [block, ethereum, uniCore, setTotalLocked])

  useEffect(() => {
    if (ethereum) {
      fetchLocked()
    }
  }, [block, ethereum])

  return totalLocked
}