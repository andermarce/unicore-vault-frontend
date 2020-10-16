import React, { useMemo } from 'react'
import { useAllowance } from 'hooks/useAllowance'
import { useApprove } from 'hooks/useApprove'
import { Flex } from 'components'
import { Button } from '@material-ui/core'
import { getVaultContract, getVaultAddress, getUniCoreContract } from 'UniCore'
import { useUniCore } from 'hooks/useUniCore'


export const VaultButtonRow = () => {
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

  const allowance = useAllowance(uniCoreContract, vaultContract)
  const { onApproveVault } = useApprove(uniCoreContract)

  return (
    <>
      {allowance.gt(0) ? (
        <Flex>
          <Button>Withdraw</Button>
          <Button>Deposit</Button>
        </Flex>
      ) : (
        <Button
          onClick={onApproveVault}
          fullWidth

        >
          Approve Vault
        </Button>
      )}
    </>
  )
}
