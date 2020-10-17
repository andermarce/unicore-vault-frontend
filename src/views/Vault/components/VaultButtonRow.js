import React, { useMemo } from 'react'
import { useAllowance } from 'hooks/useAllowance'
import { useApprove } from 'hooks/useApprove'
import { Flex } from 'components'
import { Button, Box } from '@material-ui/core'
import { getVaultContract, getVaultAddress, getWrappedContract } from 'UniCore'
import { useUniCore } from 'hooks/useUniCore'
import { useVault } from 'hooks/useVault'

export const VaultButtonRow = () => {
  const { error, amount, onDeposit, onWithdraw, vaultMethod } = useVault()

  const uniCore = useUniCore()
  const wrappedContract = useMemo(() => {
    return getWrappedContract(uniCore)
  }, [uniCore])
  const vaultAddress = useMemo(() => {
    return getVaultAddress(uniCore)
  }, [uniCore])

  const allowance = useAllowance(wrappedContract, vaultAddress)
  const { onApproveVault } = useApprove(wrappedContract)

  return (
    <Box marginY={1}>
      {allowance.gt(0) ? (
        <>
          {vaultMethod === 'withdraw' ? (
            <Button
              disabled={error || isNaN(amount) || amount === '0' || amount === ''}
              onClick={onWithdraw}
              variant="contained" 
              color="secondary"
              fullWidth
            >
              Withdraw
            </Button>
          ) : (
            <Button
              disabled={error || isNaN(amount) || amount === '0' || amount === ''}
              onClick={onDeposit}
              variant="contained" 
              color="secondary"
              fullWidth
            >
              Deposit
            </Button>
          )}
        </>
      ) : (
        <Button
          onClick={onApproveVault}
          variant="contained" 
          color="secondary"
          fullWidth
        >
          Approve Vault
        </Button>
      )}
    </Box>
  )
}
