import React, { createContext, useCallback, useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useUniCore } from 'hooks/useUniCore'
import { useTokenBalance } from 'hooks/useTokenBalance'
import { getUniCoreLpAddress, getWrappedContract } from 'UniCore'
import { wrapUniV2 } from 'UniCore/utils'
import { useWallet } from 'use-wallet'

BigNumber.config({ 
  DECIMAL_PLACES: 18,
  ROUNDING_MODE: BigNumber.ROUND_FLOOR
})

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
  const { account } = useWallet()
  const [converter, setConverter] = useState({
    amount: '',
    fullAmount: new BigNumber(0),
    checked: false,
    error: false
  })

  const uniCore = useUniCore()
  const lpAddress = useMemo(() => {
    return getUniCoreLpAddress(uniCore)
  }, [uniCore])
  const wrappedContract = useMemo(() => {
    return getWrappedContract(uniCore)
  }, [uniCore])

  const tokenBalance = useTokenBalance(lpAddress)

  const handleSetAmount = useCallback((amount) => {
    if (amount <= 0 || isNaN(amount)) {
      setConverter({
        ...converter,
        amount,
        error: true
      })
      return
    }

    const wei = new BigNumber(amount).times(new BigNumber(10).pow(18)).decimalPlaces(0)
    const display =  uniCore.web3.utils.fromWei(wei.toString())
    const safeValue = uniCore.web3.utils.toWei(display)
    
    if (wei.gt(tokenBalance)) {
      setConverter({
        ...converter,
        amount,
        error: true
      })
    } else {
      setConverter({
        ...converter,
        amount,
        fullAmount: safeValue,
        error: false
      })
    }
  }, [converter, tokenBalance, setConverter])

  const handleButton = useCallback((perc) => {
    const wei = new BigNumber(tokenBalance).multipliedBy(new BigNumber(perc).div(100)).decimalPlaces(0)
    const display =  uniCore.web3.utils.fromWei(wei.toString())
    const safeValue = uniCore.web3.utils.toWei(display)
    setConverter({
      ...converter,
      fullAmount: safeValue,
      amount: display
    })
  }, [converter, tokenBalance, setConverter])

  const setMax = useCallback(() => {
    const display =  uniCore.web3.utils.fromWei(tokenBalance.toString())
    const safeValue = uniCore.web3.utils.toWei(display)
    setConverter({
      ...converter,
      fullAmount: safeValue,
      amount: display
    })
  }, [converter, tokenBalance, setConverter])

  const handleChecked = useCallback(() => {
    setConverter({
      ...converter,
      checked: !converter.checked
    })
  }, [converter, setConverter])

  const handleDeposit = useCallback(async () => {
    const tx = await wrapUniV2(wrappedContract, account, converter.fullAmount)
    return tx
  }, [account, wrappedContract, converter.fullAmount])

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
