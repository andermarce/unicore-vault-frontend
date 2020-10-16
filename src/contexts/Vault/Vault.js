import React, { createContext, useEffect, useState } from 'react'
import UniCore from 'UniCore'
import { useWallet } from 'use-wallet'

export const VaultContext = createContext({
  vault: undefined
})

const VaultProvider = ({ children }) => {
  const { address, ethereum } = useWallet()
  const uniCore = useUniCore()
  
  const vaultContract = useMemo(() => {
    return getVaultContract(uniCore)
  }, [uniCore])

  useEffect(() => {
    // if (ethereum) {
    //   console.log('init')
    //   const networkId = Number(ethereum.chainId)
    //   const uniCoreLib = new UniCore(ethereum, networkId, ethereum.selectedAddress);
    //   setUniCore(uniCoreLib)
    // }
  }, [ethereum])

  return (
    <VaultProvider.Provider value={{
      
    }}>
      {children}
    </VaultProvider.Provider>
  )
}

export default VaultProvider