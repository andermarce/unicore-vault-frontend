import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useUniCore } from 'hooks/useUniCore'
import { useAllowance } from 'hooks/useAllowance'
import { useApprove } from 'hooks/useApprove' 
import { useTokenBalance } from 'hooks/useTokenBalance'
import { getUniV2Address } from 'UniCore/utils'
import { getWrappedContract, getWrappedAddress, getUniCoreContract } from 'UniCore'

export const ConverterContext = createContext({
  address: '0x',
  amount: '0',
  checked: false,
  error: false,
  setAmount: () => {},
  onButton: () => {},
  setMax: () => {},
  setChecked: () => {}
})

const ConverterProvider = ({ children }) => {
  const [converter, setConverter] = useState({
    amount: '0',
    fullAmount: new BigNumber(0),
    checked: false,
    error: false
  })

  const uniCore = useUniCore()
  const uniCoreContract = useMemo(() => {
    return getUniCoreContract(uniCore)
  })
  const wrappedContract = useMemo(() => {
    return getWrappedContract(uniCore)
  }, [uniCore])

  const tokenBalance = useTokenBalance(getWrappedAddress(uniCore))

  const handleSetAmount = (amount) => {
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
  }

  const handleButton = (perc) => {
    const wei = tokenBalance.times(perc/100)
    setConverter({
      ...converter,
      fullAmount: wei,
      amount: wei.div(new BigNumber(10).pow(18))
    })
  }

  const setMax = () => {
    setConverter({
      ...converter,
      fullAmount: tokenBalance,
      amount: new BigNumber(tokenBalance).div(new BigNumber(10).pow(18))
    })
  }

  const handleChecked = () => {
    setConverter({
      ...converter,
      checked: !converter.checked
    })
  }

  const fetchUniV2Address = useCallback(async () => {
    const address = await getUniV2Address(uniCoreContract)
    setConverter({
      ...converter,
      address
    })
  }, [uniCore, setConverter])

  useEffect(() => {
    if (uniCore) {
      fetchUniV2Address()
    }
  }, [uniCore,])


  return (
    <ConverterContext.Provider value={{
      address: converter.address,
      amount: converter.amount,
      checked: converter.checked,
      error: converter.error,
      setAmount: handleSetAmount,
      onButton: handleButton,
      setMax,
      setChecked: handleChecked
    }}>
      {children}
    </ConverterContext.Provider>
  )
}

export default ConverterProvider
