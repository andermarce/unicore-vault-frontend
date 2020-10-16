import { useCallback, useEffect, useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useBlock } from 'hooks/useBlock'
import { useWallet } from 'use-wallet'
import { useUniCore } from 'hooks/useUniCore'
import { getUniCoreContract } from 'UniCore'
import { getEthContributedBy } from 'UniCore/utils'


export const useAddressLocked = () => {
  const [addressLocked, setTotalLocked] = useState(new BigNumber(0))
  const { account, ethereum } = useWallet()
  const block = useBlock()
  const uniCore = useUniCore()

  const uniCoreContract = useMemo(() => {
    return getUniCoreContract(uniCore)
  }, [uniCore])

  const fetchLocked = useCallback(async () => {
    const locked = await getEthContributedBy(uniCoreContract, account)
    setTotalLocked(new BigNumber(locked))
  }, [account, uniCoreContract, setTotalLocked])

  useEffect(() => {
    if (ethereum && account) {
      fetchLocked()
    }
  }, [ethereum, account, block, fetchLocked])

  return addressLocked
}