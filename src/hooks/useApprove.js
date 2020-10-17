
import { useCallback, useMemo } from 'react'
import { useUniCore } from './useUniCore'
import { useWallet } from 'use-wallet'
import { approve } from 'UniCore/utils'
import { getVaultAddress, getWrappedAddress } from 'UniCore'

export const useApprove = (tokenContract) => {
  const { account } = useWallet()
  const uniCore = useUniCore()
  const wrappedAddress = useMemo(() => {
    return getWrappedAddress(uniCore)
  }, [uniCore])
  const vaultAddress = useMemo(() => {
    return getVaultAddress(uniCore)
  }, [uniCore])

  const handleApproveWrapped = async () => {
    try {
      const tx = await approve(tokenContract, wrappedAddress, account)
      return tx
    } catch (e) {
      return false
    }
  }

  const handleApproveVault = async () => {
    try {
      const tx = await approve(tokenContract, vaultAddress, account)
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