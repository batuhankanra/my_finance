import { TransactionType } from "@/types/transaction";

export interface CategoryItem{
    label:string
    value:string
    color:string
}

export const Categories:Record<TransactionType,CategoryItem[]>={
    income:[
        {label:"maaş",value:"Salary", color:"#22c55e"},
        {label:"ek gelir",value:"freelance",color:"#84cc16"},
        {label:"yatırım",value:"investment",color:"#14b8a6"},
        {label:"hediye",value:"gift",color:"#06b6d4"},
        {label:"diğer",value:"other_income",color:"#64748b"}
    ],
    expense:[
        { label: 'Kira', value: 'rent', color: '#EF4444' },
        { label: 'Market', value: 'grocery', color: '#F97316' },
        { label: 'Kredi', value: 'kredi', color: '#EC4899' },
        { label: 'Ulaşım', value: 'transport', color: '#A855F7' },
        { label: 'Fatura', value: 'bill', color: '#6366F1' },
        { label: 'Eğlence', value: 'entertainment', color: '#F43F5E' },
        { label: 'Sağlık', value: 'health', color: '#0EA5E9' },
        { label: 'Diğer', value: 'other_expense', color: '#64748B' },
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