import express from 'express'
import dotenv from 'dotenv'
import { connectMongoDB } from './config/db.js'
dotenv.config()
import authRoute from './route/authRoute.js'

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended : false }));


// routing
app.use('/api/v1/auth', authRoute );

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is runing for ${process.env.SERVER_PORT} port`);
    connectMongoDB()
})