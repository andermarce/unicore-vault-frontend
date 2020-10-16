
import { useCallback } from 'react'
import { useUniCore } from './useUniCore'
import { useWallet } from 'use-wallet'
import { approve } from '../UniCore/utils'
import { getUniCoreContract, getVaultContract } from 'UniCore'

export const useApprove = (tokenContract) => {
  const { account } = useWallet()
  const uniCore = useUniCore()
  const uniCoreContract = getUniCoreContract(uniCore)
  const vaultContract = getVaultContract(uniCore)

  const handleApproveUniCore = useCallback(async () => {
    try {
      const tx = await approve(tokenContract, uniCoreContract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, address, uniCoreContract])

  const handleApproveVault = useCallback(async () => {
    try {
      const tx = await approve(tokenContract, vaultContract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, address, vaultContract])

  return { 
    onApproveUniCore: handleApproveUniCore,
    onApproveVault: handleApproveVault
  }
}