import Web3 from 'web3'
import BigNumber from 'bignumber.js'
import Addresses from './lib/addresses'
import Contracts from './lib/contracts'

export class UniCore {
  
  constructor(provider, networkId, options) {
    this.web3 = new Web3(provider)

    if (options.defaultAccount) {
      this.web3.eth.defaultAccount = options.defaultAccount
    }

    this.contracts = new Contracts(provider, networkId, this.web3, options)

    this.uniCoreAddress = Addresses[networkId].uniCore
    this.uniCoreLpAddress = Addresses[networkId].uniCoreLp
    this.uniCoreWrappedAddress = Addresses[networkId].uniCoreWrapped
    this.uniCoreVaultAddress = Addresses[networkId].uniCoreVault
    this.wethAddress = Addresses[networkId].weth
  }

  setProvider(provider, networkId) {
    this.web3.setProvider(provider)
    this.contracts.setProvider(provider, networkId)
    this.operation.setNetworkId(networkId)
  }

  setDefaultAccount(account) {
    this.web3.eth.defaultAccount = account
    this.contracts.setDefaultAccount(account)
  }

  getDefaultAccount() {
    return this.web3.eth.defaultAccount
  }

  toBigN(a) {
    return BigNumber(a)
  }
  
}