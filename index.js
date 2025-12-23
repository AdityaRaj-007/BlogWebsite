import express from "express";
import path from "path";
import { router as userRouter } from "./routes/userRouter.js";
import "dotenv/config";
import { connectDB } from "./services/db.js";

const PORT = 8000;
const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: true }));
await connectDB();

app.use("/user", userRouter);

app.get("/", (req, res) => {
  return res.render("home");
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
