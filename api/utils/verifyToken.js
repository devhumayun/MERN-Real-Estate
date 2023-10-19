import jwt from "jsonwebtoken";
import { createError } from "./createError.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return next(createError(400, "You are not authorize"));
  }

  const verify_token = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

  if (!verify_token) {
    return next(createError(403, "Invalid Token"));
  } else{
    req.userId = verify_token.id
    next()
  }


};
