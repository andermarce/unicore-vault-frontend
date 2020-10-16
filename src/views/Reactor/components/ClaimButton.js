import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Box, Button } from '@material-ui/core'
import { useUniCore } from 'hooks/useUniCore'
import { useWallet } from 'use-wallet'
import { userClaimLiquidity } from 'UniCore/utils' 
import { getUniCoreContract } from 'UniCore'
import { useReactor } from 'hooks/useReactor'

export const ClaimButton = () => {
  const [completed, setCompleted] = useState(0)
  const { account, ethereum } = useWallet()
  const uniCore = useUniCore()
  const { getContractComplete } = useReactor()

  const uniCoreContract = useMemo(() => {
    return getUniCoreContract(uniCore)
  }, [account, ethereum, uniCore])

  const claimWrappedTokens = useCallback(async () => {
    const txnHash = await userClaimLiquidity(uniCoreContract, account)
    return txnHash
  }, [account, ethereum, uniCore])

  useEffect(() => {
    if (ethereum) {
      setCompleted(getContractComplete)
    }
  }, [ethereum, uniCore, getContractComplete])

  return (
    <Box>
      <Button
        disabled={completed === 0}
        onClick={claimWrappedTokens}
        color="primary"
        variant="outlined"
      >
        Claim wUNI-V2
      </Button>
    </Box>
  )
}