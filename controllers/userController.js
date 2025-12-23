import { User } from "../models/userModel.js";
import { createHmac } from "crypto";

export const signupUser = async (req, res) => {
  const { fullName, email, password } = req.body;

  console.log("Full Name: " + fullName);
  console.log("Email: " + email);
  console.log("Password: " + password);

  await User.create({
    fullName,
    email,
    password,
  });

  return res.redirect("/");
};

export const signinUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.matchPassword(email, password);

  console.log("User ", user);

  return res.redirect("/");
};
