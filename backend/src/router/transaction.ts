import { Router } from "express";
import transactionController from "../controllers/transaction.js";


const router =Router()



router.post("/",transactionController.create)
router.get("/",transactionController.getAll)
router.get("/summary",transactionController.getSummary)
router.get("/by-category",transactionController.getByCategory)
router.get("/:id",transactionController.getById)
router.put("/:id",transactionController.upodate)
router.delete("/:id",transactionController.delete)

export default router