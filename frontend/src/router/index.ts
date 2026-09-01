import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/main_layout";
import ExpensePage from "../pages/expense/expense_page";
import IncomePage from "../pages/income/income_page";
import NotFound from "../pages/not_found";
import Home from "../pages/dashboard";


const router = createBrowserRouter([
    {
        path:"/",
        Component:MainLayout,
        children:[
            {
                index:true,
                Component:Home
            },
            {
                path:"expense",
                Component:ExpensePage
            },
            {
                path:"incomes",
                Component:IncomePage
            },
            {
                path:"*",
                Component:NotFound
            }
        ]
    }
])
export default router