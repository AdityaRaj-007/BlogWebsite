import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import {
  addBlog,
  viewBlog,
  addComment,
} from "../controllers/blogController.js";

export const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const userId = req.user._id;
    const uploadPath = path.resolve(`./public/uploads/${userId}`);

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/add-new", (req, res) => {
  return res.render("addBlog", {
    user: req.user,
    active: "active",
  });
});

router.post("/", upload.single("coverImage"), addBlog);

router.get("/:id", viewBlog);

router.post("/comment/:blogId", addComment);
