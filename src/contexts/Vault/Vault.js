import React, { createContext, useEffect, useState } from 'react'
import UniCore, { getUniCoreContract } from 'UniCore'
import { useWallet } from 'use-wallet'

export const VaultContext = createContext({
  vaultId: 0
})

const VaultProvider = ({ children }) => {
  const [vaultState, setVault] = useState({
    vaultId: 0,

  })

  const { address, ethereum } = useWallet()
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

  const handleWithdraw = useCallback(async () => {
     
  }, [])

  const handleDeposit = useCallback(async () => {

  }, [])

  return (
    <VaultProvider.Provider value={{
      vaultId,
      onWithdraw: handleWithdraw,
      onDeposit: handleDeposit
    }}>
      {children}
    </VaultProvider.Provider>
  )
}

export default VaultProvider