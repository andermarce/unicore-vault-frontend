import { useCallback, useEffect, useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useBlock } from 'hooks/useBlock'
import { useWallet } from 'use-wallet'
import { useUniCore } from 'hooks/useUniCore'
import { getWrappedContract } from 'UniCore'
import { getWrappingRatio } from 'UniCore/utils'

export const useWrappingRatio = () => {
  const [wrappingRatio, setWrappingRatio] = useState(new BigNumber(0))
  const { ethereum } = useWallet()
  const block = useBlock()
  const uniCore = useUniCore()

  const wrappedContract = useMemo(() => {
    return getWrappedContract(uniCore)
  }, [uniCore])

  const fetchRatio = useCallback(async () => {
    const ratio = await getWrappingRatio(wrappedContract)
    setWrappingRatio(new BigNumber(ratio))
  }, [block, ethereum, uniCore, setWrappingRatio, wrappedContract])

  useEffect(() => {
    if (ethereum) {
      fetchRatio()
    }
  }, [block, ethereum])

  return wrappingRatio
}