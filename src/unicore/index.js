import { UniCore } from './UniCore'

export default UniCore

export const getUniCoreAddress = (uniCore) => {
  return uniCore && uniCore.uniCoreAddress
}

export const getUniCoreLpAddress = (uniCore) => {
  return uniCore && uniCore.uniCoreLpAddress
}

export const getWrappedAddress = (uniCore) => {
  return uniCore && uniCore.wrappedAddress
}

export const getVaultAddress = (uniCore) => {
  return uniCore && uniCore.vaultAddress
}

export const getUniCoreContract = (uniCore) => {
  return uniCore && uniCore.contracts && uniCore.contracts.uniCore
}

export const getUniCoreLpContrat = (uniCore) => {
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
