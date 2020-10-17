import React, { useMemo } from 'react'
import { useAllowance } from 'hooks/useAllowance'
import { useApprove } from 'hooks/useApprove'
import { Flex } from 'components'
import { Button, Box } from '@material-ui/core'
import { getVaultContract, getVaultAddress, getUniCoreContract } from 'UniCore'
import { useUniCore } from 'hooks/useUniCore'
import { useVault } from 'hooks/useVault'

export const VaultButtonRow = () => {
  const { error, amount, onDeposit, onWithdraw } = useVault()

  const uniCore = useUniCore()
  const uniCoreContract = useMemo(() => {
    return getUniCoreContract(uniCore)
  }, [uniCore])
  const vaultAddress = useMemo(() => {
    return getVaultAddress(uniCore)
  }, [uniCore])
  const vaultContract = useMemo(() => {
    return getVaultContract(uniCore)
  }, [uniCore])

  const allowance = useAllowance(uniCoreContract, vaultAddress)
  const { onApproveVault } = useApprove(uniCoreContract)

  return (
    <Box marginY={1}>
      {allowance.gt(0) ? (
        <Flex>
          <Box flex={1} paddingRight={1}>
            <Button
              disabled={error || isNaN(amount) || amount === '0' || amount === ''}
              onClick={onWithdraw}
              variant="contained" 
              color="secondary"
              fullWidth
            >
              Withdraw
            </Button>
          </Box>
          <Box flex={1} paddingLeft={1}>
            <Button
              disabled={error || isNaN(amount) || amount === '0' || amount === ''}
              onClick={onDeposit}
              variant="contained" 
              color="secondary"
              fullWidth
            >
              Deposit
            </Button>
          </Box>
          
        </Flex>
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
