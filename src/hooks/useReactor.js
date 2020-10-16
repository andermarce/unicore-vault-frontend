import { useContext } from 'react'
import { ReactorContext } from 'contexts/Reactor'

export const useReactor = () => {
  const reactorState = useContext(ReactorContext)
  
  return reactorState
}