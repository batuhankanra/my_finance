import express from "express"
import cors from "cors"
import { request_logger } from "./middleware/request_logger.js"



const app=express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(request_logger)

app.listen(3000,()=>{
    console.log("sa")
})