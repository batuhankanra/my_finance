import type { Request,Response } from "express";
import TransActionService from "../services/transaction.js"
import type { TransactionType } from "../types/index.js";

class TransactionController{
    async create(req:Request,res:Response):Promise<void>{
        try{
            const { type, amount, category, description, date } = req.body
            if(type !== "income" && type !=="expense"){
                res.status(400).json({message:"the 'type ' field must be 'income' or 'expense'"})
                return
            }
            const transaction=await TransActionService.create({
                type,
                amount,
                category,
                description,
                date
            })
            res.status(201).json(transaction)
        }
        catch (err){
            res.status(500).json({message:"Internal server error",error:(err as Error).message})
            return
        }
    }
    async getAll(req:Request,res:Response):Promise<void>{
        try{
            const { type, category, startDate, endDate, page, limit } = req.query;
            const filters={
                type:type as TransactionType | undefined,
                category:category as string | undefined,
                startDate:startDate as string | undefined,
                endDate:endDate as string | undefined
            }
            const result= await TransActionService.get_all(filters,Number(page)|| 1,Number(limit)||20);
            res.status(200).json(result)
        }catch (err){
            res.status(500).json({message:"Internal server error",error:(err as Error).message})
            return
        }
    }
    async getById(req:Request,res:Response):Promise<void>{
        try{
            const id=req.params.id as string
            const transaction=await TransActionService.getById(id)
            if (!transaction) {
                res.status(404).json({ message: "İşlem bulunamadı" });
                return;
            }
            res.status(200).json(transaction)
        }catch (err){
            res.status(500).json({message:"Internal server error",error:(err as Error).message})
            return
        }
    }
    async upodate(req:Request,res:Response):Promise<void>{
        try{
            const id=req.params.id as string
            const { type, amount, category, description, date } = req.body;

            if (type && type !== "income" && type !== "expense") {
                res.status(400).json({ message: "type alanı 'income' veya 'expense' olmalıdır" });
                return;
            }
            const updated=await TransActionService.update(id,{
                type,
                amount,
                category,
                description,
                date,
            })
            if(!updated){
                res.status(404).json({message:"Transaction not found"})
                return
            }
            res.status(200).json(updated)
        }catch (err){
            res.status(500).json({message:"Internal server error",error:(err as Error).message})
            return
        }
    }
    async delete(req: Request, res: Response): Promise<void> {
        try {
            const  id  = req.params.id as string ;
            const deleted = await TransActionService.delete(id);

            if (!deleted) {
                res.status(404).json({ message: "İşlem bulunamadı" });
                return;
            }

            res.status(200).json({ message: "İşlem silindi", data: deleted });
        } catch (error) {
            res.status(500).json({ message: "İşlem silinirken hata oluştu", error: (error as Error).message });
        }
    }
    async getSummary(req: Request, res: Response): Promise<void> {
        try {
            const { startDate, endDate } = req.query;

            const summary = await TransActionService.getSummary({
                startDate: startDate as string | undefined,
                endDate: endDate as string | undefined,
            });

            res.status(200).json(summary);
        } catch (error) {
            res.status(500).json({ message: "Özet getirilirken hata oluştu", error: (error as Error).message });
        }
    }

  async getByCategory(req: Request, res: Response): Promise<void> {
    try {
      const { type } = req.query;

      const result = await TransActionService.getByCategory(type as TransactionType | undefined);

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: "Kategori verisi getirilirken hata oluştu", error: (error as Error).message });
    }
  }


}
export default new TransactionController()