import { User } from "../models/userModel.js";

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

  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);

    console.log("Token ", token);

    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("signin", { error: "Incorrect Email or Password!!" });
  }
};

export const logoutUser = (req, res) => {
  return res.clearCookie("token").redirect("/");
};
