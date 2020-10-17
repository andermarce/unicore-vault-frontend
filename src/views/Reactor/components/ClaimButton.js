import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Box, Button } from '@material-ui/core'
import { useAddressLocked } from 'hooks/useAddressLocked'
import { useUniCore } from 'hooks/useUniCore'
import { useWallet } from 'use-wallet'
import { userClaimLiquidity } from 'UniCore/utils' 
import { getUniCoreContract } from 'UniCore'
import { useReactor } from 'hooks/useReactor'

export const ClaimButton = () => {
  const { account, ethereum } = useWallet()
  const uniCore = useUniCore()
  const { contractEnd } = useReactor()
  const addressLocked = useAddressLocked()

  const uniCoreContract = useMemo(() => {
    return getUniCoreContract(uniCore)
  }, [uniCore])

  const claimWrappedTokens = useCallback(async () => {
    const txnHash = await userClaimLiquidity(uniCoreContract, account)
    return txnHash
  }, [account, uniCoreContract])

  return (
    <Box>
      <Button
        disabled={contractEnd === 0 || addressLocked.eq(0)}
        onClick={claimWrappedTokens}
        color="primary"
        variant="outlined"
      >
        Claim REACTOR
      </Button>
    </Box>
  )
}