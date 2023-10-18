import express from "express";
import dotenv from "dotenv";
import { connectMongoDB } from "./config/db.js";
import cors from "cors";
dotenv.config();
import authRoute from "./route/authRoute.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// routing
app.use("/api/v1/auth", authRoute);

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
