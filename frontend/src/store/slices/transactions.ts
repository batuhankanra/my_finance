import { createSlice , type PayloadAction , nanoid } from "@reduxjs/toolkit";



interface TransactionsState{
    items:Transaction[]
}

const initialState:TransactionsState={
    items:[]
}

const transactionsSlice=createSlice({
    name:'transactions',
    initialState,
    reducers:{
        addTransAction:{
            reducer:(state,action:PayloadAction<Transaction>)=>{
                state.items.push(action.payload)
            },
            prepare:(data:TransactionFormData)=>({
                payload:{
                    ...data,
                    id:nanoid(),
                    created_at:new Date().toISOString()
                } as Transaction
            }),
        },
        removeTransaction:(state,action:PayloadAction<string>)=>{
            state.items=state.items.filter(t=>t.id !== action.payload)
        },
        updateTransaction:(state,action:PayloadAction<Transaction>)=>{
            const idx=state.items.findIndex(t=>t.id===action.payload.id);
            if (idx !==-1) state.items[idx]=action.payload
        }
    }
})

export const {addTransAction,removeTransaction,updateTransaction} =transactionsSlice.actions
export default transactionsSlice.reducer