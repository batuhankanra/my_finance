import { TransactionType } from "@/types/transaction";

export interface CategoryItem{
    label:string
    value:string
    color:string
}

export const Categories:Record<TransactionType,CategoryItem[]>={
    income:[
        {label:"Maaş",value:"Maaş", color:"#22c55e"},
        {label:"Ek Gelir",value:"Ek Gelir",color:"#84cc16"},
        {label:"Yatırım",value:"Yatırım",color:"#14b8a6"},
        {label:"Hediye",value:"Hediye",color:"#06b6d4"},
        {label:"Diğer",value:"Diğer",color:"#64748b"}
    ],
    expense:[
        { label: 'Kira', value: 'Kira', color: '#EF4444' },
        { label: 'Market', value: 'Market', color: '#F97316' },
        { label: 'Kredi', value: 'kredi', color: '#EC4899' },
        { label: 'Ulaşım', value: 'Ulaşım', color: '#A855F7' },
        { label: 'Fatura', value: 'Fatura', color: '#6366F1' },
        { label: 'Eğlence', value: 'Eğlence', color: '#F43F5E' },
        { label: 'Sağlık', value: 'Sağlık', color: '#0EA5E9' },
        { label: 'Diğer', value: 'Diğer', color: '#64748B' },
    ]
}

export const getCategoryLabel=(type:TransactionType,value:string):string=>{
    const found =Categories[type].find(c=>c.value===value)
    return found?.label ?? value
}
export const getCategoryColor=(type:TransactionType,value:string):string=>{
    const found =Categories[type].find(c=>c.value===value)
    return found?.color ?? '#94a3b8'
}