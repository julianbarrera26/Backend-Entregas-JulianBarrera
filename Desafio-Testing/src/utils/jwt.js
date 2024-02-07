import  jwt  from "jsonwebtoken";
import { config } from "../config/config.js";

export const generateToken = (user) => {
    const token = jwt.sign(user, config.jwt_secret_key, { expiresIn: 300 });
    console.log("token", token);
    return token;
  };