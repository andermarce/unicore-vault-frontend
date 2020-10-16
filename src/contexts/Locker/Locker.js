import React, { createContext, useEffect, useMemo, useState } from 'react';
import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { useUniCore } from 'hooks/useUniCore'
import { getUniCoreContract } from 'UniCore'
import { userLockEthereum } from 'UniCore/utils'
import { useAddressLocked } from 'hooks/useAddressLocked';
import { useTotalLocked } from 'hooks/useTotalLocked';
import { useReactor } from 'hooks/useReactor'

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
  const { maxIndividualCap, maxTotalCap, contractEnd } = useReactor()
  const addressLocked = useAddressLocked()
  const totalLocked = useTotalLocked()
  
  const uniCoreContract = useMemo(() => {
    return getUniCoreContract(uniCore)
  }, [uniCore])

  const [formState, setFormState] = useState({
    amount: '0',
    fullAmount: new BigNumber(0),
    checked: false,
    error: false,
    errorMessage: ''
  })

  const handleSetAmount = (amount) => {
    const amt = new BigNumber(amount).times(new BigNumber(10).pow(18))
    if (amount < 0) {
      setFormState({
        ...formState,
        fullAmount: amt,
        amount,
        error: true,
        errorMessage: "Cannot lock negative or 0 ethereum"
      })
    } else if (amt.gt(balance)) {
      setFormState({
        ...formState,
        fullAmount: amt,
        amount,
        error: true,
        errorMessage: "Cannot lock more ethereum than current balance"
      })
    } else if (totalLocked.plus(amt).gt(maxTotalCap)) { // if over the max cap
      setFormState({
        ...formState,
        error: true,
        fullAmount: amt,
        amount,
        errorMessage: "Value exceeds Maximum Total Cap"
      })
    } else if (addressLocked.plus(amt).gt(maxIndividualCap)) {
      setFormState({
        ...formState,
        error: true,
        fullAmount: amt,
        amount,
        errorMessage: "Value exceeds Maximum Individual Cap"
      })
    } else { // handle max contrib and limit
      setFormState({
        ...formState,
        fullAmount: amt,
        amount,
        error: false
      })
    }
  }

  const handleSetMax = () => {
    setFormState({
      ...formState,
      fullAmount: balance,
      amount: new BigNumber(balance).div(new BigNumber(10).pow(18))
    })
  }

  const handleSetChecked = () => {
    setFormState({
      ...formState,
      checked: !formState.checked
    })
  }

  const handleLockEthereum = async () => {
    const txHash = await userLockEthereum(uniCoreContract, account, formState.fullAmount, formState.checked)
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
