import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/main_layout";
import Home from "../pages/dashboard";
import { transactionsLoader } from "../pages/loader";
import NotFound from "../pages/not_found";
import ExpensePage from "../pages/expense/expense_page";


const router = createBrowserRouter([
    {
        path:"/",
        Component:MainLayout,
        children:[
            {
                index:true,
                Component:Home,
                loader:transactionsLoader
            },
            {
                path:"expense",
                Component:ExpensePage
            },
            {
                path:"*",
                Component:NotFound
            }
           
        ]
    }
])
export default router