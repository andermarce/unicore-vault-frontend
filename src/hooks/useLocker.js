import { useContext} from 'react'
import { LockerContext } from 'contexts/Locker'

export const useLocker = () => {
  const { 
    amount,
    checked,
    error,
    errorMessage,
    setAmount,
    setMax,
    setChecked,
    lockEthereum
  } = useContext(LockerContext)

  return {
    amount,
    checked,
    error,
    errorMessage,
    setAmount,
    setMax,
    setChecked,
    lockEthereum
  }
}
