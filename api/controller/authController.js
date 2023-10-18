import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createError } from "../utils/createError.js";

// user signup
export const signUp = async (req, res, next) => {
  const {username, email, password} = req.body
  const haspass = bcrypt.hashSync(password, 10)
  try {
    const newUser = new User({username, email, password:haspass})

    // check  username is exists
    const checkUsername = await User.findOne({username})
    if(checkUsername){
      next(createError(400, "Username exists. Try another username"))
    }

    // check email is exists
    const checkemail = await User.findOne({email})
    if(checkemail){
      next(createError(400, "Email exists. Try another email"))
    }
    await newUser.save()


    res.status(201).json({newUser, message: "User Registration Successfull"})
  } catch (error) {
    next(error)
    console.log(error);
  }
};


// user login
export const signIn = async (req, res) => {
  // get body data
  const { email, password } = req.body;

  // validate input fields
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are requried" });
  }

  // check user email is exists
  const login_user = await User.findOne({ email });
  if (!login_user) {
    return res.status(400).json({ message: "User not found" });
  }

  //  check password
  const check_pass = await bcrypt.compare(password, login_user.password);
  if (!check_pass) {
    return res.status(400).json({ message: "Wrong password" });
  }

  // access token
  const token = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: 7,
  });

  res.cookie("accessToken", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.APP_ENV == "Development" ? false : true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    token,
    user: login_user,
    message: "Login successfull",
  });
};
