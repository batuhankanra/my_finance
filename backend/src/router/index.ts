import { Router } from "express";
import transaction from "./transaction.js"

const router=Router()


router.use("/transactions",transaction)

export default router