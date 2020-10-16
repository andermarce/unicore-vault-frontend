import { UniCore } from './UniCore'

export default UniCore

export const getUniCoreContract = (uniCore) => {
  return uniCore && uniCore.contracts && uniCore.contracts.uniCore
}

export const getWrappedContract = (uniCore) => {
  return uniCore && uniCore.contracts && uniCore.contracts.uniCoreWrapped
}

export const getVaultContract = (uniCore) => {
  return uniCore && uniCore.contracts && uniCore.contracts.uniCoreVault
}

export const getWethContract = (uniCore) => {
  return uniCore && uniCore.contracts && uniCore.contracts.weth
}
