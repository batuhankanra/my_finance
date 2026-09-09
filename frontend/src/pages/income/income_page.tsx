
import { TrendingUp } from 'lucide-react'
import React from 'react'
import TransactionList from '../../components/transactionList';
import { useLoaderData } from 'react-router';
import type { TransactionListResponse } from '../../types';

const IncomePage:React.FC = () => {
   const { data, totalIncome, totalPages, page } = useLoaderData() as TransactionListResponse;
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-800">Gelirler</h1>

        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-2">
          <TrendingUp size={16} className="text-emerald-600" />
          <span className="text-sm text-slate-500">Toplam:</span>
          <span className="font-semibold text-emerald-600 tabular-nums">
            {totalIncome.toLocaleString('tr-TR')} ₺
          </span>
        </div>
      </div>

      <TransactionList data={data} totalPages={totalPages} page={page ?? 1} title="Gelir Geçmişi" />
    </div>
  )
}

export default IncomePage