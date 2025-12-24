import express from "express";
import path from "path";
import "dotenv/config";
import { router as userRouter } from "./routes/userRouter.js";
import { connectDB } from "./services/db.js";
import cookieParser from "cookie-parser";
import { isAuthenticated } from "./middlewares/authentication.js";
import { router as blogRouter } from "./routes/blogRouter.js";

const PORT = 8000;
const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // converts the cookies into a key value pair with cookie name as a key.
app.use(isAuthenticated("token"));
await connectDB();

app.use("/user", userRouter);
app.use("/blog", blogRouter);

app.get("/", (req, res) => {
  return res.render("home", {
    user: req.user,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
