import JWT from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

export const createToken = (user) => {
  const payload = {
    _id: user._id,
    email: user.email,
    profileImageURL: user.profileImageURL,
    role: user.role,
  };

  const token = JWT.sign(payload, SECRET);
  return token;
};

export const validateToken = (token) => {
  const payload = JWT.verify(token, SECRET);
  return payload;
};
