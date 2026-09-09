import React from 'react'
import { useFetcher } from 'react-router'
import { toast } from 'sonner'
import Modal from './modal'

interface AddTransActionModalProps{
    isOpen:boolean
    onClose:()=>void
}


const AddTransactionModal:React.FC<AddTransActionModalProps> = ({isOpen,onClose}) => {
    const fetcher=useFetcher()
    const formRef=React.useRef<HTMLFormElement>(null)
    const isSubmitting=fetcher.state='submitting'
    React.useEffect(()=>{
        if(fetcher.state==='submitting' && fetcher.data){
            if(fetcher.data.success){
                toast.success("işlem eklendi")
                formRef.current?.reset()
                onClose()
            }else{
                toast.error(fetcher.data.message || 'bir hata oluştu')
            }
        }
    },[fetcher.state,fetcher.data])
    
    return (
        <Modal isOpen={isOpen} onClose={onClose} title='Yeni İşlem'>
            <fetcher.Form method='post' ref={formRef} className='flex flex-col gap-3'>
                <div>
                    <label className="text-sm text-slate-500">Tür</label>
                    <select
                        name="type"
                        required
                        className="w-full mt-1 rounded-md border border-slate-200 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                    >
                        <option value="expense">Gider</option>
                        <option value="income">Gelir</option>
                    </select>
                    </div>

                    <div>
                    <label className="text-sm text-slate-500">Tutar</label>
                    <input
                        type="number"
                        name="amount"
                        step="0.01"
                        min="0"
                        required
                        className="w-full mt-1 rounded-md border border-slate-200 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                    </div>

                    <div>
                    <label className="text-sm text-slate-500">Kategori</label>
                    <input
                        type="text"
                        name="category"
                        required
                        className="w-full mt-1 rounded-md border border-slate-200 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                    </div>

                    <div>
                    <label className="text-sm text-slate-500">Açıklama (opsiyonel)</label>
                    <input
                        type="text"
                        name="description"
                        className="w-full mt-1 rounded-md border border-slate-200 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                    </div>

                    <div>
                    <label className="text-sm text-slate-500">Tarih</label>
                    <input
                        type="date"
                        name="date"
                        required
                        defaultValue={new Date().toISOString().split('T')[0]}
                        className="w-full mt-1 rounded-md border border-slate-200 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                    </div>

                    <button
                    type="submit"
                    disabled={isSubmitting!="submitting"}
                    className="mt-2 bg-slate-900 text-white rounded-md py-2 text-sm font-medium disabled:opacity-50"
                    >
                    {isSubmitting!="submitting" ? 'Ekleniyor...' : 'Ekle'}
                    </button>
            </fetcher.Form>
        
        </Modal>
    )
}

export default AddTransactionModal