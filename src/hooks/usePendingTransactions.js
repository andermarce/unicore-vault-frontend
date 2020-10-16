import { useContext } from 'react'
import { TransactionsContext } from 'contexts/Transactions'

export const usePendingTransactions = () => {
  const { transactions } = useContext(TransactionsContext)
  const pendingTransactions = Object.keys(transactions)
    .map((txHash) => transactions[txHash])
    .filter((tx) => !tx.receipt)
  return pendingTransactions
}