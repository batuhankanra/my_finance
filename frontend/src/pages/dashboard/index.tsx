// src/routes/Home.tsx
import React from 'react';
import { useLoaderData } from 'react-router';
import { TrendingUp, TrendingDown, Wallet, Plus } from 'lucide-react';
import type { TransactionListResponse } from '../../types';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { closeFormModal, openFormModal } from '../../store/slices/transactions';
import TransactionList from '../../components/transactionList';
import AddTransactionModal from '../../components/transactionModal';

const Home: React.FC = () => {
  const { data, totalIncome, totalExpense, balance, totalPages, page } = useLoaderData() as TransactionListResponse;
  const dispatch = useAppDispatch();
  const isFormModalOpen = useAppSelector((state) => state.transactionUI.isFormModalOpen);

  return (
    <div className="space-y-6">
      {/* Özet kartları */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center gap-2 text-slate-500">
            <TrendingUp size={16} strokeWidth={2} />
            <p className="text-sm">Gelir</p>
          </div>
          <p className="text-2xl font-semibold text-emerald-600 mt-2 tabular-nums">
            {totalIncome.toLocaleString('tr-TR')} ₺
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center gap-2 text-slate-500">
            <TrendingDown size={16} strokeWidth={2} />
            <p className="text-sm">Gider</p>
          </div>
          <p className="text-2xl font-semibold text-rose-600 mt-2 tabular-nums">
            {totalExpense.toLocaleString('tr-TR')} ₺
          </p>
        </div>

        <div className="bg-slate-900 rounded-xl p-5">
          <div className="flex items-center gap-2 text-slate-400">
            <Wallet size={16} strokeWidth={2} />
            <p className="text-sm">Bakiye</p>
          </div>
          <p className="text-2xl font-semibold text-white mt-2 tabular-nums">
            {balance.toLocaleString('tr-TR')} ₺
          </p>
        </div>
      </div>

      {/* Yeni işlem butonu */}
      <div className="flex justify-end">
        <button
          onClick={() => dispatch(openFormModal(null))}
          className="flex items-center gap-1 text-sm bg-slate-900 text-white px-3 py-1.5 rounded-md hover:bg-slate-800 transition-colors"
        >
          <Plus size={14} /> Yeni İşlem
        </button>
      </div>

      {/* İşlem listesi + sayfalama (ortak component) */}
      <TransactionList data={data} totalPages={totalPages} page={page ?? 1} title="Geçmiş" />

      <AddTransactionModal isOpen={isFormModalOpen} onClose={() => dispatch(closeFormModal())} />
    </div>
  );
};

export default Home;