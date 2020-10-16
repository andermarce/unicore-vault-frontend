import React, { useMemo } from 'react'
import { Button } from '@material-ui/core'
import { useConverter } from 'hooks/useConverter'
import { useUniCore } from 'hooks/useUniCore'
import { getUniV2Contract, getWrappedContract } from 'UniCore'
import { useAllowance } from 'hooks/useAllowance'
import { useApprove } from 'hooks/useApprove'
import ERC20 from 'UniCore/abi/IERC20.json'
import { getContract } from 'utils/erc'
import { useWallet } from 'use-wallet'

export const ConverterButton = () => {
  const { address, checked, error, onDeposit } = useConverter()
  const { ethereum } = useWallet()
  const uniCore = useUniCore()
  const wrappedContract = useMemo(() => {
    return getWrappedContract(uniCore)
  }, [uniCore])

  const uniV2Contract = useMemo(() => {
    return getContract(ethereum, address)
  }, [address, uniCore])

  const allowance = useAllowance(uniV2Contract, wrappedContract)
  const { onApproveWrapped } = useApprove(uniV2Contract)

  return (
    <Button
      disabled={allowance.gt(0) && !checked || error}
      onClick={allowance.eq(0) 
        ? onApproveWrapped
        : onDeposit
      }
      variant="contained" 
      color="secondary"
    >
      {allowance.eq(0) ? "Approve Staking" : "Deposit"}
    </Button>
  )
}
