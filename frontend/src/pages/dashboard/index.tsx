import React from 'react'
import { useLoaderData } from 'react-router';
import type { TransactionListResponse } from '../../types';

const Home:React.FC = () => {
const { data, totalIncome, totalExpense, balance } = useLoaderData() as TransactionListResponse;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">Toplam Gelir</p>
          <p className="text-2xl font-semibold text-green-600">{totalIncome} ₺</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">Toplam Gider</p>
          <p className="text-2xl font-semibold text-red-600">{totalExpense} ₺</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">Bakiye</p>
          <p className="text-2xl font-semibold text-gray-800">{balance} ₺</p>
        </div>
      </div>

      <div className=" rounded-lg shadow-sm flex flex-col gap-y-2 ">
        { data.map((t) => (
          <div key={t._id} className="flex justify-between items-center p-2 bg-white">
            <div>
              <p className="font-medium text-gray-800">{t.category}</p>
              <p className="text-sm text-gray-500">{t.description}</p>
            </div>
            <p className={t.type === 'income' ? 'text-green-600' : 'text-red-600'}>
              {t.type === 'income' ? '+' : '-'}{t.amount} ₺
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home