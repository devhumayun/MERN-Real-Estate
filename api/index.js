import express from "express";
import dotenv from "dotenv";
import { connectMongoDB } from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();
import authRoute from "./route/authRoute.js";
import userRouter from './route/userRoute.js'
import listingRouter from './route/listingRoute.js'


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser())

// routing
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/listing", listingRouter);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is runing for ${process.env.SERVER_PORT} port`);
  connectMongoDB();
});

// custom error handler
app.use((err, req, res, next) => {
  const errStatus = err.errStatus || 500;
  const message = err.message || "Internal server error";
  return res.status(errStatus).json({
    success: false,
    message,
    errStatus,
  });
});
