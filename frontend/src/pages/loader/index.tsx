import type { LoaderFunctionArgs } from "react-router";
import { transaction_api } from "../../features/transaction";


export const transactionsLoader=async ({request}:LoaderFunctionArgs)=>{
    const url = new URL(request.url);
    const page =Number(url.searchParams.get('page') || 1)
    const data = await transaction_api.getAll({ page , limit: 20 });
    return data;
}