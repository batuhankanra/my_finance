
import React from 'react';
import { useLoaderData } from 'react-router';
import { TrendingDown } from 'lucide-react';
import type { TransactionListResponse } from '../../types';
import TransactionList from '../../components/transactionList';

const ExpensePage: React.FC = () => {
  const { data, totalExpense, totalPages, page } = useLoaderData() as TransactionListResponse;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-800">Giderler</h1>

        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-2">
          <TrendingDown size={16} className="text-rose-600" />
          <span className="text-sm text-slate-500">Toplam:</span>
          <span className="font-semibold text-rose-600 tabular-nums">
            {totalExpense.toLocaleString('tr-TR')} ₺
          </span>
        </div>
      </div>

      <TransactionList data={data} totalPages={totalPages} page={page ?? 1} title="Gider Geçmişi" />
    </div>
  );
};

export default ExpensePage;