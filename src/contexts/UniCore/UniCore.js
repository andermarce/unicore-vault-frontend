import React, { createContext, useEffect, useState } from 'react'
import UniCore from 'UniCore'
import { useWallet } from 'use-wallet'

export const UniCoreContext = createContext({
  uniCore: undefined
})

const UniCoreProvider = ({ children }) => {
  const { ethereum } = useWallet()
  const [uniCore, setUniCore] = useState()

  window.eth = ethereum

  useEffect(() => {
    if (ethereum) {
      const networkId = Number(ethereum.chainId)
      const uniCoreLib = new UniCore(ethereum, networkId, ethereum.selectedAddress);
      setUniCore(uniCoreLib)
    }
  }, [ethereum])

  return (
    <UniCoreContext.Provider value={{
      uniCore
    }}>
      {children}
    </UniCoreContext.Provider>
  )
}

export default UniCoreProvider