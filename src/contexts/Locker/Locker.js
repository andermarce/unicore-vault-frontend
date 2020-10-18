import React, { createContext, useCallback, useMemo, useState } from 'react';
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
  onButton: () => {},
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
    amount: '',
    fullAmount: new BigNumber(0),
    checked: false,
    error: false,
    errorMessage: ''
  })

  const handleSetAmount = useCallback((amount) => {

    if (amount <= 0 || isNaN(amount)) {
      setFormState({
        ...formState,
        amount,
        error: true,
        errorMessage: "Invalid Input"
      })
      return
    }

    const amt = new BigNumber(amount).times(new BigNumber(10).pow(18))
    if (amt.gt(balance)) {
      setFormState({
        ...formState,
        amount,
        error: true,
        errorMessage: "Value exceeds balance"
      })
    } else if (totalLocked.plus(amt).gt(maxTotalCap)) { // if over the max cap
      setFormState({
        ...formState,
        error: true,
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
  }, [formState, setFormState, balance, maxIndividualCap, maxTotalCap])

  const handleButton = useCallback((amount) => {
    let amt = new BigNumber(amount).times(new BigNumber(10).pow(18))
    const bal = new BigNumber(balance)
    if (amt.gt(bal)) {
      amt = bal
    }
    if (totalLocked.plus(amt).gt(maxTotalCap)) {
      amt = maxTotalCap.minus(totalLocked)
    }
    if (addressLocked.plus(amt).gt(maxIndividualCap)) {
      amt = maxIndividualCap.minus(addressLocked)
    }
    setFormState({
      ...formState,
      fullAmount: amt,
      amount: new BigNumber(amt).div(new BigNumber(10).pow(18))
    })
  }, [balance, addressLocked, totalLocked, maxIndividualCap, maxTotalCap, formState, setFormState])

  const handleSetMax = useCallback(() => {
    handleButton(balance)
  }, [handleButton, balance])

  const handleSetChecked = useCallback(() => {
    setFormState({
      ...formState,
      checked: !formState.checked
    })
  }, [formState, setFormState])

  const handleLockEthereum = useCallback(async () => {
    const txHash = await userLockEthereum(uniCoreContract, account, formState.fullAmount, formState.checked)
    resetState()
    return txHash
  }, [account, uniCoreContract, formState.fullAmount, formState.checked])

  const resetState = () => {
    setFormState({
      ...formState,
      amount: '',
      fullAmount: new BigNumber(0),
      checked: false,
      error: false,
      errorMessage: ''
    })
  }

  return (
    <LockerContext.Provider value={{
      amount: formState.amount,
      checked: formState.checked,
      error: formState.error,
      errorMessage: formState.errorMessage,
      setAmount: handleSetAmount,
      onButton: handleButton,
      setMax: handleSetMax,
      setChecked: handleSetChecked,
      lockEthereum: handleLockEthereum
    }}>
      {children}
    </LockerContext.Provider>
  )
}

export default LockerProvider
