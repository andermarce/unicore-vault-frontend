import React, { useMemo } from 'react'
import { Button } from '@material-ui/core'
import { useConverter } from 'hooks/useConverter'
import { useUniCore } from 'hooks/useUniCore'
import { getUniCoreLpContract, getWrappedAddress } from 'UniCore'
import { useAllowance } from 'hooks/useAllowance'
import { useApprove } from 'hooks/useApprove'
import { useWrappingRatio } from 'hooks/useWrappingRatio'

export const ConverterButton = () => {
  const { amount, checked, error, onDeposit } = useConverter()
  const wrappingRatio = useWrappingRatio()
  const uniCore = useUniCore()
  const wrappedAddress = useMemo(() => {
    return getWrappedAddress(uniCore)
  }, [uniCore])

  const uniV2Contract = useMemo(() => {
    return getUniCoreLpContract(uniCore)
  }, [uniCore])

  const allowance = useAllowance(uniV2Contract, wrappedAddress)
  const { onApproveWrapped } = useApprove(uniV2Contract)

  const isDisabled = () => {
    if (wrappingRatio.eq(0)) {
      return true
    }
    if (allowance.gt(0)) {
      if (error || !checked || isNaN(amount) || amount == 0) {
        return true
      }
    }
    return false
  }

  return (
    <Button
      disabled={isDisabled() === true}
      onClick={allowance.eq(0) 
        ? onApproveWrapped
        : onDeposit
      }
      variant="contained" 
      color="secondary"
    >
      {wrappingRatio.eq(0) ? "Wrapping not enabled yet" : (
        <>
          {allowance.eq(0) ? "Approve Wrapping" : "Wrap UNICORE UNI-V2"}
        </>
      )}
      
    </Button>
  )
}
