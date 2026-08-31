interface RequestOptions extends RequestInit{
    params?:Record<string,string | number | undefined>
}

type TransactionType='income' | 'expense'

interface Transaction{
    id:string
    type:TransactionType
    amount:number
    category:string
    description?:string
    date:string
    created_at:string
}

interface TransactionFormData{
    type:TransactionType
    amount:number
    category:string
    description?:string
    date:string
}



