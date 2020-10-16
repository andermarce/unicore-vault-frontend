import { useContext } from 'react'
import { TransactionsContext } from '../contexts/Transactions'

export const useCreateTransaction = () => {
  const { onAddTransaction } = useContext(TransactionsContext)
  return { onAddTransaction }
}