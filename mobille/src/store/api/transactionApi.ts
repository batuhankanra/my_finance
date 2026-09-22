import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  Transaction,
  TransactionFormData,
  TransactionFilters,
  TransactionListResponse,
} from '../../types/transaction';

const BASE_URL = 'http://localhost:3000/api/transactions';

export const transactionApi = createApi({
  reducerPath: 'transactionApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Transaction'],
  endpoints: (builder) => ({
    getTransactions: builder.query<TransactionListResponse, TransactionFilters | void>({
      query: (filters) => {
        const params:Record<string,string | number>={
          page:filters?.page ?? 1,
          limit:filters?.limit ?? 20
        }
        if (filters?.type) params.type = filters.type;
        if (filters?.category) params.category = filters.category;
        if (filters?.startDate) params.startDate = filters.startDate;
        if (filters?.endDate) params.endDate = filters.endDate;
        return {
          url:"/",
          params
        }
      },
      providesTags: ['Transaction'],
    }),

    getTransactionById: builder.query<Transaction, string>({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: 'Transaction', id }],
    }),

    createTransaction: builder.mutation<Transaction, TransactionFormData>({
      query: (body) => ({
        url: '/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Transaction'],
    }),

    updateTransaction: builder.mutation<Transaction, { id: string; data: Partial<TransactionFormData> }>({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Transaction'],
    }),

    deleteTransaction: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Transaction'],
    }),
  }),
});

export const {
  useGetTransactionsQuery,
  useGetTransactionByIdQuery,
  useCreateTransactionMutation,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
} = transactionApi;