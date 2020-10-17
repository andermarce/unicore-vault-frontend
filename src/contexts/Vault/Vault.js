import React, { createContext, useCallback, useMemo, useState } from 'react'
import { getUniCoreContract, getVaultContract, getWrappedAddress } from 'UniCore'
import { useUniCore } from 'hooks/useUniCore'
import { vaultDeposit, vaultWithdraw } from 'UniCore/utils'
import { useWallet } from 'use-wallet'
import BigNumber from 'bignumber.js'
import { useTokenBalance } from 'hooks/useTokenBalance'
import { useStakedBalance } from 'hooks/useStakedBalance'

BigNumber.config({ 
  DECIMAL_PLACES: 18,
  ROUNDING_MODE: BigNumber.ROUND_FLOOR
})

export const VaultContext = createContext({
  vaultId: 0,
  vaultMethod: 'deposit',
  amount: '',
  error: false,
  errorMessage: '',
  onClaim: () => {},
  onWithdraw: () => {},
  onDeposit: () => {},
  setAmount: () => {},
  onButton: () => {},
  setMax: () => {},
  onSwitch: () => {}
})

const VaultProvider = ({ children }) => {
  const [vaultState, setVault] = useState({
    vaultId: 0,
    vaultMethod: 'deposit',
    amount: '',
    fullAmount: new BigNumber(0),
    error: false,
    errorMessage: ''
  })

  const { account, ethereum } = useWallet()
  const uniCore = useUniCore()
  const uniCoreContract = useMemo(() => {
    return getUniCoreContract(uniCore)
  }, [uniCore])
  const wrappedAddress = useMemo(() => {
    return getWrappedAddress(uniCore)
  }, [uniCore])
  const vaultContract = useMemo(() => {
    return getVaultContract(uniCore)
  }, [uniCore])

  const tokenBalance = useTokenBalance(wrappedAddress)
  const stakedBalance = useStakedBalance()

  const handleSetAmount = useCallback((amount) => {
    
    if (amount <= 0 || isNaN(amount)) {
      setVault({
        ...vaultState,
        amount,
        error: true
      })
      return
    }
    const balance = vaultState.vaultMethod === 'deposit' ? tokenBalance : stakedBalance
    const wei = new BigNumber(amount).times(new BigNumber(10).pow(18)).decimalPlaces(0)
    const display =  uniCore.web3.utils.fromWei(wei.toString())
    const safeValue = uniCore.web3.utils.toWei(display)
    if (wei.gt(balance)) {
      setVault({
        ...vaultState,
        amount,
        fullAmount: safeValue,
        error: true
      })
    } else {
      setVault({
        ...vaultState,
        amount,
        fullAmount: safeValue,
        error: false
      })
    }
  }, [vaultState, tokenBalance, setVault])

  const handleButton = useCallback((perc) => {
    const balance = vaultState.vaultMethod === 'deposit' ? tokenBalance : stakedBalance
    const wei = new BigNumber(balance).multipliedBy(new BigNumber(perc).div(100)).decimalPlaces(0)
    const display = uniCore.web3.utils.fromWei(wei.toString())
    const safeValue = uniCore.web3.utils.toWei(display)
    setVault({
      ...vaultState,
      fullAmount: safeValue,
      amount: display
    })
  }, [vaultState, tokenBalance, setVault])

  const setMax = useCallback(() => {
    const balance = vaultState.vaultMethod === 'deposit' ? tokenBalance : stakedBalance
    const display =  uniCore.web3.utils.fromWei(balance.toString())
    const safeValue = uniCore.web3.utils.toWei(display)
    setVault({
      ...vaultState,
      fullAmount: safeValue,
      amount: display
    })
  }, [vaultState, tokenBalance, setVault])

  const handleWithdraw = useCallback(async () => {
     const tx = await vaultWithdraw(vaultContract, vaultState.vaultId, account, vaultState.fullAmount)
     resetState()
     return tx
  }, [vaultContract, vaultState.vaultId, account, vaultState.fullAmount])

  const handleDeposit = useCallback(async () => {
    const tx = await vaultDeposit(vaultContract, vaultState.vaultId, account, vaultState.fullAmount)
    resetState()
    return tx
  }, [vaultContract, vaultState.vaultId, account, vaultState.fullAmount])

  const handleClaim = useCallback(async () => {
    const tx = await vaultWithdraw(vaultContract, vaultState.vaultId, account, 0)
    return tx
 }, [vaultContract, vaultState.vaultId, account])

  const handleSwitch = () => {
    if (vaultState.vaultMethod === 'deposit') {
      setVault({
        ...vaultState, 
        vaultMethod: 'withdraw',
        amount: '',
        fullAmount: new BigNumber(0),
        error: false
      })
    } else {
      setVault({
        ...vaultState, 
        vaultMethod: 'deposit',
        amount: '',
        fullAmount: new BigNumber(0),
        error: false
      })
    }
  }

  const resetState = () => {
    setVault({
      ...vaultState,
      amount: '',
      fullAmount: new BigNumber(0),
      error: false
    })
  }

  return (
    <VaultContext.Provider value={{
      vaultId: vaultState.vaultId,
      vaultMethod: vaultState.vaultMethod,
      amount: vaultState.amount,
      error: vaultState.error,
      errorMessage: vaultState.errorMessage,
      setAmount: handleSetAmount,
      onButton: handleButton,
      setMax: setMax,
      onClaim: handleClaim,
      onWithdraw: handleWithdraw,
      onDeposit: handleDeposit,
      onSwitch: handleSwitch
    }}>
      {children}
    </VaultContext.Provider>
  )
}

export default VaultProvider