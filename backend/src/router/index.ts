import { Router } from "express";


const router=Router()


router.get("/ping",(_req,res)=>{
    res.send("sa")
})

export default router