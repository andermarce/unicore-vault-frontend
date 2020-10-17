import { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { getAllowance } from 'utils/erc'

export const useAllowance = (tokenContract, spenderAddress) => {
  const [allowance, setAllowance] = useState(new BigNumber(0))
  const { account } = useWallet()

  const fetchAllowance = useCallback(async () => {
    const allowance = await getAllowance(
      tokenContract,
      spenderAddress,
      account,
    )
    setAllowance(new BigNumber(allowance))
  }, [account, spenderAddress, tokenContract])

  useEffect(() => {
    if (account && spenderAddress && tokenContract) {
      fetchAllowance()
    }
    let refreshInterval = setInterval(fetchAllowance, 10000)
    return () => clearInterval(refreshInterval)
  }, [account, spenderAddress, tokenContract])

  return allowance
}
