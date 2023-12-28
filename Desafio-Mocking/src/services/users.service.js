import { uManager } from "../DAL/dao/users.dao.js";
import { hashData } from "../utils.js";
import UsersRequest from "../DAL/DTO/users-request.dto.js";
import UsersResponse from "../DAL/DTO/users-response.dto.js";
import { cartsModel } from "../config/models/carts.model.js";
import { createACart } from "../controllers/carts.controller.js";

export const findById = (id) => {
  const user = uManager.findUserByID(id);
  const userDTO = new UsersResponse(user);
  return userDTO;
};

export const findByEmail = (id) => {
    const user = uManager.findUserByEmail(id);
    return user;
  };

export const createOne = (user) => {
  const hashedPassword = hashData(obj.password);
  const userDTO = new UsersRequest ({ ...user, password: hashedPassword });
  const createdCart = new cartsModel();
  const createdUser = uManager.createUser({userDTO, cart: createdCart._id,});
  return createdUser;
};