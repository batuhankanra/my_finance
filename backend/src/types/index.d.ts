import type { Document } from "mongoose"


interface Config{
    port : number
    mongo_uri:string
    mongo_name:string
    node_env:string
}

type TransactionType = 'income' | 'expense';

interface ITransaction extends Document{
    type:TransactionType
    amount:number
    category:string
    description?:string
    date:Date
    created_at:Date
    updated_at:Date
}
export interface TransactionFormData {
  type: TransactionType;
  amount: number;
  category: string;
  description?: string;
  date: string;
}
interface TransactionFilters {
  type?: TransactionType;
  category?: string;
  startDate?: string;
  endDate?: string;
}