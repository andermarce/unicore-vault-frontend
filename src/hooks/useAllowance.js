import { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { getAllowance } from 'utils/erc'

export const useAllowance = (tokenContract, spenderContract) => {
  const [allowance, setAllowance] = useState(new BigNumber(0))
  const { account } = useWallet()

  const fetchAllowance = useCallback(async () => {
    const allowance = await getAllowance(
      tokenContract,
      spenderContract,
      account,
    )
    setAllowance(new BigNumber(allowance))
  }, [account, spenderContract, tokenContract])

  useEffect(() => {
    if (account && spenderContract && tokenContract) {
      fetchAllowance()
    }
    let refreshInterval = setInterval(fetchAllowance, 10000)
    return () => clearInterval(refreshInterval)
  }, [account, spenderContract, tokenContract])

  return allowance
}
