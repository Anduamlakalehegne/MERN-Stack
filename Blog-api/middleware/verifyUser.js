import jwt from "jsonwebtoken";
import { customError } from "./customError.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(customError(401, "Access denied!"));

  jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
    if (err) return res.status(403).json("Token is not valid");

    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id) {
      return next();
    } else {
      return next(customError(403, "You are not authorized."));
    }
  });
};
