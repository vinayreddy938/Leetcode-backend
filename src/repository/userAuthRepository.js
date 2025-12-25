import { use } from "react";
import User from "../model/user.schema.js";
export const registerRepository = async (user) => {
  const user1 = new User(user);
  const saveduser = await user1.save();
  return savedUser;
};
export const loginRepository = (user) => {
  const dbUser = User.findOne({ emailId: user.emailId });
  return dbUser;
};
export const logoutRepository = () => {};

export const getProfileRepository = () => {};
