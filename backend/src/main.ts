import express from "express"
import cors from "cors"
import { request_logger } from "./middleware/request_logger.js"
import router from "./router/index.js"
import { mongo_connect } from "./db/mongo.js"
import { env } from "./config/env.js"
import { logger } from "./utils/logger.js"



const app=express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(request_logger)

await mongo_connect(env.mongo_uri,env.mongo_name);

app.use("/api",router)

app.listen(env.port,()=>{
    logger.info(`server running on ${env.port} `)
})