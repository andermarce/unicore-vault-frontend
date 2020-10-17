import React, { createContext, useCallback, useMemo, useState } from 'react'
import { getUniCoreContract, getVaultContract, getWrappedAddress } from 'UniCore'
import { useUniCore } from 'hooks/useUniCore'
import { vaultDeposit, vaultWithdraw } from 'UniCore/utils'
import { useWallet } from 'use-wallet'
import BigNumber from 'bignumber.js'
import { useTokenBalance } from 'hooks/useTokenBalance'

export const VaultContext = createContext({
  vaultId: 0,
  amount: '',
  error: false,
  errorMessage: '',
  onClaim: () => {},
  onWithdraw: () => {},
  onDeposit: () => {},
  setAmount: () => {},
  onButton: () => {},
  setMax: () => {},
})

const VaultProvider = ({ children }) => {
  const [vaultState, setVault] = useState({
    vaultId: 0,
    amount: '',
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

  const handleSetAmount = useCallback((amount) => {
    const wei = new BigNumber(amount).times(new BigNumber(10).pow(18))
    if (amount < 0) {
      setVault({
        ...vaultState,
        amount,
        fullAmount: wei,
        error: true
      })
    } else if (wei.gt(tokenBalance)) {
      setVault({
        ...vaultState,
        amount,
        fullAmount: wei,
        error: true
      })
    } else {
      setVault({
        ...vaultState,
        amount,
        fullAmount: wei,
        error: false
      })
    }
  }, [vaultState, tokenBalance, setVault])

  const handleButton = useCallback((perc) => {
    const wei = tokenBalance.times(perc/100)
    setVault({
      ...vaultState,
      fullAmount: wei,
      amount: wei.div(new BigNumber(10).pow(18))
    })
  }, [vaultState, tokenBalance, setVault])

  const setMax = useCallback(() => {
    setVault({
      ...vaultState,
      fullAmount: tokenBalance,
      amount: new BigNumber(tokenBalance).div(new BigNumber(10).pow(18))
    })
  }, [vaultState, tokenBalance, setVault])

  const handleWithdraw = useCallback(async () => {
     const tx = await vaultWithdraw(vaultContract, vaultState.vaultId, account, vaultState.fullAmount)
     return tx
  }, [vaultContract, vaultState.vaultId, account, vaultState.amount])

  const handleClaim = useCallback(async () => {
    const tx = await vaultWithdraw(vaultContract, vaultState.vaultId, account, 0)
    return tx
 }, [vaultContract, vaultState.vaultId, account])

  const handleDeposit = useCallback(async () => {
    const tx = await vaultDeposit(vaultContract, vaultState.vaultId, account, 0)
    return tx
  }, [vaultContract, vaultState.vaultId, account, vaultState.amount])

  return (
    <VaultContext.Provider value={{
      vaultId: vaultState.vaultId,
      amount: vaultState.amount,
      error: vaultState.error,
      errorMessage: vaultState.errorMessage,
      setAmount: handleSetAmount,
      onButton: handleButton,
      setMax: setMax,
      onClaim: handleClaim,
      onWithdraw: handleWithdraw,
      onDeposit: handleDeposit
    }}>
      {children}
    </VaultContext.Provider>
  )
}

export default VaultProvider