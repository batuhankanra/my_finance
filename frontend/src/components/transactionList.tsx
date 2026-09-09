import React from 'react'
import type { Transaction } from '../types'
import { useNavigate, useSearchParams } from 'react-router'
import { ArrowDownLeft, ArrowUpRight, ChevronLeft, ChevronRight, Inbox } from 'lucide-react'

interface TransactionListProps{
    data:Transaction[]
    totalPages:number
    page:number
    title:string
}

const TransactionList:React.FC<TransactionListProps> = ({data,page,title,totalPages}) => {
    const navigate=useNavigate()
    const [searchParams]=useSearchParams()

    const goToPage=(target:number)=>{
        const params=new URLSearchParams(searchParams)
        params.set("page",String(target))
        navigate(`?${params.toString()}`)
    }
    const formatDate=(dateStr:string)=>new Date(dateStr).toLocaleDateString('tr-TR',{ day:'numeric',month:'short',year:'numeric'})
    return (
        <div className="space-y-4">
            <div className="bg-white rounded-xl border border-slate-200">
                <h2 className="font-semibold text-lg p-4 border-b border-slate-100 text-slate-800">
                {title}
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

            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-1">
                <button
                    onClick={() => goToPage(page - 1)}
                    disabled={page === 1}
                    className="w-8 h-8 flex items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent"
                    aria-label="Önceki sayfa"
                >
                    <ChevronLeft size={16} />
                </button>

                {Array.from({ length: totalPages }).map((_, i) => {
                    const pageNum = i + 1;
                    const isActive = pageNum === page;
                    return (
                    <button
                        key={pageNum}
                        onClick={() => goToPage(pageNum)}
                        className={`w-8 h-8 flex items-center justify-center rounded-md text-sm tabular-nums transition-colors ${
                        isActive ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                        }`}
                    >
                        {pageNum}
                    </button>
                    );
                })}

                <button
                    onClick={() => goToPage(page + 1)}
                    disabled={page === totalPages}
                    className="w-8 h-8 flex items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent"
                    aria-label="Sonraki sayfa"
                >
                    <ChevronRight size={16} />
                </button>
                </div>
            )}
            </div>
    )
}

export default TransactionList