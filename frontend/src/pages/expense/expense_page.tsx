
import React from 'react'
import { useAppSelector } from '../../store/hook'
import TransactionForm from '../../components/transactions/TransactionForm'
import TransactionList from '../../components/transactions/TransactionList'

const ExpensePage:React.FC = () => {
    const expense=useAppSelector(state=>state.trans_action.items.filter(t=>t.type==="expense"))
    console.log(expense)
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">Gelirler</h1>
      <TransactionForm type="expense" />
      <TransactionList transactions={expense} />
    </div>
  )
}

export default ExpensePage