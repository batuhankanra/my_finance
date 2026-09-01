
import React from 'react'
import { useAppSelector } from '../../store/hook'

import TransactionForm from '../../components/transactions/TransactionForm'
import TransactionList from '../../components/transactions/TransactionList'

const IncomePage:React.FC = () => {
    const incomes=useAppSelector(state=>state.trans_action.items.filter(t=>t.type==='income'))
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">Gelirler</h1>
      <TransactionForm type="income" />
      <TransactionList transactions={incomes} />
    </div>
  )
}

export default IncomePage