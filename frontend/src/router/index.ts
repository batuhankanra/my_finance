import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/main_layout";
import Home from "../pages/dashboard";
import NotFound from "../pages/not_found";
import ExpensePage from "../pages/expense/expense_page";
import IncomePage from "../pages/income/income_page";
import { transactionAction, transactionsLoader } from "../pages/loader/transAction";
import { incomeLoader } from "../pages/loader/incomeLoader";
import { expenseLoader } from "../pages/loader/expenseLoader";


const router = createBrowserRouter([
    {
        path:"/",
        Component:MainLayout,
        children:[
            {
                index:true,
                Component:Home,
                loader:transactionsLoader,
                action:transactionAction
            },
            {
                path:"expense",
                Component:ExpensePage,
                loader:expenseLoader
            },
            {
                path:"incomes",
                Component:IncomePage,
                loader:incomeLoader
            },
            {
                path:"*",
                Component:NotFound
            }
           
        ]
    }
])
export default router