import type { Transaction, TransactionFilters, TransactionFormData, TransactionListResponse } from "../types";
import axiosInstance from "../utils/api";


export const transaction_api={
    getAll:async (filters:TransactionFilters={}):Promise<TransactionListResponse>=> {
        const {data}=await axiosInstance.get("/transactions",{params:filters})
        return data
    },
    getById:async (id:string):Promise<Transaction>=>{
        const {data}=await axiosInstance.get(`/transactions/${id}`)
        return data
    },
    create:async (payload:TransactionFormData):Promise<Transaction[]>=>{
        const {data}=await axiosInstance.post('/transactions',payload)
        return data
    },
    update:async (id:string,payload:Partial<TransactionFormData>):Promise<Transaction>=>{
        const {data}=await axiosInstance.post(`/transactions/${id}`,payload)
        return data
    },
    delete:async (id:string):Promise<void>=>{
        await axiosInstance.get(`/transactions/${id}`)
    }
}
