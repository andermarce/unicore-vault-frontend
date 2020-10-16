import { useContext} from 'react'
import { LockerContext } from 'contexts/Locker'

export const useLocker = () => {
  const { 
    formState,
    setAmount,
    setMax,
    setChecked,
    lockEthereum
  } = useContext(LockerContext)

  return {
    formState,
    setAmount,
    setMax,
    setChecked,
    lockEthereum
  }
}
