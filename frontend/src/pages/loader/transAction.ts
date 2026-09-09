import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import type { TransactionFormData } from "../../types";
import { transaction_api } from "../../features/transaction";



export const transactionAction=async ({request}:ActionFunctionArgs)=>{
    const formData=await request.formData()

    const payload:TransactionFormData={
        type:formData.get('type') as 'income' | 'expense',
        amount:Number(formData.get("amount")),
        category:formData.get("category") as string,
        description:(formData.get("description") as string) || undefined,
        date:formData.get("date") as string
    }
    try{
        const data=await transaction_api.create(payload)
  
        return {success:true,data}
    }catch (err:any){
        return {success:false, message:err?.response?.data?.message || "işlem eklenemedi"}
    }
}


export const transactionsLoader=async ({request}:LoaderFunctionArgs)=>{
    const url = new URL(request.url);
    const page =Number(url.searchParams.get('page') || 1)
    const data = await transaction_api.getAll({ page , limit: 20 });
    return data;
}