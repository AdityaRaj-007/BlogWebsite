import { model, Schema } from "mongoose";
import { createHmac, randomBytes } from "crypto";
import { createToken } from "../services/auth.js";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profileImageURL: {
      type: String,
      default: "/images/default.png",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function () {
  const user = this;

  if (!user.isModified("password")) return;

  const salt = randomBytes(16).toString("hex");
  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  console.log("Salt: " + salt);
  console.log("Hashed Password: " + hashedPassword);

  this.salt = salt;
  this.password = hashedPassword;
});

userSchema.static(
  "matchPasswordAndGenerateToken",
  async function (email, password) {
    const user = await this.findOne({ email });

    if (!user) throw new Error("User not found!");
    //console.log("USER:", user);

    const salt = user.salt;
    const hashedPassword = user.password;

    const providedHashedPassword = createHmac("sha256", salt)
      .update(password)
      .digest("hex");

    if (providedHashedPassword !== hashedPassword)
      throw new Error("Incorrect password!");

    const token = createToken(user);

    return token;
  }
);

export const User = model("user", userSchema);
