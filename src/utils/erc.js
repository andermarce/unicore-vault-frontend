import Web3 from 'web3'
import ERC20 from 'UniCore/abi/IERC20.json'

export const getContract = (provider, address) => {
  const web3 = new Web3(provider)
  const contract = new web3.eth.Contract(ERC20.abi, address)
  return contract
}

export const getAllowance = async (
  tokenContract,
  spendingAddress,
  account,
) => {
  try {
    const allowance = await tokenContract.methods
      .allowance(account, spendingAddress)
      .call()
    return allowance
  } catch (e) {
    return '0'
  }
}

export const getBalance = async (
  provider,
  tokenAddress,
  userAddress,
) => {
  const tokenContract = getContract(provider, tokenAddress)
  try {
    const balance = await tokenContract.methods
      .balanceOf(userAddress)
      .call()
    return balance
  } catch (e) {
    return '0'
  }
}