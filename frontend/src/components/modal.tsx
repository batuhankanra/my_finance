import { X } from 'lucide-react'
import React from 'react'

interface ModalProps{
    isOpen:boolean
    onClose:()=>void
    title:string
    children:React.ReactNode
}

const Modal:React.FC<ModalProps> = ({children,isOpen,onClose,title}) => {
    if(!isOpen) return null

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-xl border border-slate-200 w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between p-4 border-b border-slate-100">
                <h2 className="font-semibold text-slate-800">{title}</h2>
                <button
                    onClick={onClose}
                    className="text-slate-400 hover:text-slate-600 transition-colors"
                    aria-label="Kapat"
                >
                    <X size={18} />
                </button>
                </div>
                <div className="p-4">{children}</div>
            </div>
        </div>
    );
}

export default Modal