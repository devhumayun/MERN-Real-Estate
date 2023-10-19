import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/createError.js";

/**
 * Update user
 */
export const userProfileUpdate = async (req, res, next) => {
  if (!req.params.id) {
    return next(createError(400, "You can only update your won information"));
  }

  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 100);
    }
    
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password:req.body.password,
          avater: req.body.avater,
        },
      },
      {
        new: true,
      }
    );

    const { password, ...rest } = updateUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
