import express from 'express'
import dotenv from 'dotenv'
import { connectMongoDB } from './config/db.js'
dotenv.config()

const app = express()

app.listen(5050, () => {
    console.log("Server is runing for 5050 port");
    connectMongoDB()
})