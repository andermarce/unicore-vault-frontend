
// LIQUIDITY EVENT FUNCTIONS

export const userAddLiquidity = async (uniCoreContract, account, amount) => {
  try {
    const result = await uniCoreContract.methods
      .USER_addLiquidity(true)
      .send({
        from: account,
        value: amount 
      })
    return result
  } catch (e) {
    return '0'
  }
}

export const poolCreateLiquidity = async (uniCoreContract, account) => {
  try {
    const result = await uniCoreContract.methods
      .POOL_CreateLiquidity()
      .send({ from: account })
    return result
  } catch (e) {
    return '0'
  }
}

export const userClaimLiquidity = async (uniCoreContract, account) => {
  try {
    const result = await uniCoreContract.methods
      .USER_RemoveLiquidity()
      .send({ from: account })
    return result
  } catch (e) {
    return '0'
  }
}

// VAULT FUNCTIONS

export const vaultDeposit = async (vaultContract, vaultId, account, amount) => {
  try {
    const result = await vaultContract.methods
      .deposit(vaultId, amount)
      .send({ from: account })
    return result
  } catch (e) {
    return '0'
  }
}

export const vaultWithdraw = async (vaultContract, vaultId, account, amount) => {
  try {
    const result = await vaultContract.methods
      .withdraw(vaultId, amount)
      .send({ from: account })
    return result
  } catch (e) {
    return '0'
  }
}

export const vaultClaimRewards = async (vaultContract, vaultId, account) => {
  try {
    const result = await vaultContract.methods
      .claim(vaultId)
      .send({ from: account })
    return result
  }catch (e) {
    return '0'
  }
}