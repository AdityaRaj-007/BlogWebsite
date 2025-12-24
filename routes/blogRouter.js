import express from "express";

export const router = express.Router();

router.get("/add-new", (req, res) => {
  return res.render("addBlog");
});
