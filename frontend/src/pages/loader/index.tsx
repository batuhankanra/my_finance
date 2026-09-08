import { transaction_api } from "../../features/transaction";


export const transactionsLoader=async ()=>{
    const data = await transaction_api.getAll({ page: 1, limit: 20 });
    return data;
}