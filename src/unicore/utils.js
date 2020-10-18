import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'

// LGE TXNS

export const userLockEthereum = async (uniCoreContract, account, amount, agreement) => {
  if (agreement === false) return '0'
  try {
    const result = await uniCoreContract.methods
      .USER_PledgeLiquidity(agreement)
      .send({
        from: account,
        value: amount 
      })
      .on('transactionHash', (tx) => {
        return tx.transactionHash
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
      .on('transactionHash', (tx) => tx.transactionHash)
    return result
  } catch (e) {
    return '0'
  }
}

export const userClaimLiquidity = async (uniCoreContract, account) => {
  try {
    const result = await uniCoreContract.methods
      .USER_ClaimWrappedLiquidity()
      .send({ from: account })
      .on('transactionHash', (tx) => tx.transactionHash)
    return result
  } catch (e) {
    return '0'
  }
}

// LGE METRICS

export const getTotalEthContributed = async (uniCoreContract) => {
  try {
    const result = await uniCoreContract.methods
      .totalETHContributed()
      .call()
    return result
  } catch (e) {
    return '0'
  }
}

export const getEthContributedBy = async (uniCoreContract, account) => {
  try {
    const result = await uniCoreContract.methods
      .ethContributed(account)
      .call()
    return result
  } catch (e) {
    return '0'
  }
}

export const getIndividualCap = async (uniCoreContract) => {
  try {
    const result = await uniCoreContract.methods
      .individualCap()
      .call()
    return result
  } catch (e) {
    return '0'
  }
}

export const getTotalCap = async (uniCoreContract) => {
  try {
    const result = await uniCoreContract.methods
      .totalCap()
      .call()
    return result
  } catch (e) {
    return '0'
  }
}

export const getLpUnits = async (uniCoreContract) => {
  try {
    const result = await uniCoreContract.methods
      .LPperETHUnit()
      .call()
    return result
  } catch (e) {
    return '0'
  }
}

// LIQUIDITY EVENT TIMESTAMPS => return UNIX TS or 0

export const getContractInit = async (uniCoreContract) => {
  try {
    const result = await uniCoreContract.methods
      .contractInitialized()
      .call()
    return result
  } catch (e) {
    return 0
  }
}

export const getContractStart = async (uniCoreContract) => {
  try {
    const result = await uniCoreContract.methods
      .contractStart_Timestamp()
      .call()
    return result * 1000
  } catch (e) {
    return 0
  }
}

export const getContractComplete = async (uniCoreContract) => {
  try {
    const result = await uniCoreContract.methods
      .LGECompleted_Timestamp()
      .call()
    return result * 1000
  } catch (e) {
    return 0
  }
}

// LGE CONSTANTS => return in ms or 0

export const getContributionPhase = async (uniCoreContract) => {
  try {
    const result = await uniCoreContract.methods
      .contributionPhase()
      .call()
    return result * 1000 
  } catch (e) {
    return 0
  }
}

export const getStakingPhase = async (uniCoreContract) => {
  try {
    const result = await uniCoreContract.methods
      .stackingPhase()
      .call()
    return result * 1000
  } catch (e) {
    return 0
  }
}

// VAULT FUNCTIONS

export const vaultDeposit = async (vaultContract, vaultId, account, amount) => {
  try {
    const result = await vaultContract.methods
      .deposit(vaultId, amount)
      .send({ from: account })
      .on('transactionHash', (tx) => tx.transactionHash)
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
      .on('transactionHash', (tx) => tx.transactionHash)
    return result
  } catch (e) {
    return '0'
  }
}

export const getStakedAmount = async (vaultContract, vaultId, account) => {
  try {
    
    const result = await vaultContract.methods
      .userInfo(vaultId, account)
      .call()
    return result.amount
  } catch (e) {
    return '0'
  }
}

export const getPendingRewards = async (vaultContract, vaultId, account) => {
  try {
    const result = await vaultContract.methods
      .pendingUniCore(vaultId, account)
      .call()
    return result
  }catch (e) {
    return '0'
  }
}

export const getAvgFees = async (vaultContract) => {
  try {
    const result = await vaultContract.methods
      .averageFeesPerBlockSinceStart()
      .call()
    return result
  } catch (e) {
    return '0'
  }
}

export const getBlockEpochFees = async (vaultContract) => {
  try {
    const result = await vaultContract.methods
      .averageFeesPerBlockEpoch()
      .call()
    return result
  } catch (e) {
    return '0'
  }
}

// wUNIV2
export const getUniV2Address = async (uniCoreContract) => {
  try {
    const result = await uniCoreContract.methods
      .viewUNIv2()
      .call()
    return result
  } catch (e) {
    return '0'
  }
}


export const wrapUniV2 = async (wrappedContract, account, amount) => {
  try {
    const result = await wrappedContract.methods
      .wrapUNIv2(amount)
      .send({ from: account})
      .on('transactionHash', (tx) => tx.transactionHash)
    return result
  } catch (e) {
    return '0'
  }
}

export const getWrappingRatio = async (wrappedContract) => {
  try {
    const result = await wrappedContract.methods
      .viewPublicWrappingRatio()
      .call()
    return result
  } catch (e) {
    return '0'
  }
}

// Approval

export const approve = async (tokenContract, spenderAddress, account) => {
    try {
      // const amount = new BigNumber()
      const tx = tokenContract.methods
      .approve(spenderAddress,  ethers.constants.MaxUint256.toString())
      .send({ from: account })
      .on('transactionHash',(tx) => tx.transactionHash)
      return tx
    } catch (e) {
      return false
    }
}