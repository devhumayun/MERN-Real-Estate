import User from "../models/userModel.js";
import bcrypt from 'bcryptjs'

export const signUp = async (req, res, next) => {
  try {
    // get body data
    const { username, email, password } = req.body;

    // validate input fields
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are requried" });
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
    next(error)
  }
};
