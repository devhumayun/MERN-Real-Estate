import express from 'express'
import dotenv from 'dotenv'
import { connectMongoDB } from './config/db.js'
import cors from 'cors'
dotenv.config()
import authRoute from './route/authRoute.js'
import errorHandler from './middleware/errorHandler.js'

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended : false }));
app.use(cors())


// routing
app.use('/api/v1/auth', authRoute );

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is runing for ${process.env.SERVER_PORT} port`);
    connectMongoDB()
})

// error middleware
app.use(errorHandler)