import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/main_layout";
import ExpensePage from "../pages/expense/expense_page";


const router = createBrowserRouter([
    {
        path:"/",
        Component:MainLayout,
        children:[
            {
                index:true,
                element:"sa"
            },
            {
                path:"expense",
                Component:ExpensePage
            }
        ]
    }
])
export default router