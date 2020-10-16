import { useCallback, useEffect, useMemo, useState } from 'react'
import { useBlock } from 'hooks/useBlock'
import { useWallet } from 'use-wallet'
import { useUniCore } from 'hooks/useUniCore'
import { getUniCoreContract } from 'UniCore'
import { getEthContributedBy } from 'UniCore/utils'
import { getDisplayBalance } from 'utils'

export const useAddressLocked = () => {
  const [addressLocked, setTotalLocked] = useState('0')
  const { account, ethereum } = useWallet()
  const block = useBlock()
  const uniCore = useUniCore()

  const uniCoreContract = useMemo(() => {
    return getUniCoreContract(uniCore)
  }, [uniCore])

  const fetchLocked = useCallback(async () => {
    const locked = await getEthContributedBy(uniCoreContract, account)
    const display = getDisplayBalance(uniCore.toBigN(locked))
    setTotalLocked(display)
  }, [account, block, ethereum, uniCore, setTotalLocked])

  useEffect(() => {
    if (ethereum && account) {
      fetchLocked()
    }
  }, [block, ethereum, account])

  return addressLocked
}