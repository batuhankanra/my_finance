import { Transaction } from "../models/transaction.js";
import type { ITransaction, TransactionFilters, TransactionFormData, TransactionType } from "../types/index.js";
import type { QueryFilter } from "mongoose"



class TransActionService{
    async create(data:TransactionFormData):Promise<ITransaction>{
        const transaction =new Transaction({
            ...data,
            date:new Date(data.date)
        })
        return await transaction.save()
    }
    async get_all(filters:TransactionFilters={},page=1,limit=20):Promise<
    {
        data: ITransaction[];
        total: number;
        page: number;
        totalPages: number;
        totalIncome:number;
        totalExpense:number;
        balance:number;
    }
    >{
        const query:QueryFilter<ITransaction>={};

        if (filters.type) query.type=filters.type
        if (filters.category) query.category=filters.category
        if (filters.startDate || filters.endDate){
            query.date={}
            if (filters.startDate) query.date.$gte=new Date(filters.startDate);
            if (filters.endDate) query.date.$lte=new Date(filters.endDate);
        }
        const skip =(page-1)*limit;


        const summaryQuery:QueryFilter<ITransaction>={...query};
        delete summaryQuery.type;

        const [data,total,summaryResult]=await Promise.all([
            Transaction.find(query).sort({date:-1}).skip(skip).limit(limit),
            Transaction.countDocuments(query),
            Transaction.aggregate([
                { $match:summaryQuery},
                {$group:{_id:"$type",total:{$sum:"$amount"}}}
            ])
        ])
        const totalIncome=summaryResult.find(r=>r._id==="income")?.total || 0;
        const totalExpense=summaryResult.find(r=>r._id==="expense")?.total || 0
        return {data,total,page,totalPages:Math.ceil(total/limit),totalIncome,totalExpense,balance:totalIncome-totalExpense}

    }
    async getById(id:string):Promise<ITransaction | null>{
        return await Transaction.findById(id)
    }
    async update(id:string,data:Partial<TransactionFormData>):Promise<ITransaction | null>{
        const updated_data:any={...data}
        if (data.date) updated_data.date=new Date(data.date)
        return await Transaction.findOneAndReplace({_id:id},updated_data,{returnDocument:'after',runValidators:true})   
    }
    async delete(id: string): Promise<ITransaction | null> {
        return await Transaction.findByIdAndDelete(id);
    }
    async getSummary(filters:TransactionFilters={}):Promise<{totalIncome:number;totalExpense:number;balance:number}>{
        const query:QueryFilter<ITransaction>={};
        if(filters.startDate || filters.endDate){
            query.date={}
            if (filters.startDate) query.date.$gte = new Date(filters.startDate);
            if (filters.endDate) query.date.$lte = new Date(filters.endDate);
        }
        const result=await Transaction.aggregate([
            {
                $match:query
            },
            {
                $group:{
                    _id:'$type',
                    total:{ $sum:'$amount' }
                }
            }
        ])
        const totalIncome=result.find(r=>r._id==='income')?.total || 0;
        const totalExpense=result.find(r=>r._id==='expense')?.total || 0;
        return{
            totalIncome,
            totalExpense,
            balance:totalIncome-totalExpense
        }
    }
    async getByCategory(type?:TransactionType):Promise<{category:string;total:number}[]>{
        const match:QueryFilter<ITransaction>={};
        if (type) match.type=type;
        const result = await Transaction.aggregate([
            {
                $match:match
            },
            {
                $group:{
                    _id:'$category',
                    total:{$sum:'$amount'},
                }
            },
            {
                $sort:{total:-1}
            }
        ])
        return result.map(t=>({category:t._id,total:t.total}))
    }
}

export default new TransActionService()