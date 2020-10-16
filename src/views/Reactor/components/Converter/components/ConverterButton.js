import React, { useMemo } from 'react'
import { Button } from '@material-ui/core'
import { useConverter } from 'hooks/useConverter'
import { useUniCore } from 'hooks/useUniCore'
import { getUniCoreLpContract, getWrappedContract } from 'UniCore'
import { useAllowance } from 'hooks/useAllowance'
import { useApprove } from 'hooks/useApprove'

export const ConverterButton = () => {
  const { amount, checked, error, onDeposit } = useConverter()
  const uniCore = useUniCore()
  const wrappedContract = useMemo(() => {
    return getWrappedContract(uniCore)
  }, [uniCore])

  const uniV2Contract = useMemo(() => {
    return getUniCoreLpContract(uniCore)
  }, [uniCore])

  const allowance = useAllowance(uniV2Contract, wrappedContract)
  const { onApproveWrapped } = useApprove(uniV2Contract)

  const isDisabled = () => {
    if (allowance.gt(0)) {
      if (error || !checked) {
        return true
      }
    }
    return false
  }

  return (
    <Button
      disabled={() => isDisabled()}
      onClick={allowance.eq(0) 
        ? onApproveWrapped
        : onDeposit
      }
      variant="contained" 
      color="secondary"
    >
      {allowance.eq(0) ? "Approve Wrapping" : "Wrap UNICORE UNI-V2"}
    </Button>
  )
}
