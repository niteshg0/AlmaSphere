import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const options = {
    expiresIn: "1d",
  };
  const token = jwt.sign({ userId }, process.env.SECRET_KEY, options);

  //   add cookie in headers
  res.cookie("authToken", token, {
    httpOnly: true, // Prevents client-side JS access for security
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    sameSite: "strict", // 
    maxAge: 1 * 24 * 60 * 60 * 1000, // jwt for 1 hour
  });

  return token;
};

export default generateToken;
