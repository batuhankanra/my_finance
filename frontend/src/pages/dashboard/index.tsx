import React from 'react'
import { useAppSelector } from '../../store/hook'
import SummaryCard from '../../components/SummaryCard'
import TransactionList from '../../components/transactions/TransactionList'

const Home:React.FC = () => {

    const totalIncome=useAppSelector(state=>state.trans_action.items.filter(t=>t.type==='income').reduce((sum,t)=>sum+t.amount,0))
    const totalExpence=useAppSelector(state=>state.trans_action.items.filter(t=>t.type==='expense').reduce((sum,t)=>sum+t.amount,0))
    const balance=totalIncome-totalExpence
    const transactions=useAppSelector(state=> [...state.trans_action.items].sort((a,b)=>new Date(a.date).getTime()- new Date(b.date).getTime()))
    console.log(transactions)
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <SummaryCard title="Bakiye" amount={balance} variant="balance" />
        <SummaryCard title="Toplam Gelir" amount={totalIncome} variant="income" />
        <SummaryCard title="Toplam Gider" amount={totalExpence} variant="expense" />
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-3">
          Son İşlemler
        </h2>
        <TransactionList transactions={transactions} />
      </div>
    </div>
  )
}

export default Home