import mongoose from "mongoose";
import { logger } from "../utils/logger.js";



export const mongo_connect=async (uri:string,db_name:string):Promise<void>=>{
    try{
        await mongoose.connect(uri,{dbName:db_name})
        let db =mongoose.connection.db
        if (!db){
            logger.error("MongoDB database connection is not available")
            return
        }
        await db.command({ping:1})
        logger.info(`MongoDB connected: ${db_name}`);
        logger.info('MongoDB ping successful');
    }catch(err) {
        logger.error(err)
        process.exit(1)
    }
}