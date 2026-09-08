import { createSlice,type PayloadAction } from "@reduxjs/toolkit";
import type { TransactionFilters } from "../../types";

interface TransactionUIState{
    filters:TransactionFilters,
    isFormModalOpen:boolean,
    editingTransactionId:string|null
}

const initialState:TransactionUIState={
    filters:{
        page:1,
        limit:20
    },
    isFormModalOpen:false,
    editingTransactionId:null
}

const transactionSlice=createSlice({
    name:'transactionUI',
    initialState,
    reducers:{
        setFilters: (state,action:PayloadAction<TransactionFilters>)=>{
            state.filters={...state.filters,...action.payload};
        },
        resetFilters: (state)=>{
            state.filters=initialState.filters
        },
        openFormModal : (state,action:PayloadAction<string | null>)=>{
            state.isFormModalOpen=true
            state.editingTransactionId=action.payload
        },
        closeFormModal:(state)=>{
            state.isFormModalOpen=false
            state.editingTransactionId=null
        }

    }
})


export const {closeFormModal,openFormModal,resetFilters,setFilters} =transactionSlice.actions
export default transactionSlice.reducer