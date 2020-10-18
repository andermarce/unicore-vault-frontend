import React, { useCallback, useMemo } from 'react'
import { Button } from '@material-ui/core'
import { useWallet } from 'use-wallet'
import { useUniCore } from 'hooks/useUniCore'
import { getUniCoreContract } from 'UniCore'
import { poolCreateLiquidity } from 'UniCore/utils'

export const LiquidityButton = () => {
  const { account } = useWallet()
  const uniCore = useUniCore()

  const uniCoreContract = useMemo(() => {
    return getUniCoreContract(uniCore)
  }, [uniCore])

  const createLiquidity = useCallback(async () => {
    const txHash = await poolCreateLiquidity(uniCoreContract, account)
    return txHash
  }, [account, uniCoreContract])

  return (
    <Button
      disabled={false}
      onClick={createLiquidity}
      color="primary"
      variant="contained"
    >
      INITIATE FUSION
    </Button>
  )
}
