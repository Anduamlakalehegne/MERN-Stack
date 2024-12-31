import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";
import { customError } from "../middleware/customError.js";

export const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;

  const hashPassword = bcryptjs.hashSync(password, 10);

  try {
    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
    });

    return res.status(201).json({ message: "User created!", user: newUser });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(customError(404, "Email not found."));

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(customError(401, "Wrong credentials"));

    const { password: hashPassword, ...user } = validUser._doc;

    const token = jwt.sign({ id: validUser.id }, process.env.SECRET_TOKEN);

    const expireDate = new Date(Date.now() + 3600000);

    return res
      .cookie("access_token", token, { httpOnly: true, expires: expireDate })
      .status(201)
      .json(user);
  } catch (error) {
    next(error);
  }
};

export const signOut = (req, res) => {
  return res.clearCookie("access_token").status(200).json("Signout success!");
};
