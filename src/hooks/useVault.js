import { useContext } from 'react'
import { VaultContext } from 'contexts/Vault'

export const useVault = () => {
  const vault = useContext(VaultContext)
  return vault
}