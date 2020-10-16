
import { useCallback } from 'react'
import { useUniCore } from './useUniCore'
import { useWallet } from 'use-wallet'
import { approve } from 'UniCore/utils'
import { getWrappedContract, getVaultContract, getWrappedAddress } from 'UniCore'

export const useApprove = (tokenContract) => {
  const { account } = useWallet()
  const uniCore = useUniCore()
  const wrappedContract = getWrappedContract(uniCore)
  const vaultContract = getVaultContract(uniCore)

  const handleApproveWrapped = async () => {
    try {
      console.log(tokenContract, wrappedContract, account)
      const tx = await approve(tokenContract, wrappedContract, account)
      console.log(tx)
      return tx
    } catch (e) {
      return false
    }
  }

  const handleApproveVault = async () => {
    try {
      const tx = await approve(tokenContract, vaultContract, account)
      return tx
    } catch (e) {
      return false
    }
  }

  return { 
    onApproveWrapped: handleApproveWrapped,
    onApproveVault: handleApproveVault
  }
}