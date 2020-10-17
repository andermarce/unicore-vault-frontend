import React, { createContext, useCallback, useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useUniCore } from 'hooks/useUniCore'
import { useTokenBalance } from 'hooks/useTokenBalance'
import { getUniCoreLpAddress, getWrappedContract } from 'UniCore'
import { wrapUniV2 } from 'UniCore/utils'
import { useWallet } from 'use-wallet'

BigNumber.config({ 
  DECIMAL_PLACES: 18
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
    const wei = new BigNumber(tokenBalance).multipliedBy(new BigNumber(perc).div(100))
    const display = wei.div(new BigNumber(10).pow(18))
    const safeValue = uniCore.web3.utils.toWei(display.toString())
    setConverter({
      ...converter,
      fullAmount: safeValue,
      amount: display
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
