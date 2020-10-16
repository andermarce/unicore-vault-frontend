import React, { createContext, useEffect, useMemo, useState } from 'react';
import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { useUniCore } from 'hooks/useUniCore'
import { getUniCoreContract } from 'UniCore'
import { userLockEthereum } from 'UniCore/utils'

export const LockerContext = createContext({
  formState: {},
  setAmount: () => {},
  setMax: () => {},
  setChecked: () => {},
  lockEthereum: () => {}
})

const LockerProvider = ({ children }) => {
  const { account, balance, ethereum } = useWallet()
  const uniCore = useUniCore()
  
  const uniCoreContract = useMemo(() => {
    return getUniCoreContract(uniCore)
  }, [uniCore])

  const [formState, setFormState] = useState({
    amount: '0',
    checked: false,
    error: false,
    errorMessage: ''
  })

  useEffect(() => {

  })


  const handleSetAmount = (amount) => {
    const bal = uniCore.web3.utils.fromWei(balance)
    
    if (amount < 0) {
      setFormState({
        ...formState,
        amount,
        error: true
      })
    } else if (amount > bal) {
      setFormState({
        ...formState,
        amount,
        error: true
      })
    } else { // handle max contrib and limit
      setFormState({
        ...formState,
        amount,
        error: false
      })
    }
  }

  const handleSetMax = () => {
    
  }

  const handleSetChecked = () => {
    setFormState({
      ...formState,
      checked: !formState.checked
    })
  }

  const handleLockEthereum = async () => {
    const amountToSend = new BigNumber(formState.amount).times(new BigNumber(10).pow(18))
    console.log(formState, amountToSend)
    const txHash = await userLockEthereum(uniCoreContract, account, amountToSend, formState.checked)
    return txHash
  }


  return (
    <LockerContext.Provider value={{
      formState,
      setAmount: handleSetAmount,
      setMax: handleSetMax,
      setChecked: handleSetChecked,
      lockEthereum: handleLockEthereum
    }}>
      {children}
    </LockerContext.Provider>
  )
}

export default LockerProvider
