import express from "express";
import {
  signinUser,
  signupUser,
  logoutUser,
} from "../controllers/userController.js";

export const router = express.Router();

router.get("/signin", (req, res) => {
  return res.render("signin");
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.post("/signin", signinUser);

router.post("/signup", signupUser);

router.get("/logout", logoutUser);
