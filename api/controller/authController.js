import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// user signup
export const signUp = async (req, res, next) => {
  try {
    // get body data
    const { username, email, password } = req.body;

    // validate input fields
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are requried" });
    }

    // check username is exists
    const userNameCheck = await User.findOne({ username });
    if (userNameCheck) {
      return res
        .status(400)
        .json({
          message: "User exists with this username! Try another username",
        });
    }

    // check email is exists
    const userEmail = await User.findOne({ email });

    if (userEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // hash password
    const hash_pass = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({ username, email, password: hash_pass });
    res.status(200).json({ user, message: "User created successfull" });
  } catch (error) {
    next(error);
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
