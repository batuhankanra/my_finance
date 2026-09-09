// src/routes/Home.tsx
import React from 'react';
import { useLoaderData, useNavigate, useSearchParams } from 'react-router';
import { TrendingUp, TrendingDown, Wallet, ChevronLeft, ChevronRight, Inbox, ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import type { TransactionListResponse } from '../../types';

const Home: React.FC = () => {
  const { data, totalIncome, totalExpense, balance, totalPages, page } = useLoaderData() as TransactionListResponse;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const currentPage = page ?? 1;

  const goToPage = (targetPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(targetPage));
    navigate(`?${params.toString()}`);
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year:'numeric' });

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

      {/* İşlem listesi */}
      <div className="bg-white rounded-xl border border-slate-200">
        <h2 className="font-semibold text-lg p-4 border-b border-slate-100 text-slate-800">
          Geçmiş
        </h2>

        {data.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 py-12 text-slate-400">
            <Inbox size={28} strokeWidth={1.5} />
            <p className="text-sm">Henüz bir işlem eklenmedi</p>
          </div>
        ) : (
          <ul className="divide-y divide-slate-100">
            {data.map((t) => {
              const isIncome = t.type === 'income';
              return (
                <li key={t._id} className="flex items-center gap-3 p-4 hover:bg-slate-50 transition-colors">
                  <span
                    className={`flex items-center justify-center w-9 h-9 rounded-full shrink-0 ${
                      isIncome ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                    }`}
                  >
                    {isIncome ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                  </span>

                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-800 truncate">{t.category}</p>
                    {t.description && (
                      <p className="text-sm text-slate-400 truncate">{t.description}</p>
                    )}
                  </div>

                  <div className="text-right shrink-0">
                    <p className={`font-medium tabular-nums ${isIncome ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {isIncome ? '+' : '-'}
                      {t.amount.toLocaleString('tr-TR')} ₺
                    </p>
                    <p className="text-xs text-slate-400">{formatDate(t.date)}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Sayfalama */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-8 h-8 flex items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent"
            aria-label="Önceki sayfa"
          >
            <ChevronLeft size={16} />
          </button>

          {Array.from({ length: totalPages }).map((_, i) => {
            const pageNum = i + 1;
            const isActive = pageNum === currentPage;
            return (
              <button
                key={pageNum}
                onClick={() => goToPage(pageNum)}
                className={`w-8 h-8 flex items-center justify-center rounded-md text-sm tabular-nums transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="w-8 h-8 flex items-center justify-center cursor-pointer rounded-md text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent"
            aria-label="Sonraki sayfa"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;