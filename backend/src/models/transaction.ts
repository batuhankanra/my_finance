import { Schema,model } from "mongoose";
import  type { ITransaction } from "../types/index.js";


const transactionSchema=new Schema<ITransaction>(
    {
        type:{
            type:String,
            enum:["income","expense"],
            required:true
        },
        amount:{
            type:Number,
            min:[0,"the amount connot be negative"],
            required:true
        },
        category:{
            type:String,
            required:true,
            trim:true
        },
        description:{
            type:String,
            trim:true,
            default:''
        },
        date:{
            type:Date,
            required:true
        }
    },
    {
        versionKey:false,
        timestamps:{
            createdAt:'created_at',
            updatedAt:'updated_at'
        }
    }
)

transactionSchema.index({date:-1})
transactionSchema.index({ type: 1, category: 1 });

export const  Transaction=model<ITransaction>('Transaction',transactionSchema)