import { useContext} from 'react'
import { LockerContext } from 'contexts/Locker'

export const useLocker = () => {
  const { 
    amount,
    checked,
    error,
    errorMessage,
    setAmount,
    onButton,
    setMax,
    setChecked,
    lockEthereum
  } = useContext(LockerContext)

  return {
    amount,
    checked,
    error,
    errorMessage,
    onButton,
    setAmount,
    setMax,
    setChecked,
    lockEthereum
  }
}
