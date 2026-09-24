import 'dotenv/config';
import { logger } from '../utils/logger.js';
import type { Config } from '../types/index.js';

const get_env=(key:string):string=>{
    const value =process.env[key];
    if (!value){
        logger.error(`Enviroment variable "${key}" is not defined`);
        process.exit(1)
    }
    return value
}

const port = Number(get_env('PORT'));

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('PORT must be a valid number between 1 and 65535');
}

export const env:Config={
    node_env:get_env("NODE_ENV"),
    port ,
    mongo_uri:get_env("MONGO_URI"),
    mongo_name:get_env("MONGO_NAME"),
}