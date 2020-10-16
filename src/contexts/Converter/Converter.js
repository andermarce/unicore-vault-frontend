import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useUniCore } from 'hooks/useUniCore'
import { useAllowance } from 'hooks/useAllowance'
import { useApprove } from 'hooks/useApprove' 
import { useTokenBalance } from 'hooks/useTokenBalance'
import { getWrappedContract, getWrappedAddress, getUniCoreContract } from 'UniCore'

export const ConverterContext = createContext({
  amount: '0',
  checked: false,
  error: false,
  setAmount: () => {},
  onButton: () => {},
  setMax: () => {},
  setChecked: () => {},
  onDeposit: () => {}
})

const ConverterProvider = ({ children }) => {
  const [converter, setConverter] = useState({
    amount: '',
    fullAmount: new BigNumber(0),
    checked: false,
    error: false
  })

  const uniCore = useUniCore()
  const wrappedAddress = useMemo(() => {
    return getWrappedAddress(uniCore)
  }, [uniCore])
  const wrappedContract = useMemo(() => {
    return getWrappedContract(uniCore)
  }, [uniCore])

  const tokenBalance = useTokenBalance(wrappedAddress)

  const handleSetAmount = useCallback((amount) => {
    const wei = new BigNumber(amount).times(new BigNumber(10).pow(18))
    if (amount < 0) {
      setConverter({
        ...converter,
        amount,
        fullAmount: wei,
        error: true
      })
    } else if (wei.gt(tokenBalance)) {
      setConverter({
        ...converter,
        amount,
        fullAmount: wei,
        error: true
      })
    } else {
      setConverter({
        ...converter,
        amount,
        fullAmount: wei,
        error: false
      })
    }
  }, [converter, tokenBalance, setConverter])

  const handleButton = useCallback((perc) => {
    const wei = tokenBalance.times(perc/100)
    setConverter({
      ...converter,
      fullAmount: wei,
      amount: wei.div(new BigNumber(10).pow(18))
    })
  }, [converter, tokenBalance, setConverter])

  const setMax = useCallback(() => {
    setConverter({
      ...converter,
      fullAmount: tokenBalance,
      amount: new BigNumber(tokenBalance).div(new BigNumber(10).pow(18))
    })
  }, [converter, tokenBalance, setConverter])

  const handleChecked = useCallback(() => {
    setConverter({
      ...converter,
      checked: !converter.checked
    })
  }, [converter, setConverter])

  const handleDeposit = () => {

  }

  return (
    <ConverterContext.Provider value={{
      amount: converter.amount,
      checked: converter.checked,
      error: converter.error,
      setAmount: handleSetAmount,
      onButton: handleButton,
      setMax,
      setChecked: handleChecked,
      onDeposit: handleDeposit
    }}>
      {children}
    </ConverterContext.Provider>
  )
}

export default ConverterProvider
