import BigNumber from 'bignumber.js/bignumber'
import ERC20 from '../abi/IERC20.json'
import UniCore from '../abi/masterchef.json'
import UniCoreVault from '../abi/sushi.json'
import IWETH from '../abi/IWETH.json'
import Addresses from './addresses'

export class Contracts {
  constructor(provider, networkId, web3) {
    this.web3 = web3

    this.uniCore = new this.web3.eth.Contract(UniCore.abi)
    this.uniCoreVault = new this.web3.eth.Contract(UniCoreVault.abi)
    this.weth = new this.web3.eth.Contract(IWETH.abi)

    this.vaults = Addresses[networkId].vaults.map((vault) => ({
      vaultAddress: vault.vaultAddress,
      tokenAddress: vault.tokenAddress,
      lpContract: new this.web3.eth.Contract(UNIV2PairAbi),
      tokenContract: new this.web3.eth.Contract(ERC20.abi),
    }))

    this.setProvider(provider, networkId)
    this.setDefaultAccount(this.web3.eth.defaultAccount)
  }

  setProvider(provider, networkId) {
    const setProvider = (contract, address) => {
      contract.setProvider(provider)
      if (address) contract.options.address = address
      else console.error('Contract address not found in network', networkId)
    }

    setProvider(this.uniCore, Addresses[networkId].uniCore)
    setProvider(this.uniCoreVault, Addresses[networkId].uniCoreVault)
    setProvider(this.weth, Addresses[networkId].weth)

    this.vaults.forEach(
      ({ vaultContract, vaultAddress, tokenContract, tokenAddress }) => {
        setProvider(vaultContract, vaultAddress)
        setProvider(tokenContract, tokenAddress)
      },
    )
  }

  setDefaultAccount(account) {
    this.uniCore.options.from = account
    this.uniCoreVault.options.from = account
  }
}