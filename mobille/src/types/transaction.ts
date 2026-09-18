export type TransactionType = 'income' | 'expense';

export interface Transaction {
  _id: string;
  type: TransactionType;
  amount: number;
  category: string;
  description?: string;
  date: string;
  created_at: string;
  updated_at: string;
}

export interface TransactionFormData {
  type: TransactionType;
  amount: number;
  category: string;
  description?: string;
  date: string;
}

export interface TransactionListResponse {
  data: Transaction[];
  total: number;
  page: number;
  totalPages: number;
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

export interface TransactionFilters {
  type?: TransactionType;
  category?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}